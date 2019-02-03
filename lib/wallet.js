"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Wallet = void 0;

var _hwTransportU2f = _interopRequireDefault(require("@ledgerhq/hw-transport-u2f"));

var _events = require("events");

var _web = _interopRequireDefault(require("web3"));

var _web3ProviderEngine = _interopRequireDefault(require("web3-provider-engine"));

var _rpc = _interopRequireDefault(require("web3-provider-engine/subproviders/rpc"));

var _index = _interopRequireDefault(require("./web3-subprovider/index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

var Wallet =
/*#__PURE__*/
function (_EventEmitter) {
  _inherits(Wallet, _EventEmitter);

  function Wallet() {
    var _this;

    _classCallCheck(this, Wallet);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Wallet).call(this));
    _this.publicNode = "https://mainnet.infura.io/metamask";
    _this.ledgerAccess = false;
    _this.referenceAddress = "";
    _this.setLedger =
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      var engine, web3ledger, addressList;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              engine = _this.ledgerWithRPC(_this.publicNode);
              engine.start();

              if (!(typeof engine !== "undefined")) {
                _context.next = 15;
                break;
              }

              web3ledger = new _web.default(engine);
              _context.next = 6;
              return Promise.race([web3ledger.eth.getAccounts(), new Promise(function (resolve) {
                return setTimeout(resolve, 5000, undefined);
              })]);

            case 6:
              addressList = _context.sent;

              if (!(typeof addressList === "undefined")) {
                _context.next = 12;
                break;
              }

              // @ts-ignore
              engine.stop();
              throw Error("Could not access the ledger wallet. Try again later.");

            case 12:
              _context.next = 14;
              return _this.setProvider(engine);

            case 14:
              _this.ledgerAccess = true;

            case 15:
              return _context.abrupt("return", _this.ledgerAccess);

            case 16:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));
    _this.ledgerLogout =
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2() {
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (!(_this.ledgerAccess && _this.web3.currentProvider.stop)) {
                _context2.next = 6;
                break;
              }

              // @ts-ignore
              _this.web3.currentProvider.stop();

              _this.ledgerAccess = false;
              _this.web3 = new _web.default(_web.default.givenProvider || _this.publicNode);
              _context2.next = 6;
              return _this.enable();

            case 6:
              return _context2.abrupt("return", _assertThisInitialized(_assertThisInitialized(_this)));

            case 7:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    _this.setProvider =
    /*#__PURE__*/
    function () {
      var _ref3 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(provider) {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _this.web3.setProvider(provider);

                _context3.next = 3;
                return _this.enable();

              case 3:
                return _context3.abrupt("return", _assertThisInitialized(_assertThisInitialized(_this)));

              case 4:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      return function (_x) {
        return _ref3.apply(this, arguments);
      };
    }();

    _this.isAvailable =
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee4() {
      var addressList;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return _this.addressList;

            case 2:
              addressList = _context4.sent;
              return _context4.abrupt("return", typeof addressList !== "undefined" && addressList.length > 0);

            case 4:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, this);
    }));
    _this.getAddress =
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee5() {
      var addressList;
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return _this.isAvailable();

            case 2:
              if (!_context5.sent) {
                _context5.next = 9;
                break;
              }

              _context5.next = 5;
              return _this.addressList;

            case 5:
              addressList = _context5.sent;
              return _context5.abrupt("return", addressList[0]);

            case 9:
              return _context5.abrupt("return", undefined);

            case 10:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, this);
    }));

    _this.sendEther =
    /*#__PURE__*/
    function () {
      var _ref6 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee6(address, amount) {
        var sender, wallet, wei, rawTx;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return _this.getAddress();

              case 2:
                sender = _context6.sent;

                if (!(typeof sender !== "string")) {
                  _context6.next = 5;
                  break;
                }

                throw Error("There is no wallet access.");

              case 5:
                wallet = sender;
                wei = _this.web3.utils.toWei("".concat(amount), "ether");
                rawTx = {
                  from: wallet,
                  to: address,
                  value: wei.toString()
                };
                return _context6.abrupt("return", _this.sendTransaction(rawTx));

              case 9:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      return function (_x2, _x3) {
        return _ref6.apply(this, arguments);
      };
    }();

    _this.sendERC20 =
    /*#__PURE__*/
    function () {
      var _ref7 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee7(address, amount, erc20) {
        var sender, decimalFactor, wallet, padBN, wei, rawTx;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.next = 2;
                return _this.getAddress();

              case 2:
                sender = _context7.sent;
                _context7.next = 5;
                return erc20.getDecimalFactor();

              case 5:
                decimalFactor = _context7.sent;

                if (!(typeof erc20.token === "undefined")) {
                  _context7.next = 8;
                  break;
                }

                throw Error("Token instance couldn't be initialised");

              case 8:
                if (!(typeof sender !== "string")) {
                  _context7.next = 10;
                  break;
                }

                throw Error("There is no wallet access.");

              case 10:
                if (!(typeof decimalFactor !== "string")) {
                  _context7.next = 12;
                  break;
                }

                throw Error("Could not get token data.");

              case 12:
                wallet = sender;
                padBN = _this.web3.utils.toBN(_this.web3.utils.toWei(amount.toString(), "ether"));
                wei = _this.web3.utils.fromWei(padBN.mul(_this.web3.utils.toBN(decimalFactor)).toString(), "ether");
                rawTx = {
                  from: wallet,
                  to: erc20.address,
                  value: "0",
                  data: erc20.token.methods.transfer(address, wei.toString()).encodeABI()
                };
                return _context7.abrupt("return", _this.sendTransaction(rawTx));

              case 17:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      return function (_x4, _x5, _x6) {
        return _ref7.apply(this, arguments);
      };
    }();

    _this.signMessage =
    /*#__PURE__*/
    function () {
      var _ref8 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee8(msg) {
        var signer, signData;
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.next = 2;
                return _this.getAddress();

              case 2:
                signer = _context8.sent;

                if (!(typeof signer !== "string")) {
                  _context8.next = 5;
                  break;
                }

                throw Error("There is no wallet access.");

              case 5:
                signData = _typeof(msg) === "object" ? JSON.stringify(msg) : msg; // @ts-ignore

                return _context8.abrupt("return", _this.web3.eth.personal.sign(signData, signer));

              case 7:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      return function (_x7) {
        return _ref8.apply(this, arguments);
      };
    }();

    _this.checkMessage =
    /*#__PURE__*/
    function () {
      var _ref9 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee9(msg, signature) {
        var signer, recovered;
        return regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                _context9.next = 2;
                return _this.getAddress();

              case 2:
                signer = _context9.sent;
                _context9.next = 5;
                return _this.web3.eth.personal.ecRecover(msg, signature);

              case 5:
                recovered = _context9.sent;

                if (!(typeof signer !== "string")) {
                  _context9.next = 8;
                  break;
                }

                throw Error("There is no wallet access.");

              case 8:
                return _context9.abrupt("return", signer.toLowerCase() === recovered.toLowerCase());

              case 9:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this);
      }));

      return function (_x8, _x9) {
        return _ref9.apply(this, arguments);
      };
    }();

    _this.walletPolling =
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee10() {
      var sourceAddress;
      return regeneratorRuntime.wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              _context10.prev = 0;
              _context10.next = 3;
              return _this.web3.eth.getAccounts();

            case 3:
              _context10.t0 = _context10.sent;

              if (_context10.t0) {
                _context10.next = 6;
                break;
              }

              _context10.t0 = "";

            case 6:
              sourceAddress = _context10.t0;

              // @ts-ignore
              if (_this.referenceAddress.toLowerCase() !== sourceAddress[0].toLowerCase()) {
                _this.emit("accountChange", sourceAddress[0]);

                _this.addressList = _this.web3.eth.getAccounts();
                _this.referenceAddress = sourceAddress[0];
              }

              _context10.next = 13;
              break;

            case 10:
              _context10.prev = 10;
              _context10.t1 = _context10["catch"](0);
              // tslint:disable-next-line
              void 0;

            case 13:
              setTimeout(_this.walletPolling, 1000);

            case 14:
            case "end":
              return _context10.stop();
          }
        }
      }, _callee10, this, [[0, 10]]);
    }));

    _this.sendTransaction = function (rawTx) {
      var tx = _this.web3.eth.sendTransaction(rawTx);

      return new Promise(function (resolve, reject) {
        tx.on("receipt", function (receipt) {
          resolve({
            success: receipt.status,
            txhash: receipt.transactionHash
          });
        });
        tx.on("error", function (error) {
          reject(Error("The transaction couldn't be processed."));
        });
      });
    };

    _this.ledgerWithRPC = function (rpcUrl) {
      var engine = new _web3ProviderEngine.default();

      var getTransport = function getTransport() {
        return typeof window !== "undefined" ? _hwTransportU2f.default.create(5000, 5000) : undefined;
      };

      try {
        var ledger = (0, _index.default)(getTransport, {
          accountsLength: 2
        });
        engine.addProvider(ledger);
        engine.addProvider(new _rpc.default({
          rpcUrl: rpcUrl
        }));
        return engine;
      } catch (e) {
        throw e;
        return undefined;
      }
    };

    _this.enable =
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee11() {
      return regeneratorRuntime.wrap(function _callee11$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              if (!_this.web3.currentProvider.enable) {
                _context11.next = 9;
                break;
              }

              _context11.prev = 1;
              _context11.next = 4;
              return _this.web3.currentProvider.enable();

            case 4:
              _context11.next = 9;
              break;

            case 6:
              _context11.prev = 6;
              _context11.t0 = _context11["catch"](1);
              throw _context11.t0;

            case 9:
              _this.addressList = _this.web3.eth.getAccounts();

            case 10:
            case "end":
              return _context11.stop();
          }
        }
      }, _callee11, this, [[1, 6]]);
    }));
    _this.web3 = new _web.default(_web.default.givenProvider || _this.publicNode);
    _this.addressList = _this.web3.eth.getAccounts();

    _this.enable();

    _this.walletPolling();

    return _this;
  }

  return Wallet;
}(_events.EventEmitter);

exports.Wallet = Wallet;