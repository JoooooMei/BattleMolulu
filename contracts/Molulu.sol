// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Molulu is ERC721, Ownable {
    uint256 public nextMululuId = 1;

    enum MululuType { Fire, Water, Earth, Wind }

    struct MululuStats {
        uint256 HP;
        MululuType mtype;
        uint256 Attack;
        uint256 Defence;
        string[] Accessories;
    }

    mapping(uint256 => MululuStats) public mululuStats;

    uint256 public globalBattleStart;
    uint256 public battleInterval = 30 days;

    event MululuMinted(uint256 indexed tokenId, address indexed owner);

    constructor() ERC721("Mululu", "MLU") Ownable(msg.sender) {
        globalBattleStart = block.timestamp;
    }

    function mintMululu() external {
        uint256 mululuId = nextMululuId;
        _safeMint(msg.sender, mululuId);

        mululuStats[mululuId] = generateRandomStats(mululuId);

        emit MululuMinted(mululuId, msg.sender); // logga mint

        nextMululuId++;
    }


    function generateRandomStats(uint256 tokenId) internal view returns (MululuStats memory) {
        uint256 rand = uint256(keccak256(abi.encodePacked(block.timestamp, msg.sender, tokenId)));

        uint256 HP = 50 + (rand % 101);
        uint256 Attack = 10 + ((rand >> 1) % 41);
        uint256 Defence = 5 + ((rand >> 2) % 26);
        MululuType mtype = MululuType(rand % 4);

        string[] memory acc = new string[](rand % 4);
        string[5] memory allAccessories = ["Hat", "Glasses", "Cape", "Boots", "Ring"];
        for (uint i = 0; i < acc.length; i++) {
            acc[i] = allAccessories[(rand >> (i+3)) % allAccessories.length];
        }

        return MululuStats(HP, mtype, Attack, Defence, acc);
    }

    function getMululu(uint256 tokenId) external view returns (
    uint256 HP,
    MululuType mtype,
    uint256 Attack,
    uint256 Defence,
    string[] memory Accessories
    ) {
        require(_ownerOf(tokenId) != address(0), "Molulu does not exsist");

        MululuStats storage stats = mululuStats[tokenId];
        return (stats.HP, stats.mtype, stats.Attack, stats.Defence, stats.Accessories);
    }


    // Global battle-logik
    function nextBattleStart() public view returns (uint256) {
        uint256 elapsed = block.timestamp - globalBattleStart;
        uint256 intervalsPassed = elapsed / battleInterval;
        return globalBattleStart + (intervalsPassed + 1) * battleInterval;
    }
}
