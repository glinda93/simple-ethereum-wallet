// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract SimpleEthereumWallet {

  using SafeMath for uint256;

  address owner;
  mapping(address => User) public users;

  struct User {
    bytes32 passwordHash;
    uint256 balance;
  }

  modifier onlyOwner() {
    require(msg.sender == owner, "Not the owner");
    _;
  }

  modifier registerPassword(bytes32 password) {
    if (users[msg.sender].passwordHash != 0) {
      _;
    } else {
      users[msg.sender].passwordHash = keccak256(abi.encodePacked(password, msg.sender));
      _;
    }
  }

  modifier checkPassword(bytes32 password) {
    require(users[msg.sender].passwordHash == keccak256(abi.encodePacked(password, msg.sender)), "Password does not match");
    _;
  }

  modifier checkBalance(uint256 amount) {
    require(users[msg.sender].balance > amount, "Insufficient balance");
    _;
  }

  constructor(bytes32 password) payable registerPassword(password) {
    owner = msg.sender;
    users[msg.sender].balance = msg.value;
  }

  function deposit(bytes32 password) external payable registerPassword(password) checkPassword(password) {
    users[msg.sender].balance = msg.value;
  }

  function withdraw(bytes32 password, uint256 amount) external checkPassword(password) checkBalance(amount) {
    users[msg.sender].balance -= amount;
    (bool success, ) = payable(msg.sender).call{value: amount}("");
    require(success, "Fail to send");
  }

  function transfer(bytes32 password, address payee, uint256 amount) external checkPassword(password) checkBalance(amount) {
    require(msg.sender != payee, "Cannot transfer to self");
    require(users[payee].passwordHash != 0, "Payee does not have password");
    users[msg.sender].balance -= amount;
    users[payee].balance += amount;
  }

  function getBalance(address addr) external view returns(uint256) {
    return users[addr].balance;
  }

  function closeService(bytes32 password) external onlyOwner checkPassword(password) {
    selfdestruct(payable(owner));
  }
}
