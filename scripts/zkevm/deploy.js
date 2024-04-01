const hre = require("hardhat");

async function main() {
    // const Box = await ethers.getContractFactory('Box');
    // const box = await Box.deploy();
    // await box.waitForDeployment();
    // console.log('Box deployed to:', box.target);
    // console.log(
    //     `Counter contract deployed to https://testnet-zkevm.polygonscan.com/address/${box.target}`
    // );

    const Box = await ethers.getContractFactory('Box');
    console.log('Deploying First Version of Box...');
    const box = await upgrades.deployProxy(Box, { initializer: 'initialize' });
    await box.waitForDeployment();
    console.log('Box deployed to:', box.target);

    console.log('Upgrading to Box V2...');
    const BoxV2 = await ethers.getContractFactory('BoxV2');
    await upgrades.upgradeProxy(box.target, BoxV2);
    console.log('Box upgraded to', box.target);

    console.log(
        `Shortcut link: https://testnet-zkevm.polygonscan.com/address/${box.target}`
    );
}

main()
.then(() => process.exit(0))
.catch(error => {
    console.error(error);
    process.exit(1);
});