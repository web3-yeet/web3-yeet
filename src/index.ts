/*
 * Web3 ERC20 utils
 *
 */

import Web3 from 'web3';
import Contract from 'web3/eth/contract';
import ERC20Abi from './abi/erc20Abi.js';

const web3 = new Web3('https://mainnet.infura.io/metamask');

interface IInfo {
  name:         string | undefined;
  symbol:       string | undefined;
  totalSupply:  number | undefined;
}

export class ERC20 {
  address:  string | undefined;
  token:    Contract | undefined;
  info:     IInfo;
  erc20Abi: any;

  constructor(address: string) {
    this.address  = undefined;
    this.token    = undefined;
    this.erc20Abi = ERC20Abi;

    this.info = {
      name:         undefined,
      symbol:       undefined,
      totalSupply:  undefined,
    }

    
    if((/(0x)?([0-9a-f]{40})/gmi).test(address)){
      this.address = address;
      this.token = new web3.eth.Contract(this.erc20Abi, address);

      this.token.methods.name().call()
        .then((name: string) => this.info.name = name)
        .catch((e: Error) => console.error("Could not get name", e))

      this.token.methods.symbol().call()
        .then((symbol: string) => this.info.symbol = symbol)
        .catch((e: Error) => console.error("Could not get symbol", e))

      this.token.methods.totalSupply().call()
        .then((totalSupply: number) => this.info.totalSupply = totalSupply)
        .catch((e: Error) => console.error("Could not get total supply", e))
    }
  }

  getBalance = (user: string): (Promise<any> | undefined) => {
    return this.token ? this.token.methods.balanceOf(user).call() : undefined;
  }

  getName = () : (string | undefined) => {
    return this.info.name;
  }
  
  getSymbol = (): (string | undefined) => {
    return this.info.symbol;
  }
  
  getTotalSupply = (): (number | undefined) => {
    return this.info.totalSupply;
  }
}
