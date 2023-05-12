require("@nomicfoundation/hardhat-toolbox");
require("hardhat-change-network");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
    solidity: "0.8.18",
    networks: {
        Sepolia: {
            url: "https://eth-sepolia.g.alchemy.com/v2/Eq-13k9JKDXPJ9DXOGOoZMzn9QKXXyJY",
            chainId: 11155111,
            gasPrice: 50000000000,
            accounts: ["557e1f7bf0f02d50a16647caa8644e2143ff0d86046cccc4b18d4f7ab492c83b", "969643c362f354453974f34aaff9050e83fab0b5d9fc292addbf8c27d53b16c2"]
        },

        BscTestNet: {
            url: "https://data-seed-prebsc-1-s1.binance.org:8545/",
            chainId: 97,
            gasPrice: 50000000000,
            accounts: { mnemonic: "rose capital around throw owner senior rebel road artwork traffic bicycle travel" }
        },
    }
};
