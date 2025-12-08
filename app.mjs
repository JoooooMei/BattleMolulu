import { ethers } from 'ethers';
import { abi } from './config.mjs';

const provider = new ethers.JsonRpcProvider('http://localhost:8545');

const mululuAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
const mululuAbi = abi;

const mululuContract = new ethers.Contract(mululuAddress, mululuAbi, provider);

async function fetchAllMululus() {
  const nextId = await mululuContract.nextMululuId();
  const allMululus = [];

  for (let id = 1; id < nextId; id++) {
    try {
      const [HP, mtype, Attack, Defence, Accessories] =
        await mululuContract.getMululuStats(id);
      const owner = await mululuContract.ownerOf(id);

      allMululus.push({
        id,
        owner,
        HP: HP.toNumber ? HP.toNumber() : HP,
        type: ['Fire', 'Water', 'Earth', 'Wind'][mtype],
        Attack: Attack.toNumber ? Attack.toNumber() : Attack,
        Defence: Defence.toNumber ? Defence.toNumber() : Defence,
        Accessories,
      });
    } catch (err) {
      console.log(`Mululu ${id} finns inte eller mint har misslyckats`);
    }
  }

  return allMululus;
}

fetchAllMululus()
  .then((mululus) => {
    console.log('Alla Mululus:', mululus);
  })
  .catch(console.error);
