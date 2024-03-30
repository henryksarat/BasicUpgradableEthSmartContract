// scripts/index.js
async function main () {
    // Retrieve accounts from the local node
    const address = '0x33306F9Fef770CF2BCb5311502B3A62870e356D3'
    const Box = await ethers.getContractFactory('Box');
    const box = await Box.attach(address);
    await box.store(4)
    console.log((await box.retrieve()).toString())
  }
  
  main()
    .then(() => process.exit(0))
    .catch(error => {
      console.error(error);
      process.exit(1);
    });