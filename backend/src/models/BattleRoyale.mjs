import {
  deriveMatchSeed,
  makePRNG,
  shuffleParticipants,
} from '../utils/battleUtils.mjs';

export default class BattleRoyale {
  constructor({ participants, vrf }) {
    this.random = vrf;
    this.participants = participants;
    this.round = 1;

    this.shuffledTable = [];

    this.winner = null;
  }

  startBattle() {
    this.createBattleTable();
  }

  createBattleTable() {
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

  playRound(round = this.round) {
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

    // Extrahera vinnare för nästa runda
    const winners = roundResults.map((r) => r.winner);

    console.log(`Round ${round} winners:`, winners);

    return { roundResults, winners };
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

  playTournament() {
    while (this.participants.length > 1) {
      console.log(`--- Round ${this.round} ---`);

      this.createBattleTable();
      const { winners } = this.playRound();

      // Uppdatera deltagarna för nästa runda direkt i klassens property
      this.participants = winners;

      this.round++;
    }

    this.winner = this.participants[0];
    console.log('Tournament winner:', this.winner);
    return this.winner;
  }
}
