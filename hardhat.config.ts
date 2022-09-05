import * as dotenv from "dotenv";

import { HardhatUserConfig, task } from "hardhat/config";
import { HttpNetworkUserConfig } from "hardhat/types";
import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import "@openzeppelin/hardhat-upgrades";
import "hardhat-gas-reporter";
import "solidity-coverage";

dotenv.config();

let adminPrivateKey = process.env.METACITY_ADMIN_PRIVATE_KEY;

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
    const accounts = await hre.ethers.getSigners();
  
    for (const account of accounts) {
      console.log(account.address);
    }
});

const commonNetworkConfig = (args?: HttpNetworkUserConfig): HttpNetworkUserConfig => ({
    gas: 2000000,
    gasPrice: 5 * 1000000000,
    gasMultiplier: 2,
    timeout: 5000000,
    ...args
});

const config: HardhatUserConfig = {
    solidity: {
        compilers: [{
            version: "0.8.4"
        }, {
            version: "0.8.2",
            settings: {
                optimizer: {
                    enabled: true,
                    runs: 200,
                },
            }
        }]
    },
    networks: {
        bscMainNet: commonNetworkConfig({
            url: `https://bsc-dataseed.binance.org/`,
            chainId: 56,
            accounts: [
                `${adminPrivateKey}`,
            ],
        }),
        ropsten: commonNetworkConfig({
            url: `https://ropsten.infura.io/v3/${process.env.INFURA_KEY_TOKAU}`,
            chainId: 3,
            accounts: [
                `${adminPrivateKey}`,
            ],
            gasPrice: 20 * 1000000000,
        }),
        ethereum: commonNetworkConfig({
            url: `https://mainnet.infura.io/v3/${process.env.INFURA_KEY_TOKAU}`,
            chainId: 1,
            accounts: [
                `${adminPrivateKey}`,
            ],
            gasPrice: 40 * 1000000000,
        }),
        bscTestNet: commonNetworkConfig({
            url: `https://data-seed-prebsc-1-s2.binance.org:8545/`,
            chainId: 97,
            gasPrice: 10 * 1000000000,
            accounts: [
                `${adminPrivateKey}`,
            ],
            timeout: 300000,
        }),
        rinkeby: commonNetworkConfig({
            url: `https://rinkeby.infura.io/v3/${process.env.INFURA_KEY_TOKAU}`,
            chainId: 4,
            accounts: [
                `${adminPrivateKey}`,
            ],
            gasPrice: 2 * 1000000000,
        }),
        localhost: commonNetworkConfig({
            url: `http://localhost:8545`,
            // accounts: [
            //     `${adminPrivateKey}`,
            //     `0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80`, //0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
            // ],
            // accounts: [
            //     `0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80`, //0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
            //     `0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d`, //0x70997970C51812dc3A010C7d01b50e0d17dc79C8
            // ]
        }),
        hardhat: {
            chainId: 31337,
            gas: 8500000,
            gasPrice: 1 * 1000000000,
            gasMultiplier: 1,
            // accounts: [{
            //     privateKey: `${adminPrivateKey}`,
            //     balance: '1000000000000000000000'  //1000 ether
            // }]
        }
    },
    // gasReporter: {
    //     enabled: process.env.REPORT_GAS !== undefined,
    //     currency: "USD"
    // },
    etherscan: {
        apiKey: {
            mainnet: `${process.env.ETHERUEM_API_KEY}`,
            rinkeby: `${process.env.ETHERUEM_API_KEY}`,
            bscTestnet: `${process.env.BSC_API_KEY}`,
            bsc: `${process.env.BSC_API_KEY}`
        },
    },
    paths: {
        sources: "./contracts",
        tests: "./test",
        cache: "./cache",
        artifacts: "./artifacts"
    }
}

export default config;