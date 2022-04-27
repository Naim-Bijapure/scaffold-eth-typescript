// SPDX-License-Identifier: WTFPL
pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "hardhat/console.sol";

contract Monyo is ERC20 {
  constructor(address account, uint256 initialSupply) ERC20("Monyo", "MON") {
    _mint(account, initialSupply);
  }
}
