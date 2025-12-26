// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

interface IYieldVault {
    function deposit() external payable;
    function withdraw(uint256 amount) external;
    function totalBalance() external view returns (uint256);
}