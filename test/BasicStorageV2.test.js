
const { expect } = require("chai");

describe("BasicStorage Upgraded", function() {
  before(async function () {
    [this.deployer, this.other] = await ethers.getSigners();
    this.BasicStorage = await ethers.getContractFactory("BasicStorage", this.deployer);
    this.BasicStorageV2 = await ethers.getContractFactory("BasicStorageV2", this.deployer);
  });

  beforeEach(async function () {
    this.instance = await upgrades.deployProxy(this.BasicStorage, { initializer: 'initialize' });
    this.upgraded = await upgrades.upgradeProxy(await this.instance.getAddress(), this.BasicStorageV2);
  });

  it('can execute store correctly on the upgraded with original deployer', async function () {
    await this.upgraded.store(42);
    const value = await this.upgraded.retrieve();
    expect(value.toString()).to.equal('42');
  });

  it('cannot execute store if not deployer', async function () {
    await expect(
      this.upgraded.connect(this.other).store(43)
    ).to.be.reverted;
  });

  it('can execute increment with original deployer', async function () {
    await this.upgraded.store(42);
    const value = await this.upgraded.retrieve();
    expect(value.toString()).to.equal('42');
    await this.upgraded.increment();
    const valueAgain = await this.upgraded.retrieve();
    expect(valueAgain.toString()).to.equal('43');
  });

  it('cannot execute increment as someone besides deployer', async function () {
    await expect(
      this.upgraded.connect(this.other).increment()
    ).to.be.reverted;
  });
});