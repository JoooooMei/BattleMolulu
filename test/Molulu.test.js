import { expect } from 'chai';
import { network } from 'hardhat';

const { ethers } = await network.connect();

describe('Molulu', () => {
  async function deploySubscriptionFixture() {
    const [owner, degen, chad] = await ethers.getSigners();

    const Molulu = await ethers.getContractFactory('Molulu');
    const molulu = await Molulu.deploy();

    return { molulu, owner, degen, chad };
  }

  describe('deployment', () => {
    it('should set the deployer as owner', async () => {
      const { molulu, owner } = await deploySubscriptionFixture();

      expect(await molulu.owner()).to.equal(owner.address);
    });
  });
});
