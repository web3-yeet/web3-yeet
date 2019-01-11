/*
 * Web3 Wallet utils
 *
 */

import Web3                   from 'web3';
import BN                     from 'bn.js';
import { ERC20 }              from './erc20';
import { TransactionReceipt } from 'web3/eth/../types';

const web3 = new Web3(Web3.givenProvider || 'https://mainnet.infura.io/metamask');

interface IReceipt {
  success: boolean;
  txhash:  string;
}

export class Wallet {
  address: Promise<string[]>;

  constructor() {
    this.address = web3.eth.getAccounts();
  }

  getAddress = (): Promise<string | undefined> => {
    return new Promise((resolve, reject) => {
      this.address.then((addressList: string[]) => {
        resolve(addressList[0]);
      });
    });
  }

  sendEther = async (address: string, amount: number): Promise<IReceipt> => {
    const sender = await this.getAddress().catch((e: Error) => { throw(e) } );

    return new Promise((resolve, reject) => {
      if(typeof sender !== 'string')
        reject("There is no wallet access.");

      const wallet = sender as string;
      const wei    = web3.utils.toWei(web3.utils.toBN(amount), 'ether');

      return web3.eth.sendTransaction({
        from:   wallet,
        to:     address,
        value:  wei.toString(),
      })
        .on('receipt', (receipt: TransactionReceipt) => {
          resolve({
            success: receipt.status,
            txhash: receipt.transactionHash
          });
        })
        .on('error', (error: any) => {
          throw error;
        });
    });
  }

  sendERC20 = async (address: string, amount: number, erc20: ERC20) => {
    const sender        = await this.getAddress().catch((e: Error) => { throw(e) } );
    const decimalFactor = await erc20.getDecimalFactor();

    return new Promise((resolve, reject) => {
      if(typeof erc20.token === 'undefined')
        reject("Token instance couldn't be initialised");

      if(typeof sender !== 'string')
        reject("There is no wallet access.");

      if(!(decimalFactor instanceof BN))
        reject("Could not get token data.");

      const wallet = sender as string;
      const wei    = web3.utils.toBN(amount).mul(decimalFactor as BN);

      return (erc20.token as any).methods.transfer(address, wei).send({
        from:   wallet,
        to:     erc20.address,
        value:  0,
      })
        .on('receipt', (receipt: TransactionReceipt) => {
          resolve({
            success: receipt.status,
            txhash: receipt.transactionHash
          });
        })
        .on('error', (error: any) => {
          throw error;
        });
    });
  }
}
