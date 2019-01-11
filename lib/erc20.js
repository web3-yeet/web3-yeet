"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime-corejs2/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/asyncToGenerator"));

var _promise = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/promise"));

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

  this.getBalance = function (user) {
    return new _promise.default(function (resolve, reject) {
      if (_this.token === undefined) {
        resolve(undefined);
      } else {
        _this.token.methods.balanceOf(user).call().then(
        /*#__PURE__*/
        function () {
          var _ref = (0, _asyncToGenerator2.default)(
          /*#__PURE__*/
          _regenerator.default.mark(function _callee(balance) {
            var b, factor, w, f;
            return _regenerator.default.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    b = web3.utils.toBN(balance);
                    _context.next = 3;
                    return _this.getDecimalFactor();

                  case 3:
                    factor = _context.sent;

                    if (factor === undefined) {
                      resolve(undefined);
                    } else {
                      w = b.div(factor);
                      f = b.mod(factor);
                      resolve("".concat(w, ".").concat(f));
                    }

                  case 5:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee, this);
          }));

          return function (_x) {
            return _ref.apply(this, arguments);
          };
        }()).catch(function (e) {
          return reject(e);
        });
      }
    });
  };

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
            return _context2.abrupt("return", decimals !== undefined ? web3.utils.toBN('1' + '0'.repeat(decimals)) : undefined);

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

exports.default = ERC20;