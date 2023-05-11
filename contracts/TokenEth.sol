/* SPDX-License-Identifier: MIT */
pragma solidity ^0.8.9;

import "./TokenBase.sol";

contract TokenEth is TokenBase {
    constructor() TokenBase("ETH Token", "ETK") {}
}