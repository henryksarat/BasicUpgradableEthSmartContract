// scripts/upgrade_box.js
const { ethers, upgrades } = require('hardhat');

async function main () {
  const BoxV2 = await ethers.getContractFactory('BoxV2');
  console.log('Upgrading Box...');
  // Get this address from calling the deploy_upgradeable_box.js script
  await upgrades.upgradeProxy('<ADDRESS_HERE>', BoxV2);
  console.log('Box upgraded');
}

main();