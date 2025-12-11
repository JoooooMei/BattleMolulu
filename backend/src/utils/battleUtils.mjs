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
