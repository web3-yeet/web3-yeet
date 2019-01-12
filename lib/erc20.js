"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ERC20 = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime-corejs2/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/classCallCheck"));

var _web = _interopRequireDefault(require("web3"));

var _erc20Abi = require("./abi/erc20Abi");

/*
 * Web3 ERC20 utils
 *
 */
var web3 = new _web.default('https://mainnet.infura.io/metamask');

var ERC20 = function ERC20(address) {
  var _this = this;

  (0, _classCallCheck2.default)(this, ERC20);

  this.getBalance =
  /*#__PURE__*/
  function () {
    var _ref = (0, _asyncToGenerator2.default)(
    /*#__PURE__*/
    _regenerator.default.mark(function _callee(user) {
      var balance, factor, b, w, f;
      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(_this.token === undefined)) {
                _context.next = 4;
                break;
              }

              throw new ReferenceError("No token has been created");

            case 4:
              _context.next = 6;
              return _this.token.methods.balanceOf(user).call();

            case 6:
              balance = _context.sent;
              _context.next = 9;
              return _this.getDecimalFactor();

            case 9:
              factor = _context.sent;
              b = web3.utils.toBN(balance);

              if (!(factor === undefined)) {
                _context.next = 15;
                break;
              }

              throw new ReferenceError("Could not get decimal places");

            case 15:
              w = b.div(factor);
              f = b.mod(factor);
              return _context.abrupt("return", "".concat(w, ".").concat(f));

            case 18:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }();

  this.getInfo = function () {
    return _this.info;
  };

  this.getDecimalFactor =
  /*#__PURE__*/
  (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee2() {
    var decimals;
    return _regenerator.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _this.info.decimals;

          case 2:
            decimals = _context2.sent;
            return _context2.abrupt("return", decimals !== undefined ? '1' + '0'.repeat(decimals) : undefined);

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

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
  }
};

exports.ERC20 = ERC20;