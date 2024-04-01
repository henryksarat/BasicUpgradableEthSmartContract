// scripts/deploy_upgradeable_box.js
const { ethers, upgrades } = require('hardhat');

async function main () {
  const BasicStorage = await ethers.getContractFactory('BasicStorage');
  console.log('Deploying BasicStorage...');
  const basicStorage = await upgrades.deployProxy(BasicStorage, { initializer: 'initialize' });
  await basicStorage.waitForDeployment();
  console.log('Box deployed to:', basicStorage.target);
}

main();