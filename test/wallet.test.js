const assert = require('chai').assert; 
const Web3 = require('web3');
const web3 = require('../lib/index.js');
const ganache = require("ganache-cli");

describe('Wallet', function() {
  let server, wallet, signature;
  
  before(async () => {
    server = ganache.server({fork: 'https://mainnet.infura.io/metamask'});
    server.listen(8545, () => {});
  });
  

  /* sync */
  
  it('should create a new wallet', () => {
    wallet = new web3.Wallet();

    assert.instanceOf(wallet, web3.Wallet);
  });
  
  it('should change the provider', () => {
    assert.doesNotThrow(() => { wallet.setProvider(server.provider) });
  });
  

  /* async */

  it('should check for access', async () => {
    const address = await wallet.isAvailable();

    assert.isBoolean(address);
  });
  
  it('should get one address', async () => {
    const address = await wallet.getAddress();

    assert.isString(address);
  });
  
  it('should send ether', async () => {
    assert.doesNotThrow(async () => { wallet.sendEther(await wallet.getAddress(), 0.1); });
  });
  
  it('should send tokens', async () => {
    assert.doesNotThrow(async () => { wallet.sendERC20(await wallet.getAddress(), 1, (new web3.ERC20('0x4f38f4229924bfa28d58eeda496cc85e8016bccc'))); });
  });
  
  
  /* ganache does not support personal_sign */

  it.skip('should sign a message', async () => {
    signature = await wallet.signMessage("cehhcoin");

    assert.isString(signature);
  });
  
  it.skip('should check a message', async () => {
    const recovered = await wallet.checkMessage("cehhcoin", signature);

    assert.equal(recovered, (await wallet.getAddress()));
  });
  

  /* ganache does not support publicConfigStore */
  
  it.skip('should update the wallet', async () => {
    /* ganache.selectedAddress(1); */
  });

  after(() => {
    server.close();
  });
});
