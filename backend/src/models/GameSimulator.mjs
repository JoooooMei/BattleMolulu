import { parseEther } from 'ethers';
import MoluluRepository from '../repository/MoluluRepository.mjs';
import { owner } from '../config.mjs';
import {
  boostMolulus,
  getEligibleMolulus,
  getParticipatingMolulus,
  getTraingCycleStartTime,
} from '../services/TournamentService.mjs';
import ChainlinkRepository from '../repository/ChainlinkRepository.mjs';
import { getRandom } from '../services/chainlinkService.mjs';

export default class GameSimilator {
  constructor({ players }) {
    this.players = players;
    this.wallets = [];

    this.boostedMolulus = [];

    this.payHat = parseEther('0.01');
    this.payGlasses = parseEther('0.2');
    this.payCape = parseEther('0.03');
    this.payBoots = parseEther('0.025');
    this.payRing = parseEther('0.05');

    this.VRF_RANDOM;
  }

  async createWallets() {
    this.players.forEach((player) => {
      const wallet = new MoluluRepository(player);
      this.wallets.push(wallet);
    });
  }

  async mintMolusuls() {
    for (let i = 0; i < this.wallets.length; i++) {
      const molulu = await this.wallets[i].mintMolulu();

      // console.log(molulu);
    }
  }

  async buyAccessory() {
    console.log('Buying accessories');
    await this.wallets[0].buyAccessory(1, 'Hat', this.payHat);
    await this.wallets[0].buyAccessory(1, 'Ring', this.payRing);
    await this.wallets[1].buyAccessory(2, 'Hat', this.payHat);
    await this.wallets[1].buyAccessory(2, 'Cape', this.payCape);
    await this.wallets[2].buyAccessory(3, 'Ring', this.payRing);
    await this.wallets[2].buyAccessory(3, 'Cape', this.payCape);
    await this.wallets[3].buyAccessory(4, 'Ring', this.payRing);
    await this.wallets[3].buyAccessory(4, 'Cape', this.payCape);
    await this.wallets[3].buyAccessory(4, 'Glasses', this.payGlasses);
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
    const startTime = await getTraingCycleStartTime(repo);
    const participating = await getEligibleMolulus(repo, startTime);

    console.dir(participating, { depth: null });
  }

  async participatingMolulus() {
    const repo = this.wallets[0];
    const startTime = await getTraingCycleStartTime(repo);
    const participating = await getParticipatingMolulus(repo, startTime);

    return participating;
    // console.log('Participating Molulus: ');
    // console.dir(participating, { depth: null });
  }

  async newCycle() {
    try {
      const ownerRepo = new MoluluRepository(owner);

      const receipt = await ownerRepo.newTrainingCycle();

      console.log('new cycle: ', receipt);
    } catch (error) {
      console.error('Failed to start new cycle:', error);
    }
  }

  async boostBeforeTournament({ now }) {
    if (!now) {
      now = Date.now();
    }

    const participants = await this.participatingMolulus();

    const repo = new MoluluRepository(owner);
    const boosted = await boostMolulus(repo, participants, now);

    this.boostedMolulus = boosted;
  }

  async newVRFSeed() {
    const repo = new ChainlinkRepository(owner);

    const VRF_RANDOM = await getRandom(repo);

    console.log('got random back:', VRF_RANDOM);

    this.VRF_RANDOM = VRF_RANDOM;
  }
}
