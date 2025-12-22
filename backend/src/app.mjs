import Battle from './models/Battle.mjs';
import MoluluRepository from './repository/MoluluRepository.mjs';
import { degen, chad, pepe, nancyPelosi } from './config.mjs';
import GameSimilator from './models/GameSimulator.mjs';

console.log('Start engine!');

//const tx = await molulu.batchMintMolulu(5);
// const allMolulus = await repo.fetchAllMolulus();

// console.log(allMolulus);

const simulator = new GameSimilator({
  players: [degen, chad, pepe, nancyPelosi],
});

simulator.createWallets();
// await simulator.mintMolusuls();
// await simulator.buyAccessory();

// await simulator.allAccessoryPurchases();

// simulator.participatingMolulus();
// simulator.getLiquidityContributors();
// simulator.boostBeforeTournament({ now: new Date('2025-12-25').getTime() });
// simulator.newCycle();

await simulator.newVRFSeed();

console.log('random is set:', simulator.VRF_RANDOM);
