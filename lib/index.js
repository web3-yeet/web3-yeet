"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _erc = _interopRequireDefault(require("./erc20"));

var _wallet = _interopRequireDefault(require("./wallet"));

var _default = {
  ERC20: _erc.default,
  Wallet: _wallet.default
};
exports.default = _default;