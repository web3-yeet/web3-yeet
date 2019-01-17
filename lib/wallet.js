"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Wallet = void 0;

var _promise = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/promise"));

var _stringify = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/json/stringify"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/typeof"));

var _regenerator = _interopRequireDefault(require("@babel/runtime-corejs2/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/classCallCheck"));

var _web = _interopRequireDefault(require("web3"));

/*
 * Web3 Wallet utils
 *
 */
var Wallet = function Wallet() {
  var _this = this;

  (0, _classCallCheck2.default)(this, Wallet);

  this.setProvider =
  /*#__PURE__*/
  function () {
    var _ref = (0, _asyncToGenerator2.default)(
    /*#__PURE__*/
    _regenerator.default.mark(function _callee(provider) {
      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _this.web3.setProvider(provider);

              _context.next = 3;
              return _this.enable();

            case 3:
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

  this.isAvailable =
  /*#__PURE__*/
  (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee2() {
    var addressList;
    return _regenerator.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _this.addressList.catch(function (e) {
              throw e;
            });

          case 2:
            addressList = _context2.sent;
            return _context2.abrupt("return", addressList !== undefined && addressList.length > 0);

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));
  this.getAddress =
  /*#__PURE__*/
  (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee3() {
    var addressList;
    return _regenerator.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _this.isAvailable();

          case 2:
            if (!_context3.sent) {
              _context3.next = 9;
              break;
            }

            _context3.next = 5;
            return _this.addressList.catch(function (e) {
              throw e;
            });

          case 5:
            addressList = _context3.sent;
            return _context3.abrupt("return", addressList[0]);

          case 9:
            return _context3.abrupt("return", undefined);

          case 10:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  this.updateAddress =
  /*#__PURE__*/
  function () {
    var _ref4 = (0, _asyncToGenerator2.default)(
    /*#__PURE__*/
    _regenerator.default.mark(function _callee4(update) {
      return _regenerator.default.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return _this.getAddress();

            case 2:
              _context4.t0 = _context4.sent.toLowerCase();
              _context4.t1 = update.selectedAddress.toLowerCase();

              if (!(_context4.t0 !== _context4.t1)) {
                _context4.next = 6;
                break;
              }

              _this.addressList = _this.web3.eth.getAccounts();

            case 6:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, this);
    }));

    return function (_x2) {
      return _ref4.apply(this, arguments);
    };
  }();

  this.sendEther =
  /*#__PURE__*/
  function () {
    var _ref5 = (0, _asyncToGenerator2.default)(
    /*#__PURE__*/
    _regenerator.default.mark(function _callee5(address, amount) {
      var sender, wallet, wei, rawTx;
      return _regenerator.default.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return _this.getAddress().catch(function (e) {
                throw e;
              });

            case 2:
              sender = _context5.sent;

              if (!(typeof sender !== 'string')) {
                _context5.next = 5;
                break;
              }

              throw Error("There is no wallet access.");

            case 5:
              wallet = sender;
              wei = _this.web3.utils.toWei("".concat(amount), 'ether');
              rawTx = {
                from: wallet,
                to: address,
                value: wei.toString()
              };
              return _context5.abrupt("return", _this.sendTransaction(rawTx));

            case 9:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, this);
    }));

    return function (_x3, _x4) {
      return _ref5.apply(this, arguments);
    };
  }();

  this.sendERC20 =
  /*#__PURE__*/
  function () {
    var _ref6 = (0, _asyncToGenerator2.default)(
    /*#__PURE__*/
    _regenerator.default.mark(function _callee6(address, amount, erc20) {
      var sender, decimalFactor, wallet, wei, rawTx;
      return _regenerator.default.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return _this.getAddress().catch(function (e) {
                throw e;
              });

            case 2:
              sender = _context6.sent;
              _context6.next = 5;
              return erc20.getDecimalFactor().catch(function (e) {
                throw e;
              });

            case 5:
              decimalFactor = _context6.sent;

              if (!(typeof erc20.token === 'undefined')) {
                _context6.next = 8;
                break;
              }

              throw Error("Token instance couldn't be initialised");

            case 8:
              if (!(typeof sender !== 'string')) {
                _context6.next = 10;
                break;
              }

              throw Error("There is no wallet access.");

            case 10:
              if (!(typeof decimalFactor !== 'string')) {
                _context6.next = 12;
                break;
              }

              throw Error("Could not get token data.");

            case 12:
              wallet = sender;
              wei = _this.web3.utils.fromWei(_this.web3.utils.toBN(_this.web3.utils.toWei(amount.toString(), 'ether')).mul(_this.web3.utils.toBN(decimalFactor)).toString(), 'ether');
              rawTx = {
                from: wallet,
                to: erc20.address,
                value: "0",
                data: erc20.token.methods.transfer(address, wei.toString()).encodeABI()
              };
              return _context6.abrupt("return", _this.sendTransaction(rawTx));

            case 16:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, this);
    }));

    return function (_x5, _x6, _x7) {
      return _ref6.apply(this, arguments);
    };
  }();

  this.signMessage =
  /*#__PURE__*/
  function () {
    var _ref7 = (0, _asyncToGenerator2.default)(
    /*#__PURE__*/
    _regenerator.default.mark(function _callee7(msg) {
      var signer, signData;
      return _regenerator.default.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.next = 2;
              return _this.getAddress().catch(function (e) {
                throw e;
              });

            case 2:
              signer = _context7.sent;

              if (!(typeof signer !== 'string')) {
                _context7.next = 5;
                break;
              }

              throw Error("There is no wallet access.");

            case 5:
              signData = (0, _typeof2.default)(msg) === 'object' ? (0, _stringify.default)(msg) : msg;
              return _context7.abrupt("return", _this.web3.eth.personal.sign(signData, signer));

            case 7:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7, this);
    }));

    return function (_x8) {
      return _ref7.apply(this, arguments);
    };
  }();

  this.checkMessage =
  /*#__PURE__*/
  function () {
    var _ref8 = (0, _asyncToGenerator2.default)(
    /*#__PURE__*/
    _regenerator.default.mark(function _callee8(msg, signature) {
      var signer, recovered;
      return _regenerator.default.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              _context8.next = 2;
              return _this.getAddress().catch(function (e) {
                throw e;
              });

            case 2:
              signer = _context8.sent;
              _context8.next = 5;
              return _this.web3.eth.personal.ecRecover(msg, signature).catch(function (e) {
                throw e;
              });

            case 5:
              recovered = _context8.sent;

              if (!(typeof signer !== 'string')) {
                _context8.next = 8;
                break;
              }

              throw Error("There is no wallet access.");

            case 8:
              return _context8.abrupt("return", signer.toLowerCase() === recovered.toLowerCase());

            case 9:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8, this);
    }));

    return function (_x9, _x10) {
      return _ref8.apply(this, arguments);
    };
  }();

  this.sendTransaction = function (rawTx) {
    var tx = _this.web3.eth.sendTransaction(rawTx);

    return new _promise.default(function (resolve, reject) {
      tx.on('receipt', function (receipt) {
        resolve({
          success: receipt.status,
          txhash: receipt.transactionHash
        });
      });
      tx.on('error', function (error) {
        throw Error(error);
      });
    });
  };

  this.enable =
  /*#__PURE__*/
  (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee9() {
    return _regenerator.default.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            if (!_this.web3.currentProvider.enable) {
              _context9.next = 9;
              break;
            }

            _context9.prev = 1;
            _context9.next = 4;
            return _this.web3.currentProvider.enable();

          case 4:
            _context9.next = 9;
            break;

          case 6:
            _context9.prev = 6;
            _context9.t0 = _context9["catch"](1);
            console.log(_context9.t0);

          case 9:
            _this.addressList = _this.web3.eth.getAccounts();

          case 10:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9, this, [[1, 6]]);
  }));
  this.web3 = new _web.default(_web.default.givenProvider || 'https://mainnet.infura.io/metamask');
  this.addressList = this.web3.eth.getAccounts();
  this.enable();
  if (this.web3.publicConfigStore) this.web3.publicConfigStore.on('update', this.updateAddress);
};

exports.Wallet = Wallet;