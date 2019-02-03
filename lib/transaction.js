"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TransactionData = void 0;

var _web = _interopRequireDefault(require("web3"));

var _erc20Abi = require("./abi/erc20Abi");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var web3 = new _web.default("https://mainnet.infura.io/metamask");

var TransactionData = function TransactionData(hash) {
  var _this = this;

  _classCallCheck(this, TransactionData);

  this.getTransactionState =
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee() {
    var result;
    return regeneratorRuntime.wrap(function _callee$(_context) {
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
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2() {
    var tx, data, decoded, from, to, value;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
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