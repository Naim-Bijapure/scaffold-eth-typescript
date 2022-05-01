import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { expect } from 'chai';
import { MetaMultiSigWallet } from 'contract-types';
import { MultiSigFactory__factory } from 'contract-types/factories/MultiSigFactory__factory';
import { BytesLike, Signer, constants } from 'ethers';
import { ethers, waffle } from 'hardhat';

describe('MetaMultiSigWallet Test', () => {
  let metaMultiSigWallet: MetaMultiSigWallet;
  let owner: SignerWithAddress;
  let addr1: SignerWithAddress;
  let addr2: SignerWithAddress;
  let addr3;
  let addrs;

  let provider;

  const CHAIN_ID = 1; // I guess this number doesn't really matter
  const signatureRequired = 1; // Starting with something straithforward

  let monyo; // ERC20 token
  const MONYO_TOKEN_TOTAL_SUPPLY = '100';

  // Running this before each test
  // Deploys MetaMultiSigWallet and sets up some addresses for easier testing
  beforeEach(async function () {
    [owner, addr1, addr2, addr3, ...addrs] = await ethers.getSigners();

    const metaMultiSigWalletInstance = await ethers.getContractFactory('MetaMultiSigWallet');
    const metaMultiSigFactoryInstance = await ethers.getContractFactory('MultiSigFactory');

    const metaMultiSigFactory = await metaMultiSigFactoryInstance.deploy();

    const createWalletTx = await metaMultiSigFactory.create(CHAIN_ID, [owner.address], signatureRequired);
    const createWalletRcpt = await createWalletTx.wait();

    const getWalletTx = await metaMultiSigFactory.getMultiSig(0);

    // metaMultiSigWallet = await metaMultiSigWalletInstance.deploy(CHAIN_ID, [owner.address], signatureRequired, constants.AddressZero);
    metaMultiSigWallet = await ethers.getContractAt('MetaMultiSigWallet', getWalletTx[0], metaMultiSigFactoryInstance.signer);

    await owner.sendTransaction({
      to: metaMultiSigWallet.address,
      value: ethers.utils.parseEther('1.0'),
    });

    provider = owner.provider;

    const monyoFactory = await ethers.getContractFactory('Monyo');
    monyo = await monyoFactory.deploy(metaMultiSigWallet.address, ethers.utils.parseEther(MONYO_TOKEN_TOTAL_SUPPLY)); // Create Monyo ERC20 token, mint 100 to the multiSigWallet
  });

  // it('test', async () => {});
  describe('Deployment', () => {
    it('isOwner should return true for the owner address', async () => {
      expect(await metaMultiSigWallet.isOwner(owner.address)).to.equal(true);
    });

    it('Multi Sig Wallet should own all the monyo token', async () => {
      const metaMultiSigWalletMonyoBalance = await monyo.balanceOf(metaMultiSigWallet.address);

      expect(metaMultiSigWalletMonyoBalance).to.equal(ethers.utils.parseEther(MONYO_TOKEN_TOTAL_SUPPLY));
    });
  });

  describe('Testing MetaMultiSigWallet functionality', () => {
    it('Adding a new signer', async () => {
      const newSigner = addr2.address;

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

      const isOwner = await metaMultiSigWallet.isOwner(newSigner);
      // console.log('isOwner: ', isOwner);

      expect(await metaMultiSigWallet.isOwner(newSigner)).to.equal(true);
    });

    it('Update Signatures Required to 2 - locking all the funds in the wallet, becasuse there is only 1 signer', async () => {
      const nonce = await metaMultiSigWallet.nonce();
      const to = metaMultiSigWallet.address;
      const value = 0;

      const callData = metaMultiSigWallet.interface.encodeFunctionData('updateSignaturesRequired', [2]);

      const hash = await metaMultiSigWallet.getTransactionHash(nonce, to, value, callData);

      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      const signature = await waffle?.provider?.send('personal_sign', [hash, owner.address]);

      // Double checking if owner address is recovered properly, executeTransaction would fail anyways
      expect(await metaMultiSigWallet.recover(hash, signature as BytesLike)).to.equal(owner.address);

      await metaMultiSigWallet.executeTransaction(metaMultiSigWallet.address, value, callData, [signature as BytesLike]);

      expect(await metaMultiSigWallet.signaturesRequired()).to.equal(2);
    });

    it('Transferring 0.1 eth to addr1', async () => {
      const addr1BeforeBalance = await provider.getBalance(addr1.address);

      const nonce = await metaMultiSigWallet.nonce();
      const to: string = addr1.address;
      const value = ethers.utils.parseEther('0.1');

      const callData = '0x00'; // This can be anything, we could send a message

      const hash = await metaMultiSigWallet.getTransactionHash(nonce, to, value.toString(), callData);

      // const signature: BytesLike = await owner.provider.send('personal_sign', [hash, owner.address]);

      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      const signature: BytesLike = await waffle?.provider?.send('personal_sign', [hash, owner.address]);

      await metaMultiSigWallet.executeTransaction(to, value.toString(), callData, [signature]);

      const addr1Balance = await provider.getBalance(addr1.address);

      expect(addr1Balance).to.equal(addr1BeforeBalance.add(value));
    });

    it('Allowing addr1 to spend 10 Monyo tokens. Then addr1 transfers the Monyo tokens to addr2', async () => {
      const nonce = await metaMultiSigWallet.nonce();
      const to: string = monyo.address;
      const value = 0;

      const amount = ethers.utils.parseEther('10');

      const callData: BytesLike = monyo.interface.encodeFunctionData('approve', [addr1.address, amount]);

      const hash = await metaMultiSigWallet.getTransactionHash(nonce, to, value.toString(), callData);

      // const signature: BytesLike = await owner.provider.send('personal_sign', [hash, owner.address]);

      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      const signature: BytesLike = await waffle?.provider?.send('personal_sign', [hash, owner.address]);

      await metaMultiSigWallet.executeTransaction(to, value.toString(), callData, [signature]);

      // eslint-disable-next-line @typescript-eslint/naming-convention
      const metaMultiSigWallet_addr1Allowance = await monyo.allowance(metaMultiSigWallet.address, addr1.address);
      expect(metaMultiSigWallet_addr1Allowance).to.equal(amount);

      await monyo.connect(addr1).transferFrom(metaMultiSigWallet.address, addr2.address, amount);

      const addr2MonyoBalance = await monyo.balanceOf(addr2.address);
      expect(addr2MonyoBalance).to.equal(amount);
    });
  });
});
