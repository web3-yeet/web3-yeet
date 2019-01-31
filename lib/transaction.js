"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TransactionData = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime-corejs2/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/classCallCheck"));

var _web = _interopRequireDefault(require("web3"));

var _erc20Abi = require("./abi/erc20Abi");

/*
 * Web3 Transaction utils
 *
 */
var web3 = new _web.default("https://mainnet.infura.io/metamask");

var TransactionData = function TransactionData(hash) {
  var _this = this;

  (0, _classCallCheck2.default)(this, TransactionData);
  this.getTransactionState =
  /*#__PURE__*/
  (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee() {
    var result;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _this.txReceipt;

          case 2:
            result = _context.sent;
            return _context.abrupt("return", result.status);

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  this.getTokenTransfer =
  /*#__PURE__*/
  (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee2() {
    var tx, data, decoded, from, to, value;
    return _regenerator.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _this.tx;

          case 2:
            tx = _context2.sent;
            data = tx.input.replace(/0x.{8}(.*)/, "$1");
            decoded = web3.eth.abi.decodeParameters(_this.transferAbi, data);
            from = tx.from;
            to = decoded._to ? decoded._to : undefined;
            value = decoded._value ? decoded._value : undefined;
            return _context2.abrupt("return", {
              from: from,
              to: to,
              value: value
            });

          case 9:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));
  this.tx = web3.eth.getTransaction(hash);
  this.txReceipt = web3.eth.getTransactionReceipt(hash);
  this.transferAbi = _erc20Abi.ERC20Abi.filter(function (v) {
    return v.name === "transfer";
  })[0].inputs;
};

exports.TransactionData = TransactionData;