const assert = require('chai').assert; 
const web3 = require('../lib/index.js');

describe('Transaction', function() {

  /* sync */
  
  it('should create a new transaction', () => {
    const tx = new web3.TransactionData('0x5df798e91752ccf7205c3b3037adfffe38841d79f35e9c2b2a92f79a36aea4b9');
  });
  
  /* async */

  it('should return decode a transfer', async () => {
    const tx = new web3.TransactionData('0x5df798e91752ccf7205c3b3037adfffe38841d79f35e9c2b2a92f79a36aea4b9');
    const data = await tx.getTokenTransfer();

    assert.hasAllKeys(data, ['from', 'value', 'to']);
  });
});
