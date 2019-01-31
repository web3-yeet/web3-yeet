const assert = require('chai').assert; 
const web3 = require('../lib/index.js');

describe('ERC20', function() {
  let token;

  beforeEach(() => {
    token = new web3.ERC20('0x4f38f4229924bfa28d58eeda496cc85e8016bccc');
  });
  
  afterEach(() => {
    try {
      token.web3.currentProvider.removeAllListeners();
    } catch (e) {}
  });

  /* sync */
  
  it('should throw with invalid addresses', () => {
    assert.throws(() => { const token = new web3.ERC20(''); });
  });
  
  it('should have info object', () => {
    const info = token.getInfo();

    assert.hasAllKeys(info, ['name','symbol','totalSupply','decimals']);
  });

  
  /* async */

  it('should return a name', async () => {
    const name = await token.getName();

    assert.equal(name, "CehhCoin");
  });
  
  it('should return a symbol', async () => {
    const symbol = await token.getSymbol();

    assert.equal(symbol, "CEHH");
  });

  it('should return the supply', async () => {
    const supply = await token.getTotalSupply();

    assert.isNumber(parseInt(supply));
  });
  
  it('should return the decimals', async () => {
    const decimals = await token.getDecimals();

    assert.isNumber(parseInt(decimals));
  });
  
  it('should return balance', async () => {
    const balance = await token.getBalance('0x4f38f4229924bfa28d58eeda496cc85e8016bccc');

    assert.isAtLeast(parseFloat(balance), 0);
  });

  it('should get decimal factor', async () => {
    const factor = await token.getDecimalFactor();

    assert.isString(factor);
  });
});
