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
// simulator.mintMolusuls();
// simulator.buyAccessory();

// simulator.getLiquidityContributors();
simulator.allAccessoryPurchases();

simulator.participatingMolulus();
