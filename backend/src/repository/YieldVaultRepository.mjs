import { ethers } from 'ethers';
import { NonceManager } from 'ethers';
import { abi_mock_yield_vault, addressMockYield } from '../config.mjs';

export default class YieldVaultRepository {
  constructor(walletAddress) {
    this.provider = new ethers.JsonRpcProvider('http://localhost:8545');

    const wallet = new ethers.Wallet(walletAddress, this.provider);
    this.signer = new NonceManager(wallet);

    this.rContract = new ethers.Contract(
      addressMockYield,
      abi_mock_yield_vault,
      this.provider
    );
    this.wContract = new ethers.Contract(
      addressMockYield,
      abi_mock_yield_vault,
      this.signer
    );
  }

  async getTotalBalance() {
    return await this.rContract.totalBalance();
  }

  async addYield(amountWei) {
    const tx = await this.wContract.addYield({
      value: amountWei,
    });

    await tx.wait();
  }
}
