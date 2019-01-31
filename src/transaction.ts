/*
 * Web3 Transaction utils
 *
 */

import BN                     from "bn.js";
import Web3                   from "web3";
import { ABIDefinition }      from "web3/eth/abi";
import { Transaction }        from "web3/eth/types";
import { TransactionReceipt } from "web3/types";
import { ERC20Abi }           from "./abi/erc20Abi";

const web3 = new Web3("https://mainnet.infura.io/metamask");

interface ITokenTransfer {
  from: string;
  to: string | undefined;
  value: number | undefined;
}

export class TransactionData {
  public tx: Promise<Transaction>;
  public txReceipt: Promise<TransactionReceipt>;
  public transferAbi: any;

  constructor(hash: string) {
    this.tx = web3.eth.getTransaction(hash);
    this.txReceipt = web3.eth.getTransactionReceipt(hash);
    this.transferAbi = ERC20Abi.filter((v) => v.name === "transfer")[0].inputs;
  }

  public getTransactionState = async (): Promise<boolean> => {
    const result = await this.txReceipt;
    return result.status;
  }

  public getTokenTransfer = async (): Promise<ITokenTransfer>  => {
    const tx = await this.tx;
    const data = tx.input.replace(/0x.{8}(.*)/, "$1");

    const decoded = web3.eth.abi.decodeParameters(this.transferAbi, data) as any;

    const from = tx.from;
    const to = decoded._to ? decoded._to as string : undefined;
    const value = decoded._value ? decoded._value as number : undefined;

    return {from, to, value};
  }
}
