// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Molulu is ERC721, Ownable {
    uint256 public nextMoluluId = 1;

    enum MoluluType { Fire, Water, Earth, Wind }

    struct MoluluStats {
        uint256 HP;
        MoluluType mtype;
        uint256 Attack;
        uint256 Defence;
        string[] Accessories;
    }

    mapping(uint256 => MoluluStats) public moluluStats;

    uint256 public globalBattleStart;
    uint256 public battleInterval = 30 days;

    event MoluluMinted(uint256 indexed tokenId, address indexed owner);

    
    constructor() ERC721("Molulu", "MLU") Ownable(msg.sender) {
        globalBattleStart = block.timestamp;
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

    function getMolulu(uint256 tokenId) external view returns (
        uint256 HP,
        MoluluType mtype,
        uint256 Attack,
        uint256 Defence,
        string[] memory Accessories
    ) 
    {
        require(_ownerOf(tokenId) != address(0), "Molulu does not exsist");

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
