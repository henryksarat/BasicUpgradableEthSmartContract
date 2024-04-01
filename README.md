# BasicUpgradableEthSmartContract

## Getting Started

*Basic setup*

```
npm install
npm install --save-dev hardhat
npx hardhat
npx hardhat compile
npx hardhat test
```

*Update secres.json*
* Replace `<MNEMONIC>` with the one from your wallet that has testnet tokens
* Replace `<API_KEY>` with your alechemy.com API key for Sepolia
* Replace `<ACCOUNT_PRIVATE_KEY>` with your private key for your wallet

## Eth Testnet Sepolia

### Deploying to Sepolia

1. Run:
```
npx hardhat run --network sepolia scripts/deploy_upgradeable_box.js
```

2. Update `upgrade_box.js` with the address from #1 where it says `<ADDRESS_HERE>`
3. Run:
```
npx hardhat run --network sepolia scripts/upgrade_box.js
```

### Execute against Sepolia

1. On the command line run:

```
npx hardhat console --network sepolia
```
2. From *Deploying to Sepolia*, replace *<ADDRESS>* in the code below with the deployed address. Note that persisting any value in a smart contract via _store()_ or _storeOpenValue()_ may take up to 10 seconds.
```
address = '<ADDRESS>'
const BoxV2 = await ethers.getContractFactory('BoxV2');
const box = await BoxV2.attach(address);

(await box.retrieve()).toString(); // should be 0
(await box.store(100));
(await box.retrieve()).toString(); // should be 100 
(await box.increment())
(await box.retrieve()).toString(); // should be 101 

(await box.retrieveOpen()).toString(); // should be 0
(await box.storeOpenValue(200));
(await box.retrieveOpen()).toString(); // should be 200
```

### Running locally only

In one window run:
```
npx hardhat node
```

Then, in another window do the following:

1. Run:
```
npx hardhat run --network localhost scripts/deploy_upgradeable_box.js
```

2. Update `upgrade_box.js` with the address from #1 where it says <ADDRESS_HERE>
3. Run:
```
npx hardhat run --network localhost scripts/deploy_upgradeable_box.js
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

