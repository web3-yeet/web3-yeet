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
                var wallet = function (wallet) {
                  if (typeof wallet === 'string') return wallet;else return undefined;
                }(sender);

                var wei = web3.utils.toWei(web3.utils.toBN(amount), 'ether');
                if (typeof wallet !== 'string') reject("There is no wallet access.");
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

  this.address = web3.eth.getAccounts();
};

exports.Wallet = Wallet;