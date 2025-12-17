// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MoluluV2 is ERC721, Ownable {
    uint256 public nextMoluluId = 1;
    uint256 public nextCycleId = 2;
    uint256 public globalBattleStart;
    uint256 public battleInterval = 30 days;

    mapping(uint256 => uint256) public cycleStartBlock;
    mapping(address => uint256) public liquidityBalance;
    uint256 public totalLiquidity;
    event LiquidityAdded(address indexed user, uint256 amount);
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

    constructor() ERC721("Molulu", "MLU") Ownable(msg.sender) {
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

        // Store cycle start block in-state 
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
        require(amount > 1, "Amount must be > 1. Use mintMolulu() for single mint");

        for (uint256 i = 0; i < amount; i++) {
            uint256 moluluId = nextMoluluId;
            _safeMint(msg.sender, moluluId);

            moluluStats[moluluId] = generateRandomStats(moluluId);

            emit MoluluMinted(moluluId, msg.sender);
            nextMoluluId++;
        }
    }

    function generateRandomStats(uint256 tokenId) internal view returns (MoluluStats memory) {
        uint256 rand = uint256(keccak256(abi.encodePacked(block.timestamp, msg.sender, tokenId)));

        uint256 HP = 50 + (rand % 101);
        uint256 Attack = 10 + ((rand >> 1) % 41);
        uint256 Defence = 5 + ((rand >> 2) % 26);
        MoluluType mtype = MoluluType(rand % 4);

        return MoluluStats(HP, mtype, Attack, Defence);
    }

    function buyAccessory(uint256 tokenId, string memory accessory) external payable {
        require(_ownerOf(tokenId) != address(0), "Molulu does not exist");
        require(ownerOf(tokenId) == msg.sender, "You do not own this Molulu");

        uint256 price = accessoryPrices[accessory];
        require(price > 0, "Accessory does not exist");
        require(msg.value >= price, "Not enough ETH sent");

        // Record purchase with timestamp
        accessoryHistory[tokenId].push(AccessoryPurchase({
            accessory: accessory,
            timestamp: block.timestamp
        }));

        // Update liquidity tracking
        liquidityBalance[msg.sender] += price;
        totalLiquidity += price;
        emit LiquidityAdded(msg.sender, price);

        // Refund excess ETH
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

    function getAllMolulus() external view returns (
        MoluluStats[] memory statsArray,
        address[] memory owners
    ) {
        uint256 total = nextMoluluId - 1;
        statsArray = new MoluluStats[](total);
        owners = new address[](total);

        for (uint256 tokenId = 1; tokenId <= total; tokenId++) {
            owners[tokenId - 1] = _ownerOf(tokenId);
            statsArray[tokenId - 1] = moluluStats[tokenId];
        }
    }

    function nextBattleStart() public view returns (uint256) {
        uint256 elapsed = block.timestamp - globalBattleStart;
        uint256 intervalsPassed = elapsed / battleInterval;
        return globalBattleStart + (intervalsPassed + 1) * battleInterval;
    }
}
