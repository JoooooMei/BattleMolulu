import { getNumericSeed, shuffleParticipants } from '../utils/battleUtils.mjs';

export default class Battle {
  constructor({ participants }) {
    this.participants = participants;
    this.winner = null;
    this.seed =
      '0x2c0e7b0b735933a5d7fa3bf219c985a8e4d9c78d2de6f1c55c74e3f67d55cd41';
    this.table = [];
  }

  startBattle() {
    this.createBattleTable();
  }

  createBattleTable() {
    const numericSeed = getNumericSeed(this.seed);
    const shuffled = shuffleParticipants({
      participants: this.participants,
      random: numericSeed,
    });

    const table = [];
    for (let i = 0; i < shuffled.length; i += 2) {
      if (i + 1 < shuffled.length) {
        table.push([shuffled[i], shuffled[i + 1]]);
      } else {
        table.push([shuffled[i]]); // bye
      }
    }

    this.table = table;
    console.log('Knockout table:', this.table);
  }
}
