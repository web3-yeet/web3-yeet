"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ERC20 = void 0;

var _web = _interopRequireDefault(require("web3"));

var _erc20Abi = require("./abi/erc20Abi");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var web3 = new _web.default('https://mainnet.infura.io/metamask');

var ERC20 = function ERC20(address) {
  var _this = this;

  _classCallCheck(this, ERC20);

  this.getBalance = function (user) {
    if (_this.token !== undefined) {
      return new Promise(function (resolve, reject) {
        _this.token.methods.balanceOf(user).call().then(function (balance) {
          var b = web3.utils.toBN(balance);
          var w = b.div(_this.decimalFactor);
          var f = b.mod(_this.decimalFactor);
          resolve("".concat(w, ".").concat(f));
        }).catch(function (e) {
          return reject(e);
        });
      });
    } else {
      return undefined;
    }
  };

  this.getInfo = function () {
    return _this.info;
  };

  this.getName = function () {
    return _this.info.name;
  };

  this.getSymbol = function () {
    return _this.info.symbol;
  };

  this.getTotalSupply = function () {
    return _this.info.totalSupply;
  };

  this.getDecimals = function () {
    return _this.info.decimals;
  };

  this.address = undefined;
  this.token = undefined;
  this.erc20Abi = _erc20Abi.ERC20Abi;
  this.decimalFactor = web3.utils.toBN('1');
  this.info = {
    name: undefined,
    symbol: undefined,
    totalSupply: undefined,
    decimals: undefined
  };

  if (/(0x)?([0-9a-f]{40})/gmi.test(address)) {
    this.address = address;
    this.token = new web3.eth.Contract(this.erc20Abi, address);
    this.info.name = this.token.methods.name().call();
    this.info.symbol = this.token.methods.symbol().call();
    this.info.totalSupply = this.token.methods.totalSupply().call();
    this.info.decimals = this.token.methods.decimals().call();
    this.info.decimals.then(function (decimals) {
      _this.decimalFactor = web3.utils.toBN('1' + '0'.repeat(decimals));
    });
  }
};

exports.ERC20 = ERC20;