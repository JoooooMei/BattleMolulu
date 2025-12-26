import BattleRoyale from './models/BattleRoyale.mjs';
import { degen, chad, pepe, nancyPelosi } from './config.mjs';
import GameSimilator from './models/GameSimulator.mjs';

console.log('Start engine!');

//const tx = await molulu.batchMintMolulu(5);
// const allMolulus = await repo.fetchAllMolulus();

// console.log(allMolulus);

const simulator = new GameSimilator({
  players: [degen, chad, pepe, nancyPelosi],
  battleDate: '2026-01-30',
});

simulator.createWallets();
// await simulator.mintMolusuls();
// await simulator.buyAccessory();

// await simulator.allAccessoryPurchases();

// simulator.participatingMolulus();
// simulator.getLiquidityContributors();
await simulator.boostBeforeTournament();
// simulator.newCycle();

await simulator.newVRFSeed();

console.log('random is set:', simulator.VRF_RANDOM);

const tournament = new BattleRoyale({
  participants: simulator.boostedMolulus,
  vrf: simulator.VRF_RANDOM.VRF,
});

// console.log('Tournament created: ', tournament);

// tournament.createBattleTable();

// console.log('shuffled table: ', tournament.shuffledTable);

// const round = tournament.playRound();

// console.log('round results ', round);

tournament.playTournament();

simulator.declareWinner(tournament.winner);
