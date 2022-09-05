import { MetacityOreToken } from "../typechain-types";
import { ZERO_ADDRESS } from "../utils/testUtils";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { Signer, BigNumber, BigNumberish, ContractFactory } from "ethers";

const hre: HardhatRuntimeEnvironment = require("hardhat");

export const actionMEOToken = async (): Promise<MetacityOreToken> => {
    let _MetacityOreToken: ContractFactory = await hre.ethers.getContractFactory("MetacityOreToken");
    let meoToken: MetacityOreToken = (await _MetacityOreToken.deploy()) as MetacityOreToken;
    return meoToken;
}

actionMEOToken().then(() => {
    console.log("meo token deployed");
});