const hre = require("hardhat");

async function main() {
    const BasicStorage = await ethers.getContractFactory('BasicStorage');
    console.log('Deploying First Version of BasicStorage...');
    const basicStorage = await upgrades.deployProxy(BasicStorage, { initializer: 'initialize' });
    await basicStorage.waitForDeployment();
    console.log('BasicStorage deployed to:', basicStorage.target);

    const address = basicStorage.target
    console.log('Upgrading to BasicStorageV2...');
    const BasicStorageV2 = await ethers.getContractFactory('BasicStorageV2');
    await upgrades.upgradeProxy(address, BasicStorageV2);
    console.log('BasicStorage upgraded to', address);

    console.log(
        `Shortcut link: https://testnet-zkevm.polygonscan.com/address/${address}`
    );
}

main()
.then(() => process.exit(0))
.catch(error => {
    console.error(error);
    process.exit(1);
});