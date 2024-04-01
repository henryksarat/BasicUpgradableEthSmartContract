// hardhat.config.js
require("@nomicfoundation/hardhat-ethers");
require("@nomicfoundation/hardhat-chai-matchers");
require('@openzeppelin/hardhat-upgrades');

const { alchemyApiKey, mnemonic, account_private_key } = require('./secrets.json');

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
 module.exports = {
  solidity: "0.8.20",
  networks: {
    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/${alchemyApiKey}`,
        accounts: { mnemonic: mnemonic },
      },
      zkEVM: {
        url: `https://rpc.public.zkevm-test.net`,
        accounts: [account_private_key],
      },
    },
};
