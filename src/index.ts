/*
 * Web3 ERC20 utils
 *
 */

import Web3              from 'web3';
import Contract          from 'web3/eth/contract';
import BN                from 'bn.js';
import { ABIDefinition } from "web3/eth/abi";
import { ERC20Abi }      from './abi/erc20Abi';

const web3 = new Web3('https://mainnet.infura.io/metamask');

interface IInfo {
  name:         Promise<string> | undefined;
  symbol:       Promise<string> | undefined;
  totalSupply:  Promise<number> | undefined;
  decimals:     Promise<number> | undefined;
}

export class ERC20 {
  address:        string | undefined;
  token:          Contract | undefined;
  info:           IInfo;
  erc20Abi:       ABIDefinition[];
  decimalFactor:  BN;

  constructor(address: string) {
    this.address       = undefined;
    this.token         = undefined;
    this.erc20Abi      = ERC20Abi;
    this.decimalFactor = web3.utils.toBN('1');

    this.info = {
      name:         undefined,
      symbol:       undefined,
      totalSupply:  undefined,
      decimals:     undefined,
    }


    if((/(0x)?([0-9a-f]{40})/gmi).test(address)){
      this.address = address;
      this.token   = new web3.eth.Contract(this.erc20Abi, address);

      this.info.name        = this.token.methods.name().call();
      this.info.symbol      = this.token.methods.symbol().call();
      this.info.totalSupply = this.token.methods.totalSupply().call();
      this.info.decimals    = this.token.methods.decimals().call();

      this.info.decimals.then((decimals: number) => {
        this.decimalFactor = web3.utils.toBN('1' + '0'.repeat(decimals));
      })
    }
  }

  getBalance = (user: string): Promise<(string | undefined)> => {
    return new Promise((resolve, reject) => {
      if(this.token === undefined) {
        resolve(undefined);
      } else {
        this.token.methods.balanceOf(user).call()
          .then(async (balance: string) => {
            const b      = web3.utils.toBN(balance);
            const factor = await this.getDecimalFactor();

            if(factor === undefined) {
              resolve(undefined);
            } else {
              const w = b.div(factor);
              const f = b.mod(factor);

              resolve(`${w}.${f}`);
            }
          })
          .catch((e: Error) => reject(e));
      }
    })
  }


  getInfo = () : IInfo => {
    return this.info;
  }

  getDecimalFactor = async (): Promise<(BN | undefined)> => {
    const decimals = await this.info.decimals
    return decimals !== undefined ? web3.utils.toBN('1' + '0'.repeat(decimals)) : undefined;
  }

  getName = (): (Promise<string> | undefined) => {
    return this.info.name;
  }

  getSymbol = (): (Promise<string> | undefined) => {
    return this.info.symbol;
  }

  getTotalSupply = (): (Promise<number> | undefined) => {
    return this.info.totalSupply;
  }

  getDecimals = (): (Promise<number> | undefined) => {
    return this.info.decimals;
  }
}
