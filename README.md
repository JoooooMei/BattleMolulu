### Setup

Install all dependencies in root and backend folder. Then run in root:

Node:

```zsh
npx hardhat node
```

Compile contract:

```zsh
npx hardhat compile
```

Deploy contracts:

```zsh
npx hardhat ignition deploy ./ignition/modules/MockConsumerVRF.ts --network localhost
```

```zsh
npx hardhat ignition deploy ./ignition/modules/MoluluV2.ts --network localhost
```

After deploy, add abi for all the contracts and contract addresses in backend/config.

### Run simulation

In backend folder:

- npm start will run app.mjs.

```zsh
npm start
```

#### Explanation of what happens:

All the functions in this explanation will be executed automatically when "npm start" command is runned

---

---

1.  A new instance of the game simultor is created. Players in the simulator should not be changed because the simulator is depending on them but end date can be changed. The date needs to be in the future for the creatures to be boosted.

```js
const simulator = new GameSimilator({
  players: [degen, chad, pepe, nancyPelosi],
  battleDate: '2026-06-30',
});
```

---

---

2. Next wallets (or repositories) are created. Every player mints a creature (Molulu) and every user buys accessories that will boost the Creatures stats over time. Every time a participnt buys accessories, liquidity is added to the yield farming contract.

```js
await simulator.createWallets();
await simulator.mintMolusuls();
await simulator.buyAccessory();
```

---

---

3. This step will find all active Molulus, ie, those who bought accessories (and therefore contributed to the yield farming) during the tournament season. The molulus who bought accessories early will be bosted more. The Molulus who bought nothing will be excuded.

```js
await simulator.boostBeforeTournament();
```

---

---

4. A function that request a VRF seed is called. The seed is used to add randomness to the tournament tabel and battles. This call marks the end of the training stage of the game and the tournament will start.

```js
await simulator.newVRFSeed();
```

---

---

5. A Battle royale instance is created. The eligible/boosted participants and VRF seed is sent to the class. If you want to test if the application is deterministic, you can swap out the vrf value to another number.

```js
const tournament = new BattleRoyale({
  participants: simulator.boostedMolulus,
  vrf: simulator.VRF_RANDOM.VRF,
});
```

---

---

6. Yield is simulated. An amount in eth is simply sent to the mock yield farming contract. This represents the yield that a real Aave liquidity pool could generate.

```js
await simulator.addYield('0.5');
```

---

---

7. Start the tournament. This function is a loop that calls all neccesary functions that constitutes a battle royale tournament

```js
tournament.playTournament();
```

It kind of goes like this:

- Randomize the tournament table so participants cant anticipate who they will face off against.
- pairs of player gets to compete in a round. A new (pseudo)random seed will be created based on the VRF-seed, match-index and round number. This random number will be used to manipulate the competitors stats so the outcome of the battle is unnkown beforehand.
- Resolve the match
- The process is repeated until there is one winner.

---

---

8. This fuction will collect detatils about who owns the Molulu and how much löiquidity that user provided.

```js
await simulator.declareWinner(tournament.winner);
```

---

---

9. Here, the smart cointract gets a notice about the winner and the prize money (yield form the liquidity pool) is payed out.

```js
await simulator.payoutPrizeMoney();
```
