/*
 * Web3 ERC20 utils
 *
 */

import BN                from "bn.js";
import Web3              from "web3";
import { ABIDefinition } from "web3/eth/abi";
import Contract          from "web3/eth/contract";
import { ERC20Abi }      from "./abi/erc20Abi";

const web3 = new Web3("https://mainnet.infura.io/metamask");

interface IInfo {
  name: Promise<string> | undefined;
  symbol: Promise<string> | undefined;
  totalSupply: Promise<number> | undefined;
  decimals: Promise<number> | undefined;
}

export class ERC20 {
  public address: string | undefined;
  public token: Contract | undefined;
  public info: IInfo;
  public erc20Abi: ReadonlyArray<ABIDefinition>;

  constructor(address: string) {
    if (!web3.utils.isAddress(web3.utils.toChecksumAddress(address))) {
      throw new Error("Invalid Ethereum address provided");
    }

    this.erc20Abi = ERC20Abi;
    this.info = {
      name:         undefined,
      symbol:       undefined,
      totalSupply:  undefined,
      decimals:     undefined,
    };

    this.address = address;
    this.token   = new web3.eth.Contract(this.erc20Abi, address);

    this.info.name        = this.token.methods.name().call();
    this.info.symbol      = this.token.methods.symbol().call();
    this.info.totalSupply = this.token.methods.totalSupply().call();
    this.info.decimals    = this.token.methods.decimals().call();
  }

  public getBalance = async (user: string): Promise<string> => {
    if (this.token === undefined) {
      throw new ReferenceError("No token has been created");
    } else {
      const balance = await this.token.methods.balanceOf(user).call();
      const factor  = web3.utils.toBN(await this.getDecimalFactor());
      const b       = web3.utils.toBN(balance);

      if (factor === undefined) {
        throw new ReferenceError("Could not get decimal places");
      } else {
        const w = b.div(factor);
        const f = b.mod(factor);

        return (`${w}.${f}`);
      }
    }
  }

  public getInfo = (): IInfo => {
    return this.info;
  }

  public getDecimalFactor = async (): Promise<(string | undefined)> => {
    const decimals = await this.info.decimals;
    return decimals !== undefined ? ("1" + "0".repeat(decimals)) : undefined;
  }

  public getName = (): (Promise<string> | undefined) => {
    return this.info.name;
  }

  public getSymbol = (): (Promise<string> | undefined) => {
    return this.info.symbol;
  }

  public getTotalSupply = (): (Promise<number> | undefined) => {
    return this.info.totalSupply;
  }

  public getDecimals = (): (Promise<number> | undefined) => {
    return this.info.decimals;
  }
}
