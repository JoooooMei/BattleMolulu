import { ethers } from 'ethers';
import { NonceManager } from 'ethers';
import { abi_mock_consumer_VRF, addressVRFConsumer } from '../config.mjs';

export default class ChainlinkRepository {
  constructor(walletAddress) {
    this.provider = new ethers.JsonRpcProvider('http://localhost:8545');

    const wallet = new ethers.Wallet(walletAddress, this.provider);
    this.signer = new NonceManager(wallet);

    this.rContract = new ethers.Contract(
      addressVRFConsumer,
      abi_mock_consumer_VRF,
      this.provider
    );
    this.wContract = new ethers.Contract(
      addressVRFConsumer,
      abi_mock_consumer_VRF,
      this.signer
    );
  }

  async fetchRandomness() {
    try {
      const tx = await this.wContract.requestRandomness();

      return await tx.wait();
    } catch (error) {
      console.log(error);
    }
  }

  async fulfillRandomness(id) {
    try {
      const tx = await this.wContract.fulfillRandomness(id);

      return await tx.wait();
    } catch (error) {}
  }
}
