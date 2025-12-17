import MoluluRepository from '../repository/MoluluRepository.mjs';

export const getTournamentSnapshot = async (repo) => {
  const contributors = await repo.fetchLiquidityContributors();
  const purchases = await repo.fetchAllAccessoryPurchases();

  const moluluAccessoryMap = {};
  for (const p of purchases) {
    if (!moluluAccessoryMap[p.moluluId]) {
      moluluAccessoryMap[p.moluluId] = [];
    }

    moluluAccessoryMap[p.moluluId].push({
      accessory: p.accessory,
      timestamp: p.timestamp,
    });
  }

  const eligibleMoluluIds = new Set(
    Object.keys(moluluAccessoryMap).map(Number)
  );

  return contributors.map((user) => ({
    address: user.address,
    totalETH: user.totalETH,
    molulus: [...eligibleMoluluIds].map((id) => ({
      id,
      accessories: moluluAccessoryMap[id],
    })),
  }));
};

export const getTournamentSnapshotV2 = async (repo) => {
  const contributors = await repo.fetchLiquidityContributors();
  const purchases = await repo.fetchAllAccessoryPurchases();

  const ownerMap = {};

  for (const p of purchases) {
    if (!ownerMap[p.owner]) {
      ownerMap[p.owner] = {};
    }

    if (!ownerMap[p.owner][p.moluluId]) {
      ownerMap[p.owner][p.moluluId] = [];
    }

    ownerMap[p.owner][p.moluluId].push({
      accessory: p.accessory,
      timestamp: p.timestamp,
    });
  }

  return contributors
    .filter((c) => ownerMap[c.address]) // bara de som köpt
    .map((c) => ({
      address: c.address,
      totalETH: c.totalETH,
      molulus: Object.entries(ownerMap[c.address]).map(([id, accessories]) => ({
        id: Number(id),
        accessories,
      })),
    }));
};

export const getEligibleMolulus = async (repo, tournamentStart) => {
  const snapshot = await getTournamentSnapshot(repo);

  return snapshot
    .map((user) => ({
      address: user.address,
      totalETH: user.totalETH,
      molulus: user.molulus.filter((m) =>
        m.accessories.some((a) => a.timestamp >= tournamentStart)
      ),
    }))
    .filter((u) => u.molulus.length > 0);
};

export const getTournamentStartTime = async (repo) => {
  const startBlock = await repo.getCycleStartBlock();

  const block = await repo.provider.getBlock(startBlock);
  if (!block) {
    throw new Error(`Block ${startBlock} not found`);
  }

  return block.timestamp;
};

export const getParticipatingMolulus = async (repo, tournamentStart) => {
  const snapshot = await getEligibleMolulus(repo, tournamentStart);

  return snapshot.flatMap((user) => user.molulus);
};
