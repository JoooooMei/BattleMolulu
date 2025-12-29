import { formatEther } from 'ethers';

export async function getWinnerPrize({ moluluRepo, vaultRepo }) {
  const totalLiquidity = await moluluRepo.getTotalLiquidity();
  const vaultBalance = await vaultRepo.getTotalBalance();

  const prizeWei = vaultBalance - totalLiquidity;

  return {
    prizeWei,
    prizeEth: formatEther(prizeWei),
  };
}
