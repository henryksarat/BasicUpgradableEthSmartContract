
const { expect } = require("chai");

describe("Original Box", function() {
  before(async function () {
    [this.deployer, this.other] = await ethers.getSigners();
    this.BasicStorage = await ethers.getContractFactory("BasicStorage", this.deployer);
  });

  beforeEach(async function () {
    this.instance = await upgrades.deployProxy(this.BasicStorage, { initializer: 'initialize' });
  });

  it('can execute store correctly on BasicStorage as deployer', async function () {
    await this.instance.store(42);
    const value = await this.instance.retrieve();
    expect(value.toString()).to.equal('42');
  });

  it('can store openValue as deployer', async function () {
    await this.instance.storeOpenValue(100);
    const value = await this.instance.retrieveOpen();
    expect(value.toString()).to.equal('100');
  });

  it('can store open value with other signer that is not the deployer', async function () {
    await this.instance.connect(this.other).storeOpenValue(200);
    const value = await this.instance.retrieveOpen();
    expect(value.toString()).to.equal('200');
  });

  it('cannot execute store if not deployer', async function () {
    await expect(
      this.instance.connect(this.other).store(43)
    ).to.be.reverted;
  });
});
