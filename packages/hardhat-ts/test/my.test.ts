import { Provider } from '@ethersproject/abstract-provider';
import { formatEther, parseEther } from '@ethersproject/units';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { expect } from 'chai';
import { MetaMultiSigWallet, Monyo } from 'contract-types';
import { BigNumber, BytesLike, constants } from 'ethers';
import { ethers, waffle } from 'hardhat';

describe.skip('multi sig wallet test', function () {
  let metaMultiSigWallet: MetaMultiSigWallet;
  let owner: SignerWithAddress;
  let addr1: SignerWithAddress;
  let addr2: SignerWithAddress;
  let addr3: SignerWithAddress;
  let addrs;

  let provider: Provider;

  const CHAIN_ID = 1; // I guess this number doesn't really matter
  const signatureRequired = 1; // Starting with something straithforward

  let monyo: Monyo; // ERC20 token
  const MONYO_TOKEN_TOTAL_SUPPLY = '100';

  // Running this before each test
  // Deploys MetaMultiSigWallet and sets up some addresses for easier testing
  beforeEach(async function () {
    [owner, addr1, addr2, addr3, ...addrs] = await ethers.getSigners();

    const metaMultiSigWalletFactory = await ethers.getContractFactory('MetaMultiSigWallet');

    // const monyoFactory = await ethers.getContractFactory('Monyo');
    // monyo = await monyoFactory.deploy(owner.address, ethers.utils.parseEther(MONYO_TOKEN_TOTAL_SUPPLY)); // Create Monyo ERC20 token, mint 100 to the multiSigWallet

    metaMultiSigWallet = await metaMultiSigWalletFactory.deploy(CHAIN_ID, [owner.address], signatureRequired, constants.AddressZero);

    await owner.sendTransaction({
      to: metaMultiSigWallet.address,
      value: ethers.utils.parseEther('10.0'),
    });

    provider = owner.provider as Provider;

    const monyoFactory = await ethers.getContractFactory('Monyo');
    monyo = await monyoFactory.deploy(metaMultiSigWallet.address, ethers.utils.parseEther(MONYO_TOKEN_TOTAL_SUPPLY)); // Create Monyo ERC20 token, mint 100 to the multiSigWallet
    // monyo = await monyoFactory.deploy(owner.address, ethers.utils.parseEther(MONYO_TOKEN_TOTAL_SUPPLY)); // Create Monyo ERC20 token, mint 100 to the multiSigWallet
  });

  it.skip('should send token to  contract and get back', async () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    // const setToken = await metaMultiSigWallet.setToken(monyo.address as any);
    // const approveTx = await monyo.connect(owner).approve(addr1.address, parseEther('10'));
    // const approveRcpt = await approveTx.wait();
    // working with owner token
    // const alwnc1 = await monyo.increaseAllowance(owner.address, parseEther('10'));
    // const alwnc1Rcpt = await alwnc1.wait();
    // const allowance = await monyo.allowance(owner.address, owner.address);
    // const tx = await monyo.transferFrom(owner.address, addr1.address, parseEther('10'));
    // const approveTx = await monyo.approve(metaMultiSigWallet.address, parseEther('10'));
    // const approveRcpt = await approveTx.wait();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    // const sendToken = await metaMultiSigWallet.sendToken(parseEther('15') as any);
    // let ownerBalance = await monyo.balanceOf(owner.address);
    // let contractBalance = await monyo.balanceOf(metaMultiSigWallet.address);
    // console.log('ownerBalance: ', ownerBalance);
    // console.log('contractBalance: ', contractBalance);
    // // sending back from owner to contract
    // const alwnc1 = await monyo.approve(owner.address, parseEther('15'));
    // const alwnc1Rcpt = await alwnc1.wait();
    // const allowance = await monyo.allowance(owner.address, owner.address);
    // console.log('allowance: for owner ', allowance);
    // const tx = await monyo.transferFrom(owner.address, metaMultiSigWallet.address, parseEther('15'));
    // ownerBalance = await monyo.balanceOf(owner.address);
    // contractBalance = await monyo.balanceOf(metaMultiSigWallet.address);
    // console.log('ownerBalance: ', ownerBalance);
    // console.log('contractBalance: ', contractBalance);
  });
  it.skip('Adding a new signer', async () => {
    const newSigner = addr1.address;

    const nonce = await metaMultiSigWallet.nonce();
    const to = metaMultiSigWallet.address;
    const value = 0;

    const callData = metaMultiSigWallet.interface.encodeFunctionData('addSigner', [newSigner, 1]);

    const hash = await metaMultiSigWallet.getTransactionHash(nonce, to, value, callData);

    const signature: BytesLike = await waffle.provider.send('personal_sign', [hash, owner.address]);

    // const jsonRpcProvider = new ethers.providers.JsonRpcProvider();
    // const mySign = await jsonRpcProvider.send('personal_sign', [hash, owner.address]);
    // console.log('mySign: ', mySign);

    // Double checking if owner address is recovered properly, executeTransaction would fail anyways
    expect(await metaMultiSigWallet.recover(hash, signature)).to.equal(owner.address);

    await metaMultiSigWallet.executeTransaction(metaMultiSigWallet.address, value, callData, [signature]);

    expect(await metaMultiSigWallet.isOwner(newSigner)).to.equal(true);
  });

  it.skip('Update Signatures Required to 2 - locking all the funds in the wallet, becasuse there is only 1 signer', async () => {
    const nonce = await metaMultiSigWallet.nonce();
    const to = metaMultiSigWallet.address;
    const value = 0;

    const callData = metaMultiSigWallet.interface.encodeFunctionData('updateSignaturesRequired', [2]);

    const hash = await metaMultiSigWallet.getTransactionHash(nonce, to, value, callData);

    const signature = await waffle.provider.send('personal_sign', [hash, owner.address]);

    // Double checking if owner address is recovered properly, executeTransaction would fail anyways
    expect(await metaMultiSigWallet.recover(hash, signature as BytesLike)).to.equal(owner.address);

    await metaMultiSigWallet.executeTransaction(metaMultiSigWallet.address, value, callData, [signature as BytesLike]);

    expect(await metaMultiSigWallet.signaturesRequired()).to.equal(2);
  });

  it.skip('Transferring 0.1 eth to addr1', async () => {
    const addr1BeforeBalance = await provider.getBalance(addr1.address);

    const nonce = await metaMultiSigWallet.nonce();
    const to: string = addr1.address;
    const value = ethers.utils.parseEther('0.1');

    const callData = '0x00'; // This can be anything, we could send a message

    const hash = await metaMultiSigWallet.getTransactionHash(nonce, to, value.toString(), callData);

    const signature: BytesLike = await waffle.provider.send('personal_sign', [hash, owner.address]);

    await metaMultiSigWallet.executeTransaction(to, value.toString(), callData, [signature]);

    const addr1Balance = await provider.getBalance(addr1.address);

    expect(addr1Balance).to.equal(addr1BeforeBalance.add(value));
  });

  it('Allowing addr1 to spend 10 Monyo tokens. Then addr1 transfers the Monyo tokens to addr2', async () => {
    const nonce = await metaMultiSigWallet.nonce();
    const to: string = monyo.address;
    const value = 0;
    console.log('metaMultiSigWallet.address: ', metaMultiSigWallet.address);
    console.log('monyo.address: ', monyo.address);
    console.log('addr1.address: ', addr1.address);

    const amount = ethers.utils.parseEther('10');

    const metaMultiSigWalletBalance = await monyo.balanceOf(metaMultiSigWallet.address);
    console.log('metaMultiSigWalletBalance: ', formatEther(metaMultiSigWalletBalance));

    const callData: BytesLike = monyo.interface.encodeFunctionData('approve', [addr1.address, amount]);

    const hash = await metaMultiSigWallet.getTransactionHash(nonce, to, value.toString(), callData);

    const signature: BytesLike = await waffle.provider.send('personal_sign', [hash, owner.address]);

    await metaMultiSigWallet.executeTransaction(to, value.toString(), callData, [signature]);

    // eslint-disable-next-line @typescript-eslint/naming-convention
    const metaMultiSigWallet_addr1Allowance = await monyo.allowance(metaMultiSigWallet.address, addr1.address);
    console.log('metaMultiSigWallet_addr1Allowance: ', metaMultiSigWallet_addr1Allowance);
    // expect(metaMultiSigWallet_addr1Allowance).to.equal(amount);

    await monyo.connect(addr1).transferFrom(metaMultiSigWallet.address, addr2.address, amount);

    const addr2MonyoBalance = await monyo.balanceOf(addr2.address);
    console.log('addr2MonyoBalance: ', addr2MonyoBalance);
    const metaMonyoBalance = await monyo.balanceOf(metaMultiSigWallet.address);
    // expect(addr2MonyoBalance).to.equal(amount);
  });

  it.skip('should execute with two signers', async () => {
    const nonce = await metaMultiSigWallet.nonce();
    const to: string = addr1.address;
    const value = ethers.utils.parseEther('0.1');
    const callData = '0x00'; // This can be anything, we could send a message

    const hash = await metaMultiSigWallet.getTransactionHash(nonce, to, value.toString(), callData);
    console.log('hash: ', hash);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    const signature1: BytesLike = await waffle?.provider?.send('personal_sign', [hash, owner.address]);
    const signature2: BytesLike = await waffle?.provider?.send('personal_sign', [hash, addr1.address]);
    // console.log('signature1: ', signature1);
    console.log('signature2: ', signature2);
    console.log('addr1.address: ', addr1.address < owner.address);

    await metaMultiSigWallet.executeTransaction(to, value.toString(), callData, [signature2, signature1]);

    // const addr1Balance = await provider.getBalance(addr1.address);
    // console.log('addr1Balance: ', addr1Balance);
  });

  it('should add new signer', async () => {
    const newSigner = addr3.address;

    const nonce = await metaMultiSigWallet.nonce();
    const to = metaMultiSigWallet.address;
    const value = 0;

    const callData = metaMultiSigWallet.interface.encodeFunctionData('addSigner', [newSigner, 1]);

    const hash = await metaMultiSigWallet.getTransactionHash(nonce, to, value, callData);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    const signature: BytesLike = await waffle?.provider?.send('personal_sign', [hash, owner.address]);

    // Double checking if owner address is recovered properly, executeTransaction would fail anyways
    expect(await metaMultiSigWallet.recover(hash, signature)).to.equal(owner.address);

    await metaMultiSigWallet.executeTransaction(metaMultiSigWallet.address, value, callData, [signature]);

    expect(await metaMultiSigWallet.isOwner(newSigner)).to.equal(true);
  });
});
