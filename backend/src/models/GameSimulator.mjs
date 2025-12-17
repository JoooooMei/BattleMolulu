import { parseEther } from 'ethers';
import MoluluRepository from '../repository/MoluluRepository.mjs';

import {
  getEligibleMolulus,
  getParticipatingMolulus,
  getTournamentStartTime,
} from '../services/TournamentService.mjs';
import { destructParticipants } from '../utils/helpers.mjs';

export default class GameSimilator {
  constructor({ players }) {
    this.players = players;
    this.wallets = [];
    this.moluluIDs = [];

    //prices

    this.payHat = parseEther('0.01');
    this.buyGlasses = parseEther('0.2');
    this.payCape = parseEther('0.03');
    this.payBoots = parseEther('0.025');
    this.payRing = parseEther('0.05');
  }

  async createWallets() {
    this.players.forEach((player) => {
      const wallet = new MoluluRepository(player);
      this.wallets.push(wallet);
    });

    // console.log(this.wallets);
  }

  async mintMolusuls() {
    for (let i = 0; i < this.wallets.length; i++) {
      const molulu = await this.wallets[i].mintMolulu();

      // console.log(molulu);
    }
  }

  async buyAccessory() {
    console.log('Buying accessory');
    // const userOne = await this.wallets[0].buyAccessory(1, 'Hat', this.payHat);
    const userTwo = await this.wallets[1].buyAccessory(2, 'Ring', this.payRing);

    console.log('bought Ring', userTwo);
  }

  async getLiquidityContributors() {
    console.log('in  contributions');
    const contributions = await this.wallets[0].fetchLiquidityContributors();
    console.log('comntributions: ', contributions);
  }

  async allAccessoryPurchases() {
    console.log('in accessory purchases');
    const purchases = await this.wallets[0].fetchAllAccessoryPurchases();

    console.log('purchases', purchases);
  }

  async participants() {
    const repo = this.wallets[0];
    const startTime = await getTournamentStartTime(repo);
    const participating = await getEligibleMolulus(repo, startTime);

    //console.log('Participants:', JSON.stringify(participants, null, 2));
    console.dir(participating, { depth: null });
    console.dir(participants, { depth: null });
  }

  async participatingMolulus() {
    const repo = this.wallets[0];
    const startTime = await getTournamentStartTime(repo);
    const participating = await getParticipatingMolulus(repo, startTime);

    console.log('Participating Molulus: ', participating);
    console.dir(participating, { depth: null });
  }
}
