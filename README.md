# Web3 YEET
> Making web3 libraries usable

[![npm version](https://badge.fury.io/js/web3-yeet.svg)](https://badge.fury.io/js/web3-yeet)
[![MIT license](http://img.shields.io/badge/license-MIT-brightgreen.svg)](http://opensource.org/licenses/MIT)
[![Donate with Ethereum](https://en.cryptobadges.io/badge/small/0xff91c94f45e1114b1c90be6d028381964030584c)](https://en.cryptobadges.io/donate/0xff91c94f45e1114b1c90be6d028381964030584c)

Web3js is a very powerful package, but as it stands, it is difficult to use. Web3 YEET wraps the most common operations used in web3 projects and makes them accessible in one line.

## Demo

Check the functions at https://web3-yeet.github.io/.

The buttons simply call:
```js
  sendCehh = () => {
    this.wallet.sendERC20(this.bag, 20, this.token); 
  }

  sendEth = () => {
    this.wallet.sendEther(this.bag, 0.024); /* Donations appreciated  */
  }

  sign = async () => {
    const signature = await this.wallet.signMessage("this message");
    this.setState({signature: signature})
  }

  check = async () => {
    const isYou = await this.wallet.checkMessage("this message", this.state.signature);
    this.setState({isYou: isYou});
  }
```

## Installation

Yarn:

```sh
yarn add web3-yeet
```


## Usage example

###  Require the package.
```js
const web3 = require('web3-yeet');
```

### Create a token instance
```js
const cehhCoin = new web3.ERC20('0x4f38f4229924bfa28d58eeda496cc85e8016bccc');
```

### Create a wallet instance
```js
const userWallet = new web3.Wallet();
```

### Ask the user to send tokens
```js
const myAddress = '0x6a0d0ebf1e532841baf224e1bd6a1d4489d5d78d';
userWallet.sendERC20(myAddress, 2, cehhCoin);
```

### Ask the user to sign a message
```js
const msg = 'check-in id: 41923';
const signature = await userWallet.signMessage(msg).catch((error) => { /* error handling */ });
```

### Check if the user is the original signer of a message
```js
const msg = 'check-in id: 41923';
const isSigner = await userWallet.checkMessage(msg, signature).catch((error) => { /* error handling */ });

if(isSigner) {
   /* the user's wallet is the signer of the message */
} else {
   /* the user's wallet didn't sign the message */
}
```

## Release History

* 0.3.16
    * Add `Wallet.isAvailable()` 
* 0.3.11
    * Add signatures
* 0.3.10
    * Check BN type


## Web3 Token-Based Authetication
With `web3-yeet` it is easier to implement the modern WTBA, shown below.

![web3 token based authentication](https://github.com/web3-yeet/web3-yeet/blob/master/docs/web3-token-based-auth.png)

## Meta

Cehhiro – [@Cehhiro](https://twitter.com/Cehhiro) – cehhiro@cehhiro.com

## Contributing

1. Fork it (<https://github.com/web3-yeet/web3-yeet/fork>)
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Commit your changes (`git commit -am 'Add some fooBar'`)
4. Push to the branch (`git push origin feature/fooBar`)
5. Create a new Pull Request
