
const { expect } = require("chai");

describe("Original Box", function() {
  before(async function () {
    [this.deployer, this.other] = await ethers.getSigners();
    this.Box = await ethers.getContractFactory("Box", this.deployer);
  });

  beforeEach(async function () {
    this.instance = await upgrades.deployProxy(this.Box, { initializer: 'initialize' });
  });

  it('can store correctly on the original', async function () {
    await this.instance.store(42);
    const value = await this.instance.retrieve();
    expect(value.toString()).to.equal('42');
  });

  it('can store open value as deployer', async function () {
    await this.instance.storeOpenValue(100);
    const value = await this.instance.retrieveOpen();
    expect(value.toString()).to.equal('100');
  });

  it('can store open value with other signer that is not the deployer', async function () {
    await this.instance.connect(this.other).storeOpenValue(200);
    const value = await this.instance.retrieveOpen();
    expect(value.toString()).to.equal('200');
  });

  it('cannot store if not deployer', async function () {
    await expect(
      this.instance.connect(this.other).store(43)
    ).to.be.reverted;
  });
});

describe("Box Upgraded", function() {
  before(async function () {
    [this.deployer, this.other] = await ethers.getSigners();
    this.Box = await ethers.getContractFactory("Box", this.deployer);
    this.BoxV2 = await ethers.getContractFactory("BoxV2", this.deployer);
  });

  beforeEach(async function () {
    this.instance = await upgrades.deployProxy(this.Box, { initializer: 'initialize' });
    this.upgraded = await upgrades.upgradeProxy(await this.instance.getAddress(), this.BoxV2);
    this.two = 2
  });

  it('can store correctly on the upgraded with original deployer', async function () {
    await this.upgraded.store(42);
    const value = await this.upgraded.retrieve();
    expect(value.toString()).to.equal('42');
  });

  it('cannot store if not deployer', async function () {
    await expect(
      this.upgraded.connect(this.other).store(43)
    ).to.be.reverted;
  });
});