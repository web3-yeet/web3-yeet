"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "ERC20", {
  enumerable: true,
  get: function get() {
    return _erc.ERC20;
  }
});
Object.defineProperty(exports, "Wallet", {
  enumerable: true,
  get: function get() {
    return _wallet.Wallet;
  }
});

var _erc = require("./erc20");

var _wallet = require("./wallet");

var t = new _erc.ERC20('0xB8c77482e45F1F44dE1745F52C74426C631bDD52');
var w = new _wallet.Wallet();
w.getAddress().then(console.log);