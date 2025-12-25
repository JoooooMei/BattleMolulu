import { ACCESSORY_BOOSTS } from '../config.mjs';
import crypto from 'crypto';

export const shuffleParticipants = ({ participants, random }) => {
  const result = [...participants];

  let seed = BigInt(random);
  const MOD = BigInt(2) ** BigInt(256);

  const next = () => {
    seed ^= seed << 13n;
    seed ^= seed >> 7n;
    seed ^= seed << 17n;
    seed %= MOD;
    return seed;
  };

  for (let i = result.length - 1; i > 0; i--) {
    const j = Number(next() % BigInt(i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }

  return result;
};

export const deriveMatchSeed = (vrf, matchIndex, round = 0) => {
  const input = JSON.stringify({
    vrf: vrf.toString(),
    round,
    matchIndex,
  });

  return BigInt('0x' + crypto.createHash('sha256').update(input).digest('hex'));
};

export const makePRNG = (seed) => {
  let state = seed;

  return () => {
    state ^= state << 13n;
    state ^= state >> 7n;
    state ^= state << 17n;
    return Number(state % 1_000_000n) / 1_000_000;
  };
};

const getDaysSince = (timestamp, nowMs) => {
  const then = timestamp * 1000;
  return Math.floor((nowMs - then) / (1000 * 60 * 60 * 24));
};

export const calculateBoost = (moluluBaseStats, participants, now) => {
  return moluluBaseStats.map((molulu) => {
    const participant = participants.find((p) => p.id === molulu.id);

    let boosted = { ...molulu, boost: { hp: 0, attack: 0, defence: 0 } };

    for (const item of participant.accessories) {
      const accessory = ACCESSORY_BOOSTS[item.accessory];

      const days = Math.min(
        getDaysSince(item.timestamp, now),
        accessory.maxDays || Infinity
      );

      if (days <= 0) continue;

      console.log('Processing accessory:', item.accessory, 'Boost:', accessory);

      for (const stat in accessory) {
        const add = accessory[stat] * days;

        boosted[stat] += add;
        boosted.boost[stat] += add;
      }
    }

    return boosted;
  });
};
