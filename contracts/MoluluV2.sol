// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol"; 
import "./interface/IYieldVault.sol"; 

contract MoluluV2 is ERC721, Ownable, ReentrancyGuard {
    receive() external payable {}

    uint256 public nextMoluluId = 1;
    uint256 public nextCycleId = 2;
    uint256 public globalBattleStart;
    uint256 public battleInterval = 30 days;

    mapping(uint256 => uint256) public cycleStartBlock;
    mapping(address => uint256) public liquidityBalance;
    uint256 public totalLiquidity;

    IYieldVault public yieldVault;

    event LiquidityAdded(address indexed user, uint256 amount);
    event PrincipalWithdrawn(address indexed user, uint256 amount);

    // ------------------------------
    event TrainingCycleStarted(
        uint256 indexed cycleId,
        uint256 indexed startTimestamp,
        uint256 indexed startBlock
    );

    enum MoluluType { Fire, Water, Earth, Wind }

    struct MoluluStats {
        uint256 HP;
        MoluluType mtype;
        uint256 Attack;
        uint256 Defence;
    }

    mapping(uint256 => MoluluStats) public moluluStats;

    struct AccessoryPurchase {
        string accessory;
        uint256 timestamp;
    }

    mapping(uint256 => AccessoryPurchase[]) public accessoryHistory;
    mapping(string => uint256) public accessoryPrices;

    event MoluluMinted(uint256 indexed tokenId, address indexed owner);
    event AccessoryBought(uint256 indexed tokenId, string accessory, address buyer);
    event CycleFinalized(address indexed winner, uint256 prizeMoney);

    constructor(address _yieldVault)
        ERC721("Molulu", "MLU")
        Ownable(msg.sender)
    {
        yieldVault = IYieldVault(_yieldVault);

        globalBattleStart = block.timestamp;
        cycleStartBlock[1] = block.number;
        emit TrainingCycleStarted(1, block.timestamp, block.number); 

        accessoryPrices["Hat"] = 0.01 ether;
        accessoryPrices["Glasses"] = 0.02 ether;
        accessoryPrices["Cape"] = 0.03 ether;
        accessoryPrices["Boots"] = 0.025 ether;
        accessoryPrices["Ring"] = 0.05 ether;
    }

    function startNewTrainingCycle() external onlyOwner {
        globalBattleStart = block.timestamp;
        uint256 cycleId = nextCycleId;
        cycleStartBlock[cycleId] = block.number;
        emit TrainingCycleStarted(cycleId, block.timestamp, block.number);
        nextCycleId++;
    }

    function getCurrentCycleInfo() external view returns (uint256 cycleId, uint256 startBlock) {
        uint256 current = nextCycleId - 1;
        return (current, cycleStartBlock[current]);
    }

    function mintMolulu() external {
        uint256 moluluId = nextMoluluId;
        _safeMint(msg.sender, moluluId);
        moluluStats[moluluId] = generateRandomStats(moluluId);
        emit MoluluMinted(moluluId, msg.sender);
        nextMoluluId++;
    }

    function batchMintMolulu(uint256 amount) external {
        require(amount > 1, "Amount must be > 1");
        for (uint256 i = 0; i < amount; i++) {
            uint256 moluluId = nextMoluluId;
            _safeMint(msg.sender, moluluId);
            moluluStats[moluluId] = generateRandomStats(moluluId);
            emit MoluluMinted(moluluId, msg.sender);
            nextMoluluId++;
        }
    }

    function generateRandomStats(uint256 tokenId)
        internal
        view
        returns (MoluluStats memory)
    {
        uint256 rand = uint256(keccak256(abi.encodePacked(block.timestamp, msg.sender, tokenId)));
        return MoluluStats(
            50 + (rand % 101),
            MoluluType(rand % 4),
            10 + ((rand >> 1) % 41),
            5 + ((rand >> 2) % 26)
        );
    }

    function buyAccessory(uint256 tokenId, string memory accessory) external payable {
        require(_ownerOf(tokenId) != address(0), "Molulu does not exist");
        require(ownerOf(tokenId) == msg.sender, "You do not own this Molulu");

        uint256 price = accessoryPrices[accessory];
        require(price > 0, "Accessory does not exist");
        require(msg.value >= price, "Not enough ETH sent");

        accessoryHistory[tokenId].push(
            AccessoryPurchase({
                accessory: accessory,
                timestamp: block.timestamp
            })
        );

        yieldVault.deposit{ value: price }();

        liquidityBalance[msg.sender] += price;
        totalLiquidity += price;

        emit LiquidityAdded(msg.sender, price);

        if (msg.value > price) {
            payable(msg.sender).transfer(msg.value - price);
        }

        emit AccessoryBought(tokenId, accessory, msg.sender);
    }

    function getMolulu(uint256 tokenId) external view returns (
        uint256 HP,
        MoluluType mtype,
        uint256 Attack,
        uint256 Defence
    ) {
        MoluluStats storage stats = moluluStats[tokenId];
        return (stats.HP, stats.mtype, stats.Attack, stats.Defence);
    }

    function getAccessoryHistory(uint256 tokenId) external view returns (AccessoryPurchase[] memory) {
        return accessoryHistory[tokenId];
    }

    function finalizeCycle(address winner) external onlyOwner nonReentrant {
        uint256 vaultBalance = yieldVault.totalBalance();
        require(vaultBalance > totalLiquidity, "No yield to pay");

        uint256 prizeMoney = vaultBalance - totalLiquidity;

        yieldVault.withdraw(prizeMoney);

        (bool sentWinner, ) = winner.call{ value: prizeMoney }("");
        require(sentWinner, "Prize transfer failed");

        emit CycleFinalized(winner, prizeMoney);
    }

    function withdrawPrincipal() external nonReentrant {
        uint256 amount = liquidityBalance[msg.sender];
        require(amount > 0, "No principal to withdraw");

        liquidityBalance[msg.sender] = 0;
        totalLiquidity -= amount;

        yieldVault.withdraw(amount);

        (bool sent, ) = msg.sender.call{ value: amount }("");
        require(sent, "Transfer failed");

        emit PrincipalWithdrawn(msg.sender, amount);
    }

    function nextBattleStart() public view returns (uint256) {
        uint256 elapsed = block.timestamp - globalBattleStart;
        uint256 intervalsPassed = elapsed / battleInterval;
        return globalBattleStart + (intervalsPassed + 1) * battleInterval;
    }
}
