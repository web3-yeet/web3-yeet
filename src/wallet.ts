/*
 * Web3 Wallet utils
 *
 */

import Web3                   from 'web3';
import BN                     from 'bn.js';
import { ERC20 }              from './erc20';
import { TransactionReceipt } from 'web3/eth/../types';
import { Provider }           from 'web3/eth/../providers';
import { Tx }                 from 'web3/eth/types';

interface IReceipt {
  success: boolean;
  txhash:  string;
}

export class Wallet {
  addressList: Promise<string[]>;
  web3: Web3;

  constructor() {
    this.web3 = new Web3(Web3.givenProvider || 'https://mainnet.infura.io/metamask');
    this.addressList = this.web3.eth.getAccounts();
    this.enable();

    if(this.web3.publicConfigStore)
      this.web3.publicConfigStore.on('update', this.updateAddress);
  }

  setProvider = async (provider: Provider) => {
    this.web3.setProvider(provider);
    await this.enable();
  }
  
  isAvailable = async (): Promise<boolean> => {
    const addressList: string[] = await this.addressList.catch((e: Error) => { throw(e) } );
    return addressList !== undefined && addressList.length > 0; 
  }
  
  getAddress = async (): Promise<string | undefined> => {
    if(await this.isAvailable()) {
      const addressList: string[] = await this.addressList.catch((e: Error) => { throw(e) } );
      return addressList[0];
    } else {
      return undefined;
    }
  }
  
  updateAddress = async (update: Object) => {
    if((await this.getAddress()).toLowerCase() !== update.selectedAddress.toLowerCase())
      this.addressList = this.web3.eth.getAccounts();
  }

  sendEther = async (address: string, amount: number): Promise<IReceipt> => {
    const sender = await this.getAddress().catch((e: Error) => { throw(e) } );

    if(typeof sender !== 'string')
      throw Error("There is no wallet access.");

    const wallet = sender as string;
    const wei    = this.web3.utils.toWei(`${amount}`, 'ether');

    const rawTx: Tx = {
      from:   wallet,
      to:     address,
      value:  wei.toString(),
    };

    return this.sendTransaction(rawTx);
  }

  sendERC20 = async (address: string, amount: number, erc20: ERC20): Promise<IReceipt> => {
    const sender        = await this.getAddress().catch((e: Error) => { throw(e) } );
    const decimalFactor = await erc20.getDecimalFactor().catch((e: Error) => { throw(e) } );

    if(typeof erc20.token === 'undefined')
      throw Error("Token instance couldn't be initialised");

    if(typeof sender !== 'string')
      throw Error("There is no wallet access.");

    if(typeof decimalFactor !== 'string')
      throw Error("Could not get token data.");

    const wallet = sender as string;
    const wei    = this.web3.utils.fromWei(this.web3.utils.toBN(this.web3.utils.toWei(amount.toString(), 'ether')).mul(this.web3.utils.toBN(decimalFactor)).toString(), 'ether');

    const rawTx: Tx = {
      from:   wallet,
      to:     erc20.address,
      value:  "0",
      data:   (erc20.token as any).methods.transfer(address, wei.toString()).encodeABI()
    };

    return this.sendTransaction(rawTx);
  }

  signMessage = async (msg: (string | object)): Promise<string | undefined> => {
    const signer = await this.getAddress().catch((e: Error) => { throw(e) } );

    if(typeof signer !== 'string') {
      throw Error("There is no wallet access.");
    }

    const signData = (typeof msg === 'object')
      ? JSON.stringify(msg)
      : msg;

    return (this.web3.eth.personal.sign(signData, signer as string) as any);
  }
  
  checkMessage = async (msg: string, signature: string): Promise<boolean> => {
    const signer    = await this.getAddress().catch((e: Error) => { throw(e) } );

      // web3.personal.ecRecover is not in @types
    const recovered = await (this.web3.eth.personal.ecRecover(msg, signature) as any).catch((e: Error) => { throw(e) } );
    
    if(typeof signer !== 'string')
      throw Error("There is no wallet access.");
 

    return (signer as string).toLowerCase() === recovered.toLowerCase();
  }

  private sendTransaction = (rawTx: Tx): Promise<IReceipt> => {
    const tx = this.web3.eth.sendTransaction(rawTx);

    return new Promise((resolve, reject) => {
      tx.on('receipt', (receipt: TransactionReceipt) => {
        resolve({
          success:  receipt.status,
          txhash:   receipt.transactionHash
        });
      });

      tx.on('error', (error: any) => {
        throw Error(error);
      });
    })
  }

  private enable = async () => {
    if(this.web3.currentProvider.enable) {
      try {
        await this.web3.currentProvider.enable();
      } catch (e) {
        console.log(e);
      }
    }

    this.addressList = this.web3.eth.getAccounts();
  }
}
