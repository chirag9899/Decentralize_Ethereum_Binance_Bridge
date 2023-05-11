/* SPDX-License-Identifier: MIT */
pragma solidity ^0.8.9;

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';

contract TokenBase is ERC20 {

    address public admin;

    constructor (string memory _name, string memory _symbol) ERC20 (_name, _symbol) {
        admin = msg.sender;
    }

    function mint(address to, uint256 amount) external {
        require(msg.sender == admin, 'only admin');
        _mint(to, amount);
    }

    function burn(address owner, uint256 amount) external {
        require(msg.sender == admin, 'only admin');
        _burn(owner, amount);
    }
}