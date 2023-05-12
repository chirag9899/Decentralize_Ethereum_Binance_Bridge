const { ethers } = require("hardhat");
const BridgeEthABI = require("../artifacts/contracts/BridgeEth.sol/BridgeEth.json");
const BridgeBscABI = require("../artifacts/contracts/BridgeBsc.sol/BridgeBsc.json");
const hre = require("hardhat");

const providerBridgeETH = new ethers.providers.JsonRpcProvider('https://eth-sepolia.g.alchemy.com/v2/Eq-13k9JKDXPJ9DXOGOoZMzn9QKXXyJY')
const providerBridgeBSC = new ethers.providers.JsonRpcProvider('https://data-seed-prebsc-1-s1.binance.org:8545/')
const BridgeETHContractAddress = '0x1f22C2bee3593410f69B5fD2FA757b1D157f6c28'
const BridgeBSCContractAddress = '0x2830E5ecdf51ed6d233274a0451e220b473F3E2a'

const BridgeEth = new ethers.Contract(BridgeETHContractAddress, BridgeEthABI.abi, providerBridgeETH);
const BridgeBsc = new ethers.Contract(BridgeBSCContractAddress, BridgeBscABI.abi, providerBridgeBSC);

const ethPrivate = '557e1f7bf0f02d50a16647caa8644e2143ff0d86046cccc4b18d4f7ab492c83b';
const BridgeEthsigner = new ethers.Wallet(ethPrivate, providerBridgeETH);


const bseMnemonic = "rose capital around throw owner senior rebel road artwork traffic bicycle travel";
const BridgeBscwallet = ethers.Wallet.fromMnemonic(bseMnemonic)
const BridgeBscSigner = BridgeBscwallet.connect(providerBridgeBSC)

if (BridgeEth != undefined && BridgeBsc != undefined) {
    const ethFilterOptions = { fromBlock: 0, step: 0 };
    const bscFilterOptions = { fromBlock: 0, step: 0 };


    BridgeEth.on('Transfer', async (from, to, amount, time, nonce, event) => {
        console.log(`Event on ETH network: ${from} -> ${to} ${amount}`);
        try {
            await BridgeBsc.connect(BridgeBscSigner).mint(to, amount, nonce, { gasPrice: 50000000000, gasLimit: 100000 });
            console.log(`Successfully minted ${amount} tokens to ${to} with nonce ${nonce} on BSC network`);
        } catch (error) {
            console.error(`Error while minting tokens: ${error}`);
        }
    }, ethFilterOptions);

    BridgeBsc.on('Transfer', async (from, to, amount, time, nonce, event) => {
        console.log(`Event on BSC network: ${from} -> ${to} ${amount}`);
        try {
            await BridgeEth.connect(BridgeEthsigner).mint(to, amount, nonce);
            console.log(`Successfully minted ${amount} tokens to ${to} with nonce ${nonce} on ETH network`);
        } catch (error) {
            console.error(`Error while minting tokens: ${error}`);
        }
    }, bscFilterOptions);
}
