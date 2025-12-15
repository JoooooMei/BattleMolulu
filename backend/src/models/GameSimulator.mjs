import { parseEther } from 'ethers';
import MoluluRepository from '../repository/MoluluRepository.mjs';
export default class GameSimilator {
  constructor({ players }) {
    this.players = players;
    this.wallets = [];
    this.moluluIDs = [];

    //prices

    this.payHat = parseEther('0.02');
    this.payCape = parseEther('0.03');
    this.payBoots = parseEther('0.025');
    this.payRing = parseEther('0.05');

    this.wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  }

  async createWallets() {
    await this.wait(1000);
    this.players.forEach((player) => {
      const wallet = new MoluluRepository(player);
      this.wallets.push(wallet);
    });

    // console.log(this.wallets);
  }

  async mintMolusuls() {
    await this.wait(1000);
    for (let i = 0; i < this.wallets.length; i++) {
      const molulu = await this.wallets[i].mintMolulu();

      // console.log(molulu);
    }
  }

  async buyAccessory() {
    await this.wait(1000);
    console.log('Biying accessory');
    const hat = await this.wallets[0].buyAccessory(1, 'Hat', this.payHat);

    console.log('bought hat', hat);
  }

  async getLiquidityContributors() {
    await this.wait(1000);
    console.log('in  contributions');
    const contributions = await this.wallets[0].fetchLiquidityContributors();
    console.log('comntributions: ', contributions);
  }
}
