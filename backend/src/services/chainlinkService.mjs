export const getRandom = async (repo) => {
  const request = await repo.fetchRandomness();

  const eventLog = request.logs.find(
    (log) => log.fragment.name === 'RandomnessRequested'
  );

  const requestId = eventLog.args[0];
  const random = await mockChainlinkNode(repo, requestId);

  return { requestId: requestId, VRF: random };
};

export const mockChainlinkNode = async (repo, id) => {
  const fulfill = await repo.fulfillRandomness(id);

  const eventLog = fulfill.logs.find(
    (log) => log.fragment.name === 'RandomnessFulfilled'
  );

  const randomResult = eventLog.args[1];

  return randomResult.toString();
};
