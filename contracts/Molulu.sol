// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Molulu is ERC721, Ownable {
    uint256 public nextMoluluId = 1;
    uint256 public globalBattleStart;
    uint256 public battleInterval = 30 days;

    enum MoluluType { Fire, Water, Earth, Wind }

    struct MoluluStats {
        uint256 HP;
        MoluluType mtype;
        uint256 Attack;
        uint256 Defence;
        string[] Accessories;
    }

    mapping(uint256 => MoluluStats) public moluluStats;

   
    struct StatBoost {
        uint256 HP;
        uint256 Attack;
        uint256 Defence;
    }

    mapping(string => StatBoost) public accessoryBoosts;
    mapping(string => uint256) public accessoryPrices;


    event MoluluMinted(uint256 indexed tokenId, address indexed owner);
    event AccessoryBought(uint256 indexed tokenId, string accessory, address buyer);

    constructor() ERC721("Molulu", "MLU") Ownable(msg.sender) {
        globalBattleStart = block.timestamp;

        accessoryBoosts["Hat"] = StatBoost(0, 0, 5);       // +5 Defence
        accessoryBoosts["Glasses"] = StatBoost(0, 3, 0);   // +3 Attack
        accessoryBoosts["Cape"] = StatBoost(10, 0, 0);     // +10 HP
        accessoryBoosts["Boots"] = StatBoost(0, 2, 2);     // +2 Attack, +2 Defence
        accessoryBoosts["Ring"] = StatBoost(0, 5, 0);      // +5 Attack

        accessoryPrices["Hat"] = 0.01 ether;
        accessoryPrices["Glasses"] = 0.02 ether;
        accessoryPrices["Cape"] = 0.03 ether;
        accessoryPrices["Boots"] = 0.025 ether;
        accessoryPrices["Ring"] = 0.05 ether;
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

        string[] memory acc = new string[](rand % 4);
        string[5] memory allAccessories = ["Hat", "Glasses", "Cape", "Boots", "Ring"];
        for (uint i = 0; i < acc.length; i++) {
            acc[i] = allAccessories[(rand >> (i+3)) % allAccessories.length];
        }

        return MoluluStats(HP, mtype, Attack, Defence, acc);
    }

    function buyAccessory(uint256 tokenId, string memory accessory) external payable {
        require(_ownerOf(tokenId) != address(0), "Molulu does not exist");
        require(ownerOf(tokenId) == msg.sender, "You do not own this Molulu");

        uint256 price = accessoryPrices[accessory];
        require(price > 0, "Accessory does not exist");
        require(msg.value >= price, "Not enough ETH sent");

        moluluStats[tokenId].Accessories.push(accessory);

        StatBoost memory boost = accessoryBoosts[accessory];
        moluluStats[tokenId].HP += boost.HP;
        moluluStats[tokenId].Attack += boost.Attack;
        moluluStats[tokenId].Defence += boost.Defence;

        //TODO Maybe reqire amount to be correct instead
        if (msg.value > price) {
            payable(msg.sender).transfer(msg.value - price);
        }

        emit AccessoryBought(tokenId, accessory, msg.sender);
    }

    function getMolulu(uint256 tokenId) external view returns (
        uint256 HP,
        MoluluType mtype,
        uint256 Attack,
        uint256 Defence,
        string[] memory Accessories
    ) 
    {
        require(_ownerOf(tokenId) != address(0), "Molulu does not exist");

        MoluluStats storage stats = moluluStats[tokenId];
        return (stats.HP, stats.mtype, stats.Attack, stats.Defence, stats.Accessories);
    }


    // Global battle-logik
    function nextBattleStart() public view returns (uint256) {
        uint256 elapsed = block.timestamp - globalBattleStart;
        uint256 intervalsPassed = elapsed / battleInterval;
        return globalBattleStart + (intervalsPassed + 1) * battleInterval;
    }
}
