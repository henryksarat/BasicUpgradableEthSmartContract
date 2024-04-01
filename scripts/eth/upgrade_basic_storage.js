// scripts/upgrade_box.js
const { ethers, upgrades } = require('hardhat');

async function main () {
  const address = '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512'
  const BasicStorageV2 = await ethers.getContractFactory('BasicStorageV2');
  console.log('Upgrading BasicStorage...');
  const basicStorageV2 = await upgrades.upgradeProxy(address, BasicStorageV2);
  console.log('Box upgraded at address: ' + basicStorageV2.target);
}

main();