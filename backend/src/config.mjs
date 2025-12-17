export const abi = [
  {
    inputs: [],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'sender',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
    ],
    name: 'ERC721IncorrectOwner',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'operator',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'ERC721InsufficientApproval',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'approver',
        type: 'address',
      },
    ],
    name: 'ERC721InvalidApprover',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'operator',
        type: 'address',
      },
    ],
    name: 'ERC721InvalidOperator',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
    ],
    name: 'ERC721InvalidOwner',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'receiver',
        type: 'address',
      },
    ],
    name: 'ERC721InvalidReceiver',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'sender',
        type: 'address',
      },
    ],
    name: 'ERC721InvalidSender',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'ERC721NonexistentToken',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
    ],
    name: 'OwnableInvalidOwner',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
    ],
    name: 'OwnableUnauthorizedAccount',
    type: 'error',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'accessory',
        type: 'string',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'buyer',
        type: 'address',
      },
    ],
    name: 'AccessoryBought',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'approved',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'Approval',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'operator',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'bool',
        name: 'approved',
        type: 'bool',
      },
    ],
    name: 'ApprovalForAll',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'user',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'LiquidityAdded',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
    ],
    name: 'MoluluMinted',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'previousOwner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'OwnershipTransferred',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'cycleId',
        type: 'uint256',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'startTimestamp',
        type: 'uint256',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'startBlock',
        type: 'uint256',
      },
    ],
    name: 'TrainingCycleStarted',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'from',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'Transfer',
    type: 'event',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'accessoryHistory',
    outputs: [
      {
        internalType: 'string',
        name: 'accessory',
        type: 'string',
      },
      {
        internalType: 'uint256',
        name: 'timestamp',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    name: 'accessoryPrices',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'approve',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
    ],
    name: 'balanceOf',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'batchMintMolulu',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'battleInterval',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
      {
        internalType: 'string',
        name: 'accessory',
        type: 'string',
      },
    ],
    name: 'buyAccessory',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'cycleStartBlock',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'getAccessoryHistory',
    outputs: [
      {
        components: [
          {
            internalType: 'string',
            name: 'accessory',
            type: 'string',
          },
          {
            internalType: 'uint256',
            name: 'timestamp',
            type: 'uint256',
          },
        ],
        internalType: 'struct MoluluV2.AccessoryPurchase[]',
        name: '',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getAllMolulus',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'HP',
            type: 'uint256',
          },
          {
            internalType: 'enum MoluluV2.MoluluType',
            name: 'mtype',
            type: 'uint8',
          },
          {
            internalType: 'uint256',
            name: 'Attack',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'Defence',
            type: 'uint256',
          },
        ],
        internalType: 'struct MoluluV2.MoluluStats[]',
        name: 'statsArray',
        type: 'tuple[]',
      },
      {
        internalType: 'address[]',
        name: 'owners',
        type: 'address[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'getApproved',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getCurrentCycleInfo',
    outputs: [
      {
        internalType: 'uint256',
        name: 'cycleId',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'startBlock',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'getMolulu',
    outputs: [
      {
        internalType: 'uint256',
        name: 'HP',
        type: 'uint256',
      },
      {
        internalType: 'enum MoluluV2.MoluluType',
        name: 'mtype',
        type: 'uint8',
      },
      {
        internalType: 'uint256',
        name: 'Attack',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'Defence',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'globalBattleStart',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'operator',
        type: 'address',
      },
    ],
    name: 'isApprovedForAll',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    name: 'liquidityBalance',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'mintMolulu',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'moluluStats',
    outputs: [
      {
        internalType: 'uint256',
        name: 'HP',
        type: 'uint256',
      },
      {
        internalType: 'enum MoluluV2.MoluluType',
        name: 'mtype',
        type: 'uint8',
      },
      {
        internalType: 'uint256',
        name: 'Attack',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'Defence',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'name',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'nextBattleStart',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'nextCycleId',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'nextMoluluId',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'ownerOf',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'from',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'from',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
      {
        internalType: 'bytes',
        name: 'data',
        type: 'bytes',
      },
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'operator',
        type: 'address',
      },
      {
        internalType: 'bool',
        name: 'approved',
        type: 'bool',
      },
    ],
    name: 'setApprovalForAll',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'startNewTrainingCycle',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes4',
        name: 'interfaceId',
        type: 'bytes4',
      },
    ],
    name: 'supportsInterface',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'symbol',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'tokenURI',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'totalLiquidity',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'from',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'transferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
];
// export const abi = [
//   {
//     inputs: [],
//     stateMutability: 'nonpayable',
//     type: 'constructor',
//   },
//   {
//     inputs: [
//       {
//         internalType: 'address',
//         name: 'sender',
//         type: 'address',
//       },
//       {
//         internalType: 'uint256',
//         name: 'tokenId',
//         type: 'uint256',
//       },
//       {
//         internalType: 'address',
//         name: 'owner',
//         type: 'address',
//       },
//     ],
//     name: 'ERC721IncorrectOwner',
//     type: 'error',
//   },
//   {
//     inputs: [
//       {
//         internalType: 'address',
//         name: 'operator',
//         type: 'address',
//       },
//       {
//         internalType: 'uint256',
//         name: 'tokenId',
//         type: 'uint256',
//       },
//     ],
//     name: 'ERC721InsufficientApproval',
//     type: 'error',
//   },
//   {
//     inputs: [
//       {
//         internalType: 'address',
//         name: 'approver',
//         type: 'address',
//       },
//     ],
//     name: 'ERC721InvalidApprover',
//     type: 'error',
//   },
//   {
//     inputs: [
//       {
//         internalType: 'address',
//         name: 'operator',
//         type: 'address',
//       },
//     ],
//     name: 'ERC721InvalidOperator',
//     type: 'error',
//   },
//   {
//     inputs: [
//       {
//         internalType: 'address',
//         name: 'owner',
//         type: 'address',
//       },
//     ],
//     name: 'ERC721InvalidOwner',
//     type: 'error',
//   },
//   {
//     inputs: [
//       {
//         internalType: 'address',
//         name: 'receiver',
//         type: 'address',
//       },
//     ],
//     name: 'ERC721InvalidReceiver',
//     type: 'error',
//   },
//   {
//     inputs: [
//       {
//         internalType: 'address',
//         name: 'sender',
//         type: 'address',
//       },
//     ],
//     name: 'ERC721InvalidSender',
//     type: 'error',
//   },
//   {
//     inputs: [
//       {
//         internalType: 'uint256',
//         name: 'tokenId',
//         type: 'uint256',
//       },
//     ],
//     name: 'ERC721NonexistentToken',
//     type: 'error',
//   },
//   {
//     inputs: [
//       {
//         internalType: 'address',
//         name: 'owner',
//         type: 'address',
//       },
//     ],
//     name: 'OwnableInvalidOwner',
//     type: 'error',
//   },
//   {
//     inputs: [
//       {
//         internalType: 'address',
//         name: 'account',
//         type: 'address',
//       },
//     ],
//     name: 'OwnableUnauthorizedAccount',
//     type: 'error',
//   },
//   {
//     anonymous: false,
//     inputs: [
//       {
//         indexed: true,
//         internalType: 'address',
//         name: 'owner',
//         type: 'address',
//       },
//       {
//         indexed: true,
//         internalType: 'address',
//         name: 'approved',
//         type: 'address',
//       },
//       {
//         indexed: true,
//         internalType: 'uint256',
//         name: 'tokenId',
//         type: 'uint256',
//       },
//     ],
//     name: 'Approval',
//     type: 'event',
//   },
//   {
//     anonymous: false,
//     inputs: [
//       {
//         indexed: true,
//         internalType: 'address',
//         name: 'owner',
//         type: 'address',
//       },
//       {
//         indexed: true,
//         internalType: 'address',
//         name: 'operator',
//         type: 'address',
//       },
//       {
//         indexed: false,
//         internalType: 'bool',
//         name: 'approved',
//         type: 'bool',
//       },
//     ],
//     name: 'ApprovalForAll',
//     type: 'event',
//   },
//   {
//     anonymous: false,
//     inputs: [
//       {
//         indexed: true,
//         internalType: 'uint256',
//         name: 'tokenId',
//         type: 'uint256',
//       },
//       {
//         indexed: true,
//         internalType: 'address',
//         name: 'owner',
//         type: 'address',
//       },
//     ],
//     name: 'MoluluMinted',
//     type: 'event',
//   },
//   {
//     anonymous: false,
//     inputs: [
//       {
//         indexed: true,
//         internalType: 'address',
//         name: 'previousOwner',
//         type: 'address',
//       },
//       {
//         indexed: true,
//         internalType: 'address',
//         name: 'newOwner',
//         type: 'address',
//       },
//     ],
//     name: 'OwnershipTransferred',
//     type: 'event',
//   },
//   {
//     anonymous: false,
//     inputs: [
//       {
//         indexed: true,
//         internalType: 'address',
//         name: 'from',
//         type: 'address',
//       },
//       {
//         indexed: true,
//         internalType: 'address',
//         name: 'to',
//         type: 'address',
//       },
//       {
//         indexed: true,
//         internalType: 'uint256',
//         name: 'tokenId',
//         type: 'uint256',
//       },
//     ],
//     name: 'Transfer',
//     type: 'event',
//   },
//   {
//     inputs: [
//       {
//         internalType: 'address',
//         name: 'to',
//         type: 'address',
//       },
//       {
//         internalType: 'uint256',
//         name: 'tokenId',
//         type: 'uint256',
//       },
//     ],
//     name: 'approve',
//     outputs: [],
//     stateMutability: 'nonpayable',
//     type: 'function',
//   },
//   {
//     inputs: [
//       {
//         internalType: 'address',
//         name: 'owner',
//         type: 'address',
//       },
//     ],
//     name: 'balanceOf',
//     outputs: [
//       {
//         internalType: 'uint256',
//         name: '',
//         type: 'uint256',
//       },
//     ],
//     stateMutability: 'view',
//     type: 'function',
//   },
//   {
//     inputs: [
//       {
//         internalType: 'uint256',
//         name: 'amount',
//         type: 'uint256',
//       },
//     ],
//     name: 'batchMintMolulu',
//     outputs: [],
//     stateMutability: 'nonpayable',
//     type: 'function',
//   },
//   {
//     inputs: [],
//     name: 'battleInterval',
//     outputs: [
//       {
//         internalType: 'uint256',
//         name: '',
//         type: 'uint256',
//       },
//     ],
//     stateMutability: 'view',
//     type: 'function',
//   },
//   {
//     inputs: [
//       {
//         internalType: 'uint256',
//         name: 'tokenId',
//         type: 'uint256',
//       },
//     ],
//     name: 'getApproved',
//     outputs: [
//       {
//         internalType: 'address',
//         name: '',
//         type: 'address',
//       },
//     ],
//     stateMutability: 'view',
//     type: 'function',
//   },
//   {
//     inputs: [
//       {
//         internalType: 'uint256',
//         name: 'tokenId',
//         type: 'uint256',
//       },
//     ],
//     name: 'getMolulu',
//     outputs: [
//       {
//         internalType: 'uint256',
//         name: 'HP',
//         type: 'uint256',
//       },
//       {
//         internalType: 'enum Molulu.MoluluType',
//         name: 'mtype',
//         type: 'uint8',
//       },
//       {
//         internalType: 'uint256',
//         name: 'Attack',
//         type: 'uint256',
//       },
//       {
//         internalType: 'uint256',
//         name: 'Defence',
//         type: 'uint256',
//       },
//       {
//         internalType: 'string[]',
//         name: 'Accessories',
//         type: 'string[]',
//       },
//     ],
//     stateMutability: 'view',
//     type: 'function',
//   },
//   {
//     inputs: [],
//     name: 'globalBattleStart',
//     outputs: [
//       {
//         internalType: 'uint256',
//         name: '',
//         type: 'uint256',
//       },
//     ],
//     stateMutability: 'view',
//     type: 'function',
//   },
//   {
//     inputs: [
//       {
//         internalType: 'address',
//         name: 'owner',
//         type: 'address',
//       },
//       {
//         internalType: 'address',
//         name: 'operator',
//         type: 'address',
//       },
//     ],
//     name: 'isApprovedForAll',
//     outputs: [
//       {
//         internalType: 'bool',
//         name: '',
//         type: 'bool',
//       },
//     ],
//     stateMutability: 'view',
//     type: 'function',
//   },
//   {
//     inputs: [],
//     name: 'mintMolulu',
//     outputs: [],
//     stateMutability: 'nonpayable',
//     type: 'function',
//   },
//   {
//     inputs: [
//       {
//         internalType: 'uint256',
//         name: '',
//         type: 'uint256',
//       },
//     ],
//     name: 'moluluStats',
//     outputs: [
//       {
//         internalType: 'uint256',
//         name: 'HP',
//         type: 'uint256',
//       },
//       {
//         internalType: 'enum Molulu.MoluluType',
//         name: 'mtype',
//         type: 'uint8',
//       },
//       {
//         internalType: 'uint256',
//         name: 'Attack',
//         type: 'uint256',
//       },
//       {
//         internalType: 'uint256',
//         name: 'Defence',
//         type: 'uint256',
//       },
//     ],
//     stateMutability: 'view',
//     type: 'function',
//   },
//   {
//     inputs: [],
//     name: 'name',
//     outputs: [
//       {
//         internalType: 'string',
//         name: '',
//         type: 'string',
//       },
//     ],
//     stateMutability: 'view',
//     type: 'function',
//   },
//   {
//     inputs: [],
//     name: 'nextBattleStart',
//     outputs: [
//       {
//         internalType: 'uint256',
//         name: '',
//         type: 'uint256',
//       },
//     ],
//     stateMutability: 'view',
//     type: 'function',
//   },
//   {
//     inputs: [],
//     name: 'nextMoluluId',
//     outputs: [
//       {
//         internalType: 'uint256',
//         name: '',
//         type: 'uint256',
//       },
//     ],
//     stateMutability: 'view',
//     type: 'function',
//   },
//   {
//     inputs: [],
//     name: 'owner',
//     outputs: [
//       {
//         internalType: 'address',
//         name: '',
//         type: 'address',
//       },
//     ],
//     stateMutability: 'view',
//     type: 'function',
//   },
//   {
//     inputs: [
//       {
//         internalType: 'uint256',
//         name: 'tokenId',
//         type: 'uint256',
//       },
//     ],
//     name: 'ownerOf',
//     outputs: [
//       {
//         internalType: 'address',
//         name: '',
//         type: 'address',
//       },
//     ],
//     stateMutability: 'view',
//     type: 'function',
//   },
//   {
//     inputs: [],
//     name: 'renounceOwnership',
//     outputs: [],
//     stateMutability: 'nonpayable',
//     type: 'function',
//   },
//   {
//     inputs: [
//       {
//         internalType: 'address',
//         name: 'from',
//         type: 'address',
//       },
//       {
//         internalType: 'address',
//         name: 'to',
//         type: 'address',
//       },
//       {
//         internalType: 'uint256',
//         name: 'tokenId',
//         type: 'uint256',
//       },
//     ],
//     name: 'safeTransferFrom',
//     outputs: [],
//     stateMutability: 'nonpayable',
//     type: 'function',
//   },
//   {
//     inputs: [
//       {
//         internalType: 'address',
//         name: 'from',
//         type: 'address',
//       },
//       {
//         internalType: 'address',
//         name: 'to',
//         type: 'address',
//       },
//       {
//         internalType: 'uint256',
//         name: 'tokenId',
//         type: 'uint256',
//       },
//       {
//         internalType: 'bytes',
//         name: 'data',
//         type: 'bytes',
//       },
//     ],
//     name: 'safeTransferFrom',
//     outputs: [],
//     stateMutability: 'nonpayable',
//     type: 'function',
//   },
//   {
//     inputs: [
//       {
//         internalType: 'address',
//         name: 'operator',
//         type: 'address',
//       },
//       {
//         internalType: 'bool',
//         name: 'approved',
//         type: 'bool',
//       },
//     ],
//     name: 'setApprovalForAll',
//     outputs: [],
//     stateMutability: 'nonpayable',
//     type: 'function',
//   },
//   {
//     inputs: [
//       {
//         internalType: 'bytes4',
//         name: 'interfaceId',
//         type: 'bytes4',
//       },
//     ],
//     name: 'supportsInterface',
//     outputs: [
//       {
//         internalType: 'bool',
//         name: '',
//         type: 'bool',
//       },
//     ],
//     stateMutability: 'view',
//     type: 'function',
//   },
//   {
//     inputs: [],
//     name: 'symbol',
//     outputs: [
//       {
//         internalType: 'string',
//         name: '',
//         type: 'string',
//       },
//     ],
//     stateMutability: 'view',
//     type: 'function',
//   },
//   {
//     inputs: [
//       {
//         internalType: 'uint256',
//         name: 'tokenId',
//         type: 'uint256',
//       },
//     ],
//     name: 'tokenURI',
//     outputs: [
//       {
//         internalType: 'string',
//         name: '',
//         type: 'string',
//       },
//     ],
//     stateMutability: 'view',
//     type: 'function',
//   },
//   {
//     inputs: [
//       {
//         internalType: 'address',
//         name: 'from',
//         type: 'address',
//       },
//       {
//         internalType: 'address',
//         name: 'to',
//         type: 'address',
//       },
//       {
//         internalType: 'uint256',
//         name: 'tokenId',
//         type: 'uint256',
//       },
//     ],
//     name: 'transferFrom',
//     outputs: [],
//     stateMutability: 'nonpayable',
//     type: 'function',
//   },
//   {
//     inputs: [
//       {
//         internalType: 'address',
//         name: 'newOwner',
//         type: 'address',
//       },
//     ],
//     name: 'transferOwnership',
//     outputs: [],
//     stateMutability: 'nonpayable',
//     type: 'function',
//   },
// ];

export const address = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
export const addressV2 = '0x5FbDB2315678afecb367f032d93F642f64180aa3';

export const owner =
  '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80';

export const degen =
  '0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d';

export const chad =
  '0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a';

export const pepe =
  '0x7c852118294e51e653712a81e05800f419141751be58f605c371e15141b007a6';

export const nancyPelosi =
  '0x47e179ec197488593b187f80a00eb0da91f1b9d0b13f8733639f19c30a34926a';
