# BasicUpgradableEthSmartContract

### Getting Started

*Basic setup*

```
npm install
npm install --save-dev hardhat
npx hardhat
npx hardhat compile
npx hardhat test
```

*Update secres.json*
* Replace <MNEMONIC> with the one from your wallet that has testnet tokens
* Rplace <API_KEY> with your alechemy.com API key for Sepolia

### Deploying to Sepolia

1. Run:
```
npx hardhat run --network sepolia scripts/deploy_upgradeable_box.js
```

2. Update `upgrade_box.js` with the address from #1 where it says <ADDRESS_HERE>
3. 
```
npx hardhat run --network sepolia scripts/upgrade_box.js
```

### Execute against Sepolia

1. On the command line run:

```
npx hardhat console --network sepolia
```
2. From *Deploying to Sepolia*, set it in *<ADDRESS>* in the code below. Note that storing any value might take up to 10 seconds to be readable since the blocks need to be processed.

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

Then in another window do the following:

1. Run:
```
npx hardhat run --network localhost scripts/deploy_upgradeable_box.js
```

2. Update `upgrade_box.js` with the address from #1 where it says <ADDRESS_HERE>
3. 
```
npx hardhat run --network localhost scripts/deploy_upgradeable_box.js
```

