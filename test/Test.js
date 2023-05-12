const { ethers } = require('hardhat');
const { expect } = require('chai');
const hre = require("hardhat");
const config=require("../hardhat.config.js")

const TokenEthABI = require("../artifacts/contracts/TokenEth.sol/TokenEth.json");
const TokenBscABI = require("../artifacts/contracts/TokenBsc.sol/TokenBsc.json");
const BridgeEthABI = require("../artifacts/contracts/BridgeEth.sol/BridgeEth.json");
const BridgeBscABI = require("../artifacts/contracts/BridgeBsc.sol/BridgeBsc.json");

describe('ERC20 Tokens Exercise 2', function () {
    let deployer, user1, user2;

    before(async function () {
        hre.changeNetwork('Sepolia');

        [deployer, user1, user2] = await ethers.getSigners();

        console.log(hre.network.name);

        this.TokenEth = await ethers.getContractAt(
            TokenEthABI.abi,
            "0xB5DF0d56c817c1dC74aee347d2C247188e0CaD31"
        );
        // console.log(this.TokenEth)

        // this.TokenBsc = await ethers.getContractAt(
        //     TokenBscABI.abi,
        //     "0xae0e3B804c6BD316BBCFae7326b10ccEEb5c74E5"
        // );
        // console.log(this.TokenBsc)

        this.BridgeEth = await ethers.getContractAt(
            BridgeEthABI.abi,
            "0x1f22C2bee3593410f69B5fD2FA757b1D157f6c28"
        )
        // console.log("BridgeETH Contract: ", this.BridgeEth);
    });

    it('Send 1000 token', async function () {
        console.log(this.BridgeEth)
        // console.log(user1.address);
        // const bal = await this.TokenEth.balanceOf(user1.address);
        // console.log(bal);
        // (await this.TokenEth.mint(user1.address, ethers.utils.parseEther('1000'))).wait(100);
        // const currental = await this.TokenEth.balanceOf(user1.address);
        // console.log(currental)
        // expect((await this.TokenEth.balanceOf(user1.address)).sub(bal)).to.be.equal(ethers.utils.parseEther('1000'));
    });

    it('Deposit tokens tests', async function () {
        const conbal = await this.TokenEth.balanceOf(this.BridgeEth.address);
        console.log(conbal);
        // (await this.TokenEth.connect(user1).transfer(this.BridgeEth.address, ethers.utils.parseEther("1000"), {gasPrice: 50000000000, gasLimit: 100000})).wait(100);
        // console.log(await this.TokenEth.balanceOf(this.BridgeEth.address));
        // console.log(await this.BridgeEth.admin());
        // console.log(deployer.address);

        (await this.BridgeEth.burn(this.BridgeEth.address, "0x960A5ae555E270Ea2858E03b266b55dd2C66845A", ethers.utils.parseEther("5"), {gasPrice: 50000000000, gasLimit: 100000})).wait(100);

        // expect(await this.TokenEth.balanceOf("0x0\5325EA90Dd7FE91F1D1f1f40fDe8655fbcB5C6F").sub(conbal)).to.be.equal(ethers.utils.parseEther("1000"));
    });
    it('Withdraw tokens tests', async function () { });
});