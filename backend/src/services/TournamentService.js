import MoluluRepository from '../repositories/MoluluRepository.mjs';

const repository = new MoluluRepository();

export const getTournamentSnapshot = async () => {
  const contributors = await repository.fetchLiquidityContributors();
  const purchases = await repository.fetchAllAccessoryPurchases();

  const moluluAccessoryMap = {};
  purchases.forEach((p) => {
    if (!moluluAccessoryMap[p.moluluId]) moluluAccessoryMap[p.moluluId] = [];
    moluluAccessoryMap[p.moluluId].push({
      accessory: p.accessory,
      timestamp: p.timestamp,
    });
  });

  return contributors.map((user) => ({
    address: user.address,
    totalETH: user.totalETH,
    molulus: user.molulus.map((tokenId) => ({
      id: tokenId,
      accessories: moluluAccessoryMap[tokenId] || [],
    })),
  }));
};

export const getEligibleMolulus = async (tournamentStart) => {
  const snapshot = await getTournamentSnapshot();

  return snapshot
    .map((user) => ({
      address: user.address,
      totalETH: user.totalETH,
      molulus: user.molulus.filter((m) =>
        m.accessories.some((a) => a.timestamp <= tournamentStart)
      ),
    }))
    .filter((u) => u.molulus.length > 0);
};
