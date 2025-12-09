import { ethers } from 'ethers';
import { abi, address, degen, chad } from '../config.mjs';

export default class MoluluSimulator {
  constructor() {
    const provider = new ethers.JsonRpcProvider('http://localhost:8545');
    const signer = new ethers.Wallet(chad, provider);

    this.rContract = new ethers.Contract(address, abi, provider);
    this.wContract = new ethers.Contract(address, abi, signer);
  }

  async batchMintMolulu(amount) {
    const tx = await this.wContract.batchMintMolulu(amount);
    return await tx.wait();
  }

  async fetchMolulu({ id }) {
    const stats = await this.rContract.getMolulu(id);
    const owner = await this.rContract.ownerOf(id);

    const { HP, mtype, Attack, Defence, Accessories } = stats;

    const molulu = {
      id: id,
      owner: owner,
      HP: Number(HP),
      type: ['Fire', 'Water', 'Earth', 'Wind'][mtype],
      Attack: Number(Attack),
      Defence: Number(Defence),
      Accessories,
    };

    return molulu;
  }

  async fetchAllMolulus() {
    const nextId = await this.rContract.nextMoluluId();
    const allMolulus = [];

    for (let id = 1; id < nextId; id++) {
      try {
        const stats = await this.rContract.getMolulu(id);
        const owner = await this.rContract.ownerOf(id);

        const { HP, mtype, Attack, Defence, Accessories } = stats;

        allMolulus.push({
          id,
          owner,
          HP: Number(HP),
          type: ['Fire', 'Water', 'Earth', 'Wind'][mtype],
          Attack: Number(Attack),
          Defence: Number(Defence),
          Accessories,
        });
      } catch (err) {
        console.log(`Molulu ${id} does not exist.`);
      }
    }

    return allMolulus;
  }
}
