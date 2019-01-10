"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ERC20 = void 0;

var _web = _interopRequireDefault(require("web3"));

var _erc20Abi = require("./abi/erc20Abi");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _newArrowCheck(innerThis, boundThis) { if (innerThis !== boundThis) { throw new TypeError("Cannot instantiate an arrow function"); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var web3 = new _web.default('https://mainnet.infura.io/metamask');

var ERC20 = function ERC20(address) {
  var _this = this;

  _classCallCheck(this, ERC20);

  this.getBalance = function (user) {
    _newArrowCheck(this, _this);

    return this.token ? this.token.methods.balanceOf(user).call() : undefined;
  }.bind(this);

  this.getInfo = function () {
    _newArrowCheck(this, _this);

    return this.info;
  }.bind(this);

  this.getName = function () {
    _newArrowCheck(this, _this);

    return this.info.name;
  }.bind(this);

  this.getSymbol = function () {
    _newArrowCheck(this, _this);

    return this.info.symbol;
  }.bind(this);

  this.getTotalSupply = function () {
    _newArrowCheck(this, _this);

    return this.info.totalSupply;
  }.bind(this);

  this.address = undefined;
  this.token = undefined;
  this.erc20Abi = _erc20Abi.ERC20Abi;
  this.info = {
    name: undefined,
    symbol: undefined,
    totalSupply: undefined
  };

  if (/(0x)?([0-9a-f]{40})/gmi.test(address)) {
    this.address = address;
    this.token = new web3.eth.Contract(this.erc20Abi, address);
    this.token.methods.name().call().then(function (name) {
      _newArrowCheck(this, _this);

      return this.info.name = name;
    }.bind(this)).catch(function (e) {
      _newArrowCheck(this, _this);

      return console.error("Could not get name", e);
    }.bind(this));
    this.token.methods.symbol().call().then(function (symbol) {
      _newArrowCheck(this, _this);

      return this.info.symbol = symbol;
    }.bind(this)).catch(function (e) {
      _newArrowCheck(this, _this);

      return console.error("Could not get symbol", e);
    }.bind(this));
    this.token.methods.totalSupply().call().then(function (totalSupply) {
      _newArrowCheck(this, _this);

      return this.info.totalSupply = totalSupply;
    }.bind(this)).catch(function (e) {
      _newArrowCheck(this, _this);

      return console.error("Could not get total supply", e);
    }.bind(this));
  }
};

exports.ERC20 = ERC20;