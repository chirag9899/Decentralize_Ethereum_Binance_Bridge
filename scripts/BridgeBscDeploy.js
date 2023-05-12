const { ethers } = require("hardhat")

const main = async () => {
    const [ deployer ] = await ethers.getSigners();

    const TokenBscFactory = await ethers.getContractFactory("contracts/TokenBsc.sol:TokenBsc", deployer);
    const TokenBsc = await TokenBscFactory.deploy();
    await TokenBsc.deployed();
    console.log("Token Contract address:", TokenBsc.address);

    const BridgeBscFactory = await ethers.getContractFactory("contracts/BridgeBsc.sol:BridgeBsc", deployer);
    const BridgeBsc = await BridgeBscFactory.deploy(TokenBsc.address);
    await BridgeBsc.deployed();
    console.log("Contract address:", BridgeBsc.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

// Token Contract address: 0xae0e3B804c6BD316BBCFae7326b10ccEEb5c74E5
// BridgeBsc Contract address: 0x2830E5ecdf51ed6d233274a0451e220b473F3E2a