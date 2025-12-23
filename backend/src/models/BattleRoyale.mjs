import {
  deriveMatchSeed,
  makePRNG,
  shuffleParticipants,
} from '../utils/battleUtils.mjs';

export default class BattleRoyale {
  constructor({ participants, vrf }) {
    this.random = vrf;
    this.participants = participants;

    this.shuffledTable = [];

    this.winner = null;
  }

  startBattle() {
    this.createBattleTable();
  }

  createBattleTable() {
    console.log('this.participants: ', this.participants);
    console.log('this.random', this.random);
    const shuffled = shuffleParticipants({
      participants: this.participants,
      random: this.random,
    });

    console.log('Shuffled', shuffled);

    const table = [];
    for (let i = 0; i < shuffled.length; i += 2) {
      if (i + 1 < shuffled.length) {
        table.push([shuffled[i], shuffled[i + 1]]);
      } else {
        table.push([shuffled[i]]); // bye
      }
    }

    this.shuffledTable = table;
  }

  playRound(round = 0) {
    if (!this.shuffledTable.length) {
      this.createBattleTable();
    }

    const roundResults = [];

    for (
      let matchIndex = 0;
      matchIndex < this.shuffledTable.length;
      matchIndex++
    ) {
      const match = this.shuffledTable[matchIndex];

      // skapa deterministiskt match-seed
      const matchSeed = deriveMatchSeed(this.random, matchIndex, round);

      // skapa PRNG från matchSeed
      const rng = makePRNG(matchSeed);

      // avgör vinnare
      const result = this.resolveMatch(match, rng);

      roundResults.push(result);
    }

    return roundResults;
  }

  resolveMatch(match, rng) {
    if (match.length === 1) {
      // Bye
      return { winner: match[0], match };
    }

    const [a, b] = match;

    // exempel: attack * slump
    const aScore = a.attack * rng();
    const bScore = b.attack * rng();

    const winner = aScore >= bScore ? a : b;

    return { winner, match, rolls: { aScore, bScore } };
  }
}
