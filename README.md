# BasicUpgradableEthSmartContract

[!Image of the UI running](https://github.com/henryksarat/BasicUpgradableEthSmartContract/blob/main/images/UI_screenshot.png)

## Getting Started

*Basic setup*

```
npm install
npm install --save-dev hardhat
npx hardhat
npx hardhat compile
npx hardhat test
npm test
```

*Update secres.json*
* Replace `<MNEMONIC>` with the one from your wallet that has testnet tokens
* Replace `<API_KEY>` with your alechemy.com API key for Sepolia
* Replace `<ACCOUNT_PRIVATE_KEY>` with your private key for your wallet

## Eth Testnet Sepolia

### Deploying to Sepolia

1. Run:
```
npx hardhat run --network sepolia scripts/eth/deploy_upgradeable_basic_storage.js
```

2. Update `scripts/eth/upgrade_basic_storage.js` with the address from #1 where it says `<ADDRESS_HERE>`
3. Run:
```
npx hardhat run --network sepolia scripts/eth/upgrade_basic_storage.js
```

### Execute against Sepolia

1. On the command line run:

```
npx hardhat console --network sepolia
```
2. From *Deploying to Sepolia*, replace *<ADDRESS>* in the code below with the deployed address. Note that persisting any value in a smart contract via _store()_ or _storeOpenValue()_ may take up to 10 seconds.
```
address = '0x48209332d458224afD66431c9d42bf060aadc4ee'
const BasicStorageV2 = await ethers.getContractFactory('BasicStorageV2');
const basicStorage = await BasicStorageV2.attach(address);

(await basicStorage.retrieve()).toString(); // should be 0
(await basicStorage.store(100));
(await basicStorage.retrieve()).toString(); // should be 100 
(await basicStorage.increment())
(await basicStorage.retrieve()).toString(); // should be 101 

(await basicStorage.retrieveOpen()).toString(); // should be 0
(await basicStorage.storeOpenValue(200));
(await basicStorage.retrieveOpen()).toString(); // should be 200
```

### Running locally only

In one window run:
```
npx hardhat node
```

Then, in another window do the following:

1. Run:
```
npx hardhat run --network localhost scripts/eth/deploy_upgradeable_basic_storage.js
```

2. Update `scripts/eth/upgrade_basic_storage.js` with the address from #1 where it says `<ADDRESS_HERE>`
3. Run:
```
npx hardhat run --network localhost scripts/eth/upgrade_basic_storage.js
```
4. To execute commands against your local blockchain, similar to the section *Execute against Sepolia*, run the following :

```
npx hardhat console --network sepolia
```

## zkEVM testnet

### Deploying to zkEVM testnet

1. Make sure that you have enough Eth on zkEVM testnet.
2. Replace `<ACCOUNT_PRIVATE_KEY>` in `secrets.json` with the private key for your wallet. Note that you can just use `<MNEMONIC>` just like with the Eth scripts, but for variety and as an example I decided to use `<ACCOUNT_PRIVATE_KEY>`. You would only need to update `hardhat.config.js` for the zkEVM network to use `mnemonic`.
3. Run

```
npx hardhat run scripts/zkevm/deploy.js --network zkEVM
```

## UI

1. Deploy the smart contract 
2. After deployment replace `<DEPLOYED_ADDRESS>` at the top of `src/App.js`. 
3. Make the ABI available from the build to your react app. Run the following from the root to make a copy of the ABI so your react app has access to it:
```
cp -R artifacts/contracts src/contracts
```
4. npm start

## Resources

I used the following resources to pull together this repo:
* https://docs.openzeppelin.com/learn/developing-smart-contracts
* https://docs.polygon.technology/zkEVM/how-to/using-hardhat/
* https://refine.dev/blog/material-ui-card/#material-ui-card-interactions

