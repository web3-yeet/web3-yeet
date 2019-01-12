"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Wallet = void 0;

var _promise = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/promise"));

var _regenerator = _interopRequireDefault(require("@babel/runtime-corejs2/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/asyncToGenerator"));

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
  this.getAddress =
  /*#__PURE__*/
  (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee() {
    var addressList;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _this.addressList.catch(function (e) {
              throw e;
            });

          case 2:
            addressList = _context.sent;
            return _context.abrupt("return", addressList[0]);

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  this.sendEther =
  /*#__PURE__*/
  function () {
    var _ref2 = (0, _asyncToGenerator2.default)(
    /*#__PURE__*/
    _regenerator.default.mark(function _callee2(address, amount) {
      var sender, wallet, wei, rawTx;
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
              if (typeof sender !== 'string') _promise.default.reject("There is no wallet access.");
              wallet = sender;
              wei = web3.utils.toWei("".concat(amount), 'ether');
              rawTx = {
                from: wallet,
                to: address,
                value: wei.toString()
              };
              return _context2.abrupt("return", _this.sendTransaction(rawTx));

            case 8:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    return function (_x, _x2) {
      return _ref2.apply(this, arguments);
    };
  }();

  this.sendERC20 =
  /*#__PURE__*/
  function () {
    var _ref3 = (0, _asyncToGenerator2.default)(
    /*#__PURE__*/
    _regenerator.default.mark(function _callee3(address, amount, erc20) {
      var sender, decimalFactor, wallet, wei, rawTx;
      return _regenerator.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return _this.getAddress().catch(function (e) {
                throw e;
              });

            case 2:
              sender = _context3.sent;
              _context3.next = 5;
              return erc20.getDecimalFactor().catch(function (e) {
                throw e;
              });

            case 5:
              decimalFactor = _context3.sent;
              if (typeof erc20.token === 'undefined') _promise.default.reject("Token instance couldn't be initialised");
              if (typeof sender !== 'string') _promise.default.reject("There is no wallet access.");
              if (typeof decimalFactor !== 'string') _promise.default.reject("Could not get token data.");
              wallet = sender;
              wei = web3.utils.fromWei(web3.utils.toBN(web3.utils.toWei(amount.toString(), 'ether')).mul(web3.utils.toBN(decimalFactor)).toString(), 'ether');
              rawTx = {
                from: wallet,
                to: erc20.address,
                value: "0",
                data: erc20.token.methods.transfer(address, wei.toString()).encodeABI()
              };
              return _context3.abrupt("return", _this.sendTransaction(rawTx));

            case 13:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    return function (_x3, _x4, _x5) {
      return _ref3.apply(this, arguments);
    };
  }();

  this.signMessage =
  /*#__PURE__*/
  function () {
    var _ref4 = (0, _asyncToGenerator2.default)(
    /*#__PURE__*/
    _regenerator.default.mark(function _callee4(msg) {
      var signer;
      return _regenerator.default.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return _this.getAddress().catch(function (e) {
                throw e;
              });

            case 2:
              signer = _context4.sent;

              if (!(typeof signer !== 'string')) {
                _context4.next = 5;
                break;
              }

              return _context4.abrupt("return", _promise.default.reject("There is no wallet access."));

            case 5:
              return _context4.abrupt("return", web3.eth.personal.sign(msg, signer));

            case 6:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, this);
    }));

    return function (_x6) {
      return _ref4.apply(this, arguments);
    };
  }();

  this.checkMessage =
  /*#__PURE__*/
  function () {
    var _ref5 = (0, _asyncToGenerator2.default)(
    /*#__PURE__*/
    _regenerator.default.mark(function _callee5(msg, signature) {
      var signer, recovered;
      return _regenerator.default.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return _this.getAddress().catch(function (e) {
                throw e;
              });

            case 2:
              signer = _context5.sent;
              _context5.next = 5;
              return web3.eth.personal.ecRecover(msg, signature).catch(function (e) {
                throw e;
              });

            case 5:
              recovered = _context5.sent;
              if (typeof signer !== 'string') _promise.default.reject("There is no wallet access.");
              return _context5.abrupt("return", signer.toLowerCase() === recovered.toLowerCase());

            case 8:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, this);
    }));

    return function (_x7, _x8) {
      return _ref5.apply(this, arguments);
    };
  }();

  this.sendTransaction = function (rawTx) {
    return new _promise.default(function (resolve, reject) {
      web3.eth.sendTransaction(rawTx).on('receipt', function (receipt) {
        resolve({
          success: receipt.status,
          txhash: receipt.transactionHash
        });
      }).on('error', function (error) {
        throw error;
      });
    });
  };

  this.addressList = web3.eth.getAccounts();
};

exports.Wallet = Wallet;