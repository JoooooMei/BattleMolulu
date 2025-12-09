import MoluluSimulator from './models/Molulu.mjs';

const Molulu = new MoluluSimulator();

const tx = await Molulu.batchMintMolulu(5);

console.log('Mint transaction: ', tx);

const molulu = await Molulu.fetchMolulu({ id: 1 });

console.log('fetched molulu', molulu);

const allMolulus = await Molulu.fetchAllMolulus();

console.log(allMolulus);
