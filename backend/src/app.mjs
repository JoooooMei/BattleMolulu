import BattleRoyale from './models/BattleRoyale.mjs';
import { owner, degen, chad, pepe, nancyPelosi } from './config.mjs';
import GameSimilator from './models/GameSimulator.mjs';

console.log('Start engine!');

const simulator = new GameSimilator({
  players: [degen, chad, pepe, nancyPelosi],
  battleDate: '2026-06-30',
});

await simulator.createWallets();

await simulator.mintMolusuls();
await simulator.buyAccessory();

await simulator.boostBeforeTournament();

await simulator.newVRFSeed();

const tournament = new BattleRoyale({
  participants: simulator.boostedMolulus,
  vrf: simulator.VRF_RANDOM.VRF,
});

await simulator.addYield('0.5');

tournament.playTournament();

await simulator.declareWinner(tournament.winner);

await simulator.payoutPrizeMoney();

// await simulator.newCycle();
