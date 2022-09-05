
import "@nomiclabs/hardhat-ethers";
import { Signer, BigNumber, BigNumberish, ContractTransaction } from "ethers";
import { HardhatRuntimeEnvironment } from "hardhat/types";

export const GWEI = 1 * 10 ** 9;
export const ETHER = 1 * 10 ** 18;
export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';

export const getGWEI = (amount: number): BigNumber => {
    return BigNumber.from(amount).mul(BigNumber.from(10).pow(9));
}

export const getETHER = (amount: number): BigNumber => {
    return BigNumber.from(amount).mul(BigNumber.from(10).pow(18));
}

export const getBlockChainFormatTime = (time?: number): string => {
    let blockTimeJsVersion: number = time || new Date().getTime()
    return (blockTimeJsVersion/1000).toFixed(0);
}

export const commonInfo = async (hre: HardhatRuntimeEnvironment) => {
    let signer: Signer[] = await hre.ethers.getSigners();
    console.log(`network: ${ hre.network.name }, signer account: ${await signer[0].getAddress()}`);
}

export const logGasCost = async (tx: ContractTransaction, name?: string) => {
    let txReceipt = await tx.wait();
    console.log(`transaction ${name || ""} performing gas used: ${ txReceipt.gasUsed}`);
}

export const contractTransactionInfo = async (tx: ContractTransaction, name?: string) => {
    let txReceipt = await tx.wait();
    console.log(`transaction ${name || ""} receipt: ${ JSON.stringify(txReceipt, null, 4) }`);
}

export const getTimeUnit = (hre: HardhatRuntimeEnvironment, time: number): number => {
    let timeUnit = time;
    switch (hre.network.name) {
        case 'bscMainNet':
        case 'ethereum':
            break;
        case 'rinkeby':
        case 'bscTestNet':
        case "localhost":
        default:
            timeUnit = BigNumber.from(time).div(60*60*24).toNumber();
            break;
    }
    return timeUnit
}

export const getTokenUnit = (hre: HardhatRuntimeEnvironment, price?: BigNumber): BigNumberish => {
    //1000 ether
    return getPriceUnit(hre, price || BigNumber.from(
        BigNumber.from(1000)
            .mul(BigNumber.from(`${ETHER}`))
        )
    );
}

export const getPriceUnit = (hre: HardhatRuntimeEnvironment, price?: BigNumber): BigNumberish => {
    //0.01 ether
    let unit: BigNumberish = price || BigNumber.from(
        BigNumber.from(1).mul(
            BigNumber.from(`${ETHER}`)
        ).div(100)
    );
    switch (hre.network.name) {
        case 'bscMainNet':
        case 'ethereum':
            break;
        case 'rinkeby':
        case 'bscTestNet':
        case "localhost":
        default:
            unit = unit.div(1000);
            break;
    } 
    return unit;
}

export const basicTestSuite = async (): Promise<{
    hre: HardhatRuntimeEnvironment,
    admin: Signer,
    user1?: Signer,
    user2?: Signer,
    user3?: Signer,
    hack?: Signer
}> => {
    let hre: HardhatRuntimeEnvironment = require("hardhat");
    let accounts: Signer[] = await hre.ethers.getSigners();
    let admin: Signer, user1: Signer, user2: Signer, user3: Signer, hack: Signer;
    [ admin, user1, user2, user3, hack ] = accounts;
    
    return {
        hre, admin, user1, user2, user3, hack
    }
}
