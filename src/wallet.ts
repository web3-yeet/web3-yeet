/*
 * Web3 Wallet utils
 *
 */

import Web3 from 'web3';
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

  sendEther = (address: string, amount: number): Promise<IReceipt> => {
    return new Promise(async (resolve, reject) => {
      const wallet = ((wallet: (string | void)): (string | undefined) => {
        if(typeof wallet === 'string') return wallet;
        else return undefined;
      })(await this.getAddress().catch((e: Error) => { throw(e) } ));
      
      const wei = web3.utils.toWei(web3.utils.toBN(amount), 'ether');

      if(typeof wallet !== 'string') throw ReferenceError("There is no wallet access.");

      web3.eth.sendTransaction({
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
}
