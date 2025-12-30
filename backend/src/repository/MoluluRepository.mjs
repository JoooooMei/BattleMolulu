import { ethers } from 'ethers';
import { NonceManager } from 'ethers';
import { abi, addressV2 } from '../config.mjs';
import MoluluModel from '../models/MoluluModel.mjs';

export default class MoluluRepository {
  constructor(walletAddress) {
    this.provider = new ethers.JsonRpcProvider('http://localhost:8545');

    const wallet = new ethers.Wallet(walletAddress, this.provider);
    this.signer = new NonceManager(wallet);

    this.rContract = new ethers.Contract(addressV2, abi, this.provider);
    this.wContract = new ethers.Contract(addressV2, abi, this.signer);
  }

  async getConractOwner() {
    try {
      const ownerAddress = await this.rContract.owner();
      return ownerAddress;
    } catch (error) {
      console.error('Error fetching owner:', error);
      return null;
    }
  }

  async mintMolulu() {
    const tx = await this.wContract.mintMolulu();
    return await tx.wait();
  }

  async batchMintMolulu(amount) {
    const tx = await this.wContract.batchMintMolulu(amount);
    return await tx.wait();
  }

  async fetchMoluluOLD({ id }) {
    const stats = await this.rContract.getMolulu(id);
    const owner = await this.rContract.ownerOf(id);

    const molulu = new MoluluModel({
      id,
      owner,
      HP: Number(stats.HP),
      Attack: Number(stats.Attack),
      Defence: Number(stats.Defence),
      Accessories: stats.Accessories,
      type: ['Fire', 'Water', 'Earth', 'Wind'][stats.mtype],
    });

    return molulu;
  }

  async fetchMolulu(id) {
    const molulu = await this.rContract.getMolulu(id);

    return molulu;
  }

  async fetchOwnerOf(id) {
    const owner = await this.rContract.ownerOf(id);

    return owner;
  }

  async getLiquidityForUser(address) {
    return await this.rContract.liquidityBalance(address);
  }

  async getTotalLiquidity() {
    return await this.rContract.totalLiquidity();
  }

  async fetchAllMolulus() {
    const nextId = await this.rContract.nextMoluluId();
    const allMolulus = [];

    for (let id = 1; id < nextId; id++) {
      try {
        const molulu = await this.fetchMolulu({ id });
        allMolulus.push(molulu);
      } catch (err) {
        console.log(`Molulu ${id} does not exist.`);
      }
    }

    return allMolulus;
  }

  async buyAccessory(id, accessory, price) {
    try {
      const tx = await this.wContract.buyAccessory(id, accessory, {
        value: price,
      });

      return await tx.wait();
    } catch (error) {
      console.error('Something went wrong!', error);
      throw error;
    }
  }

  async getCycleStartBlock() {
    const [cycleId, startBlock] = await this.rContract.getCurrentCycleInfo();
    return Number(startBlock);
  }

  async fetchLiquidityContributors() {
    const startBlock = await this.getCycleStartBlock();

    const events = await this.rContract.queryFilter(
      this.rContract.filters.LiquidityAdded(),
      startBlock,
      'latest'
    );

    const contributors = {};

    for (const event of events) {
      const user = event.args.user;
      const amount = event.args.amount;

      if (!contributors[user]) {
        contributors[user] = {
          address: user,
          totalETH: 0n,
          molulus: [],
        };
      }

      contributors[user].totalETH += amount;
    }

    return Object.values(contributors);
  }

  async fetchAllAccessoryPurchases() {
    console.log('Fetching... ');
    const startBlock = await this.getCycleStartBlock();
    console.log('Startblock: ', startBlock);

    const events = await this.rContract.queryFilter(
      this.rContract.filters.AccessoryBought(),
      startBlock,
      'latest'
    );

    const accessoryPurchases = [];

    for (const event of events) {
      const block = await this.provider.getBlock(event.blockNumber);

      accessoryPurchases.push({
        moluluId: Number(event.args.tokenId),
        owner: event.args.buyer,
        accessory: event.args.accessory,
        timestamp: block.timestamp,
      });
    }

    return accessoryPurchases;
  }

  async newTrainingCycle() {
    try {
      const tx = await this.wContract.startNewTrainingCycle();
      return tx.wait();
    } catch (error) {
      console.log('Something whent wrong: ', error);
    }
  }

  async finalizeCycle(winnerAddress) {
    try {
      const tx = await this.wContract.finalizeCycle(winnerAddress);

      console.log('tx: ', tx);
      const receipt = await tx.wait();
      return receipt;
    } catch (err) {
      console.error('FinalizeCycle failed', err);
    }
  }
}
