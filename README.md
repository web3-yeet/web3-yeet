# Web3 YEET
> Making web3 libraries usable

Web3js is a very powerful package, but as it stands, it is difficult to use. Web3 YEET wraps the most common operations used in web3 projects and makes them accessible in one line.

## Installation

Yarn:

```sh
yarn add web3-yeet
```


## Usage example

Require the package.
```js
const web3 = require('web3-yeet');
```

Create a token instance
```js
const cehhCoin = new web3.ERC20('0x4f38f4229924bfa28d58eeda496cc85e8016bccc');
```

Create a wallet instance
```js
const userWallet = new web3.Wallet();
```

Ask the user to send tokens
```js
const myAddress = '0x6a0d0ebf1e532841baf224e1bd6a1d4489d5d78d';
userWallet.sendERC20(myAddress, 2, cehhCoin);
```

## Release History

* 0.3.10
    * Check BN type


## Meta

Your Name – [@Cehhiro](https://twitter.com/Cehhiro) – cehhiro@cehhiro.com

## Contributing

1. Fork it (<https://github.com/web3-yeet/web3-yeet/fork>)
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Commit your changes (`git commit -am 'Add some fooBar'`)
4. Push to the branch (`git push origin feature/fooBar`)
5. Create a new Pull Request
