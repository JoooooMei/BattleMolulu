// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

import "../interface/IYieldVault.sol";

contract MockYieldVault is IYieldVault {
    uint256 public totalDeposits;

    function deposit() external payable override {
        totalDeposits += msg.value;
    }

    function withdraw(uint256 amount) external override {
        require(amount <= totalDeposits, "Not enough balance");
        totalDeposits -= amount;
        payable(msg.sender).transfer(amount);
    }

    function totalBalance() external view override returns (uint256) {
        return totalDeposits;
    }

    function addYield() external payable {
        totalDeposits += msg.value;
    }

    receive() external payable {}
}
