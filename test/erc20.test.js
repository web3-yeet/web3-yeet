const assert = require('chai').assert; 
const web3 = require('../lib/index.js');

describe('ERC20', function() {

  /* sync */
  
  it('should create a new token', () => {
    const token = new web3.ERC20('0x4f38f4229924bfa28d58eeda496cc85e8016bccc');
  });
  
  it('should throw with invalid addresses', () => {
    assert.throws(() => { const token = new web3.ERC20(''); });
  });
  
  it('should have info object', () => {
    const token = new web3.ERC20('0x4f38f4229924bfa28d58eeda496cc85e8016bccc');
    const info = token.getInfo();

    assert.hasAllKeys(info, ['name','symbol','totalSupply','decimals']);
  });

  
  /* async */

  it('should return a name', async () => {
    const token = new web3.ERC20('0x4f38f4229924bfa28d58eeda496cc85e8016bccc');
    const name = await token.getName();

    assert.equal(name, "CehhCoin");
  });
  
  it('should return a symbol', async () => {
    const token = new web3.ERC20('0x4f38f4229924bfa28d58eeda496cc85e8016bccc');
    const symbol = await token.getSymbol();

    assert.equal(symbol, "CEHH");
  });

  it('should return the supply', async () => {
    const token = new web3.ERC20('0x4f38f4229924bfa28d58eeda496cc85e8016bccc');
    const supply = await token.getTotalSupply();

    assert.isNumber(parseInt(supply));
  });
  
  it('should return the decimals', async () => {
    const token = new web3.ERC20('0x4f38f4229924bfa28d58eeda496cc85e8016bccc');
    const decimals = await token.getDecimals();

    assert.isNumber(parseInt(decimals));
  });
  
  it('should return balance', async () => {
    const token = new web3.ERC20('0x4f38f4229924bfa28d58eeda496cc85e8016bccc');
    const balance = await token.getBalance('0x4f38f4229924bfa28d58eeda496cc85e8016bccc');

    assert.isAtLeast(parseFloat(balance), 0);
  });

  it('should get decimal factor', async () => {
    const token = new web3.ERC20('0x4f38f4229924bfa28d58eeda496cc85e8016bccc');
    const factor = await token.getDecimalFactor();

    assert.isString(factor);
  });
});
