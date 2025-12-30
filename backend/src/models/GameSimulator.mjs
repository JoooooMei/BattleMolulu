import { parseEther } from 'ethers';
import MoluluRepository from '../repository/MoluluRepository.mjs';
import { owner } from '../config.mjs';
import {
  boostMolulus,
  getEligibleMolulus,
  getParticipatingMolulus,
  getTraingCycleStartTime,
} from '../services/tournamentService.mjs';
import ChainlinkRepository from '../repository/ChainlinkRepository.mjs';
import { getRandom } from '../services/chainlinkService.mjs';
import { getWinnerPrize } from '../services/YieldCalculator.mjs';
import YieldVaultRepository from '../repository/YieldVaultRepository.mjs';

export default class GameSimilator {
  constructor({ players, battleDate }) {
    this.players = players;
    this.wallets = [];
    this.tournamentWinner = undefined;

    this.boostedMolulus = [];

    this.payHat = parseEther('0.01');
    this.payGlasses = parseEther('0.02');
    this.payCape = parseEther('0.03');
    this.payBoots = parseEther('0.025');
    this.payRing = parseEther('0.05');

    this.battleDate = new Date(battleDate).getTime();
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
    await this.wallets[0].buyAccessory(1, 'Hat', this.payHat); // 0.01
    await this.wallets[0].buyAccessory(1, 'Ring', this.payRing); // 0.05
    await this.wallets[1].buyAccessory(2, 'Hat', this.payHat); // 0.01
    await this.wallets[1].buyAccessory(2, 'Cape', this.payCape); // 0.03
    await this.wallets[2].buyAccessory(3, 'Ring', this.payRing); // 0.05
    await this.wallets[2].buyAccessory(3, 'Cape', this.payCape); // 0.03
    await this.wallets[3].buyAccessory(4, 'Ring', this.payRing); // 0.05
    await this.wallets[3].buyAccessory(4, 'Cape', this.payCape); // 0.03
    await this.wallets[3].buyAccessory(4, 'Glasses', this.payGlasses); // 0.02
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
    const repo = new MoluluRepository(owner);
    const startTime = await getTraingCycleStartTime(repo);
    const participating = await getParticipatingMolulus(repo, startTime);

    return participating;
  }

  async newCycle() {
    const ownerRepo = new MoluluRepository(owner);
    const receipt = await ownerRepo.newTrainingCycle();

    console.log('new cycle: ', receipt);
  }

  async boostBeforeTournament() {
    const now = this.battleDate;

    const participants = await this.participatingMolulus();

    const repo = new MoluluRepository(owner);
    const boosted = await boostMolulus(repo, participants, now);

    this.boostedMolulus = boosted;
  }

  async newVRFSeed() {
    console.log('VRF function');
    const repo = new ChainlinkRepository(owner);

    const VRF_RANDOM = await getRandom(repo);

    this.VRF_RANDOM = VRF_RANDOM;
  }

  async addYield(eth) {
    const vaultRepo = new YieldVaultRepository(owner);
    await vaultRepo.addYield(parseEther(eth));
  }

  async calcWinnerPrize(address) {
    const moluluRepo = new MoluluRepository(owner);
    const vaultRepo = new YieldVaultRepository(owner);
    return await getWinnerPrize({
      moluluRepo,
      vaultRepo,
    });
  }

  async declareWinner(molulu) {
    const repo = new MoluluRepository(owner);

    const address = await repo.fetchOwnerOf(molulu.id);
    const liquidityProvided = await repo.getLiquidityForUser(address);

    const prizeMoney = await this.calcWinnerPrize();

    const winningMolulu = { ...molulu, address, liquidityProvided, prizeMoney };

    this.tournamentWinner = winningMolulu;

    console.log('WINNER: ', this.tournamentWinner);
  }

  async payoutPrizeMoney() {
    if (this.tournamentWinner) {
      const repo = new MoluluRepository(owner);
      const receipt = await repo.finalizeCycle(this.tournamentWinner.address);

      const payout = {
        blockHash: receipt.blockHash,
        blockNumber: receipt.blockNumber,
        amountPayed: this.tournamentWinner.prizeMoney,
        to: this.tournamentWinner.address,
      };

      console.log('Payout prize money receipt: ', payout);
    } else {
      console.log('NO WINNER YET');
    }
  }
}
