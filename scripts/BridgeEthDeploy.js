const { ethers } = require("hardhat")

const main = async () => {
    const [ deployer ] = await ethers.getSigners(); 

    const TokenEthFactory = await ethers.getContractFactory("contracts/TokenEth.sol:TokenEth", deployer);
    const TokenEth = await TokenEthFactory.deploy();
    await TokenEth.deployed();
    console.log("Token Contract address:", TokenEth.address);

    const BridgeEthFactory = await ethers.getContractFactory("contracts/BridgeEth.sol:BridgeEth", deployer);
    const BridgeEth = await BridgeEthFactory.deploy(TokenEth.address);
    await BridgeEth.deployed();
    console.log("Contract address:", BridgeEth.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

// Token Contract address: 0xB5DF0d56c817c1dC74aee347d2C247188e0CaD31
// BridgeEth Contract address: 0x1f22C2bee3593410f69B5fD2FA757b1D157f6c28