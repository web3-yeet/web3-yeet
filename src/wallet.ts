/*
 * Web3 Wallet utils
 *
 */

// @ts-ignore
import TransportU2F            from "@ledgerhq/hw-transport-u2f";
import BN                      from "bn.js";
import { EventEmitter }        from "events";
import Web3                    from "web3";
import ProviderEngine          from "web3-provider-engine";
import RpcSubprovider          from "web3-provider-engine/subproviders/rpc";
import { Provider }            from "web3/eth/../providers";
import { TransactionReceipt }  from "web3/eth/../types";
import { Tx }                  from "web3/eth/types";
import { ERC20 }               from "./erc20";
import createLedgerSubprovider from "./web3-subprovider/index";

interface IReceipt {
  success: boolean;
  txhash: string;
}

export class Wallet extends EventEmitter {
  public addressList: Promise<ReadonlyArray<string>>;
  public publicNode: string = "https://mainnet.infura.io/metamask";
  public web3: Web3;
  public ledgerAccess: boolean = false;
  private referenceAddress: string = "";

  constructor() {
    super();
    this.web3 = new Web3(Web3.givenProvider || this.publicNode);

    this.addressList = this.web3.eth.getAccounts();
    this.enable();

    this.walletPolling();
  }

  public setLedger = async (): Promise<boolean> => {
    const engine = this.ledgerWithRPC(this.publicNode);
    engine.start();

    if (typeof engine !== "undefined") {
      const web3ledger = new Web3(engine);

      const addressList = await Promise.race([
        web3ledger.eth.getAccounts(),
        new Promise((resolve) => setTimeout(resolve, 5000, undefined)),
      ]);

      if (typeof addressList === "undefined") {
        // @ts-ignore
        engine.stop();
        throw Error("Could not access the ledger wallet. Try again later.");

      } else {
        await this.setProvider(engine);
        this.ledgerAccess = true;
      }
    }

    return this.ledgerAccess;
  }

  public ledgerLogout = async () => {
    // @ts-ignore
    if (this.ledgerAccess && this.web3.currentProvider.stop) {
      // @ts-ignore
      this.web3.currentProvider.stop();

      this.ledgerAccess = false;
      this.web3 = new Web3(Web3.givenProvider || this.publicNode);
      await this.enable();
    }
    return this;
  }

  public setProvider = async (provider: Provider): Promise<Wallet> => {
    this.web3.setProvider(provider);
    await this.enable();

    return this;
  }

  /**
   * Checks if the wallet if available for access
   *
   * @returns {boolean} Returns if the addresslist exists and there is at least 1 account available
   */
  public isAvailable = async (): Promise<boolean> => {
    const addressList: ReadonlyArray<string> = await this.addressList;

    // @ts-ignore
    return typeof addressList !== "undefined" && addressList.length > 0;
  }

  /**
   * Get the first available unlocked wallet address
   *
   * @returns {string} The address that will execute calls
   */
  public getAddress = async (): Promise<string | undefined> => {
    if (await this.isAvailable()) {
      const addressList: ReadonlyArray<string> = await this.addressList;
      return addressList[0];
    } else {
      return undefined;
    }
  }

  /**
   * Send ether to an address
   *
   * @param {string} address The recipient's address
   * @param {number} amount The amount to send, in ether
   *
   * @return {Promise} the transaction receipt promise
   */
  public sendEther = async (address: string, amount: number): Promise<IReceipt> => {
    const sender = await this.getAddress();

    if (typeof sender !== "string") {
      throw Error("There is no wallet access.");
    }

    const wallet = sender as string;
    const wei    = this.web3.utils.toWei(`${amount}`, "ether");

    const rawTx: Tx = {
        from:   wallet,
        to:     address,
        value:  wei.toString(),
    };

    return this.sendTransaction(rawTx);
  }

  public sendERC20 = async (address: string, amount: number, erc20: ERC20): Promise<IReceipt> => {
    const sender        = await this.getAddress();
    const decimalFactor = await erc20.getDecimalFactor();

    if (typeof erc20.token === "undefined") {
      throw Error("Token instance couldn't be initialised");
    }

    if (typeof sender !== "string") {
      throw Error("There is no wallet access.");
    }

    if (typeof decimalFactor !== "string") {
      throw Error("Could not get token data.");
    }

    const wallet = sender as string;
    const padBN  = this.web3.utils.toBN(this.web3.utils.toWei(amount.toString(), "ether"));
    const wei    = this.web3.utils.fromWei((padBN).mul(this.web3.utils.toBN(decimalFactor)).toString(), "ether");

    const rawTx: Tx = {
        from:   wallet,
        to:     erc20.address,
        value:  "0",
        data:   (erc20.token as any).methods.transfer(address, wei.toString()).encodeABI(),
    };

    return this.sendTransaction(rawTx);
  }

  public signMessage = async (msg: (string | object)): Promise<string | undefined> => {
    const signer = await this.getAddress();

    if (typeof signer !== "string") {
      throw Error("There is no wallet access.");
    }

    const signData = (typeof msg === "object")
      ? JSON.stringify(msg)
      : msg;

    // @ts-ignore
    return (this.web3.eth.personal.sign(signData, signer as string) as any);
  }

  public checkMessage = async (msg: string, signature: string): Promise<boolean> => {
    const signer    = await this.getAddress();

    // web3.personal.ecRecover is not in @types
    const recovered = await (this.web3.eth.personal.ecRecover(msg, signature) as any);

    if (typeof signer !== "string") {
      throw Error("There is no wallet access.");
    }

    return (signer as string).toLowerCase() === recovered.toLowerCase();
  }

  private walletPolling = async () => {
    try {
      const sourceAddress = (await this.web3.eth.getAccounts()) || "";

      // @ts-ignore
      if (this.referenceAddress.toLowerCase() !== sourceAddress[0].toLowerCase()) {
        this.emit("accountChange", sourceAddress[0]);
        this.addressList = this.web3.eth.getAccounts();
        this.referenceAddress = sourceAddress[0];
      }
    } catch (e) {
      // tslint:disable-next-line
      void 0;
    }

    setTimeout(this.walletPolling, 1000);
  }

  private sendTransaction = (rawTx: Tx): Promise<IReceipt> => {
    const tx = this.web3.eth.sendTransaction(rawTx);

    return new Promise((resolve, reject) => {
      tx.on("receipt", (receipt: TransactionReceipt) => {
        resolve({
          success:  receipt.status,
          txhash:   receipt.transactionHash,
        });
      });

      tx.on("error", (error: any) => {
        reject(Error("The transaction couldn't be processed."));
      });
    });
  }

  private ledgerWithRPC = (rpcUrl: string) => {
    const engine = new ProviderEngine();
    const getTransport = () => typeof window !== "undefined" ? TransportU2F.create(5000, 5000) : undefined;

    try {
      const ledger = createLedgerSubprovider(getTransport, {
        accountsLength: 2,
      });

      engine.addProvider(ledger);
      engine.addProvider(new RpcSubprovider({ rpcUrl }));

      return engine;
    } catch (e) {
      throw(e);
      return undefined;
    }

  }

  private enable = async () => {
    // @ts-ignore
    if (this.web3.currentProvider.enable) {
      try {
        // @ts-ignore
        await this.web3.currentProvider.enable();
      } catch (e) {
        throw (e);
      }
    }

    this.addressList = this.web3.eth.getAccounts();
  }
}
