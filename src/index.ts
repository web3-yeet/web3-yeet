export { ERC20 } from './erc20';
export { Wallet } from './wallet';

import { ERC20 } from './erc20';
import { Wallet } from './wallet';

const t = new ERC20('0xB8c77482e45F1F44dE1745F52C74426C631bDD52');
const w = new Wallet();

w.getAddress().then(console.log)
