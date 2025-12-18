import { ACCESSORY_BOOSTS } from '../config.mjs';

export const getNumericSeed = (seed) => {
  return parseInt(seed.slice(2, 18), 16); // first 16 hex digits
};

export const shuffleParticipants = ({ participants, random }) => {
  const result = [...participants];

  const pseudoRandom = () => {
    // simple xorshift PRNG
    random ^= random << 13;
    random ^= random >> 17;
    random ^= random << 5;
    return ((random < 0 ? ~random + 1 : random) % 1e9) / 1e9;
  };

  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(pseudoRandom() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }

  return result;
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
      // console.log('Processing accessory:', item.accessory, 'Boost:', accessory);
      if (!accessory) continue;

      const days = Math.min(
        getDaysSince(item.timestamp, now),
        accessory.maxDays || Infinity
      );
      // console.log('Days since purchase:', days);

      if (days <= 0) continue;

      console.log('Processing accessory:', item.accessory, 'Boost:', accessory);

      for (const stat in accessory) {
        const add = accessory[stat] * days;
        console.log(`Adding ${add} to ${stat}`);
        boosted[stat] += add;
        boosted.boost[stat] += add;
      }
    }

    return boosted;
  });
};
