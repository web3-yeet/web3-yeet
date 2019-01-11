"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Wallet = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime-corejs2/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/asyncToGenerator"));

var _promise = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/promise"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/classCallCheck"));

var _web = _interopRequireDefault(require("web3"));

/*
 * Web3 Wallet utils
 *
 */
var web3 = new _web.default(_web.default.givenProvider || 'https://mainnet.infura.io/metamask');

var Wallet = function Wallet() {
  var _this = this;

  (0, _classCallCheck2.default)(this, Wallet);

  this.getAddress = function () {
    return new _promise.default(function (resolve, reject) {
      _this.address.then(function (addressList) {
        resolve(addressList[0]);
      });
    });
  };

  this.sendEther =
  /*#__PURE__*/
  function () {
    var _ref = (0, _asyncToGenerator2.default)(
    /*#__PURE__*/
    _regenerator.default.mark(function _callee(address, amount) {
      var sender;
      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return _this.getAddress().catch(function (e) {
                throw e;
              });

            case 2:
              sender = _context.sent;
              return _context.abrupt("return", new _promise.default(function (resolve, reject) {
                if (typeof sender !== 'string') reject("There is no wallet access.");
                var wallet = sender;
                var wei = web3.utils.toWei(web3.utils.toBN(amount), 'ether');
                return web3.eth.sendTransaction({
                  from: wallet,
                  to: address,
                  value: wei.toString()
                }).on('receipt', function (receipt) {
                  resolve({
                    success: receipt.status,
                    txhash: receipt.transactionHash
                  });
                }).on('error', function (error) {
                  throw error;
                });
              }));

            case 4:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }();

  this.sendERC20 =
  /*#__PURE__*/
  function () {
    var _ref2 = (0, _asyncToGenerator2.default)(
    /*#__PURE__*/
    _regenerator.default.mark(function _callee2(address, amount, erc20) {
      var sender, decimalFactor;
      return _regenerator.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return _this.getAddress().catch(function (e) {
                throw e;
              });

            case 2:
              sender = _context2.sent;
              _context2.next = 5;
              return erc20.getDecimalFactor();

            case 5:
              decimalFactor = _context2.sent;
              return _context2.abrupt("return", new _promise.default(function (resolve, reject) {
                if (typeof erc20.token === 'undefined') reject("Token instance couldn't be initialised");
                if (typeof sender !== 'string') reject("There is no wallet access.");
                if (!web3.utils.isBN(decimalFactor)) reject("Could not get token data.");
                var wallet = sender;
                var wei = web3.utils.toBN(amount).mul(decimalFactor);
                return erc20.token.methods.transfer(address, wei).send({
                  from: wallet,
                  to: erc20.address,
                  value: 0
                }).on('receipt', function (receipt) {
                  resolve({
                    success: receipt.status,
                    txhash: receipt.transactionHash
                  });
                }).on('error', function (error) {
                  throw error;
                });
              }));

            case 7:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    return function (_x3, _x4, _x5) {
      return _ref2.apply(this, arguments);
    };
  }();

  this.address = web3.eth.getAccounts();
};

exports.Wallet = Wallet;