/* SPDX-License-Identifier: MIT */
pragma solidity ^0.8.9;

import "./IToken.sol";

contract BridgeBase {
    address public admin;
    IToken public token;
    uint256 public nonce;
    mapping(uint => bool) public processedNonces;

    enum Step {
        Burn,
        Mint
    }

    event Transfer(
        address from,
        address to,
        uint amount,
        uint date,
        uint nonce,
        Step indexed step
    );

    constructor(address _token) {
        admin = msg.sender;
        token = IToken(_token);
    }

    function burn(address from, address to, uint amount) external {
        token.burn(from, amount);
        emit Transfer(
            msg.sender,
            to,
            amount,
            block.timestamp,
            nonce,
            Step.Burn
        );
        nonce++;
    }

    function mint(address to, uint amount, uint otherChainNonce) external {
        require(msg.sender == admin, "only admin");
        require(
            processedNonces[otherChainNonce] == false,
            "transfer already processed"
        );
        processedNonces[otherChainNonce] = true;
        token.mint(to, amount);
        emit Transfer(
            msg.sender,
            to,
            amount,
            block.timestamp,
            otherChainNonce,
            Step.Mint
        );
    }
}
