// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.19;

//IMPORT THE HARDHAT CONSOLE
import "hardhat/console.sol";

contract MyTest{

uint public unlockedTime;
address payable public owner;

event Widthrawal(uint256 amount, uint256 when);

constructor(uint256 _unlockedTime) payable{
    require(block.timestamp < _unlockedTime, "Unlockedtime shoud be future");

    unlockedTime = _unlockedTime;
    owner = payable(msg.sender);

    }

    function Withdraw() public{
        require(block.timestamp >= unlockedTime, "Wait till the time period complete");
        require(msg.sender == owner, "Your are not an owner");
  
    emit Widthrawal(address(this).balance, block.timestamp);

    owner.transfer(address(this).balance);
    }

}