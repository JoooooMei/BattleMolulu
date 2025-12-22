// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract MockConsumerVRF {
    uint256 public randomResult;

    mapping(bytes32 => bool) public pendingRequests;

    event RandomnessRequested(bytes32 indexed requestId);
    event RandomnessFulfilled(bytes32 indexed requestId, uint256 randomness);

    function requestRandomness() external returns (bytes32 requestId) {
        requestId = keccak256(
            abi.encodePacked(
                msg.sender,
                block.timestamp,
                block.number
            )
        );

        pendingRequests[requestId] = true;

        emit RandomnessRequested(requestId);
    }

    function fulfillRandomness(bytes32 requestId) external {
        require(pendingRequests[requestId], "Invalid requestId");

        uint256 randomness = uint256(
            keccak256(
                abi.encodePacked(
                    requestId,
                    block.prevrandao,
                    block.timestamp
                )
            )
        );

        delete pendingRequests[requestId];
        randomResult = randomness;

        emit RandomnessFulfilled(requestId, randomness);
    }
}
