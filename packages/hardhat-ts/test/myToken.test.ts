import { Provider } from '@ethersproject/abstract-provider';
import { formatEther, parseEther } from '@ethersproject/units';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { expect } from 'chai';
import { MetaMultiSigWallet, Monyo } from 'contract-types';
import { BigNumber, BytesLike } from 'ethers';
import { ethers, waffle } from 'hardhat';

describe.skip('multi sig wallet test', function () {
  let metaMultiSigWallet: MetaMultiSigWallet;
  let owner: SignerWithAddress;
  let addr1: SignerWithAddress;
  let addr2: SignerWithAddress;
  let addr3;
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
    console.log('owner address: ', owner.address);
    console.log('addr1 address: ', addr1.address);
    console.log('addr2 address: ', addr2.address);

    const metaMultiSigWalletFactory = await ethers.getContractFactory('MetaMultiSigWallet');

    provider = owner.provider as Provider;

    const monyoFactory = await ethers.getContractFactory('Monyo');
    monyo = await monyoFactory.deploy(owner.address, ethers.utils.parseEther(MONYO_TOKEN_TOTAL_SUPPLY)); // Create Monyo ERC20 token, mint 100 to the multiSigWallet
  });

  it.skip('should send  a token from owner to addr1', async () => {
    //   SEND FROM OWNER TO ADDR1
    const amt = parseEther('10');
    //     approve
    /**
     * with approve you can add allowance to an adddress
     */
    let approveTx = await monyo.connect(owner).approve(addr1.address, amt);
    let approveRcpt = await approveTx.wait();

    let allowance = await monyo.allowance(owner.address, addr1.address);
    console.log('owner allowance: ', formatEther(allowance));

    /** REMEMBER FOR TRANSFER METHOD
     * but to use added allowance check the caller which is calling this transfer methods
     * in this case if a caller is owner and you added allownance for addr1.address
     * then it will reduce the allowance from callers added allowance for this addr1.address
     */

    /** Here For allowance caller is important
     * allowance get deducted from callers allowance
     */
    let transferFromTx = await monyo.connect(owner).transfer(addr1.address, amt);
    let transferFromRcpt = await transferFromTx.wait();

    let addr1Balance = await monyo.balanceOf(addr1.address);
    let ownerBalance = await monyo.balanceOf(owner.address);
    console.log('ownerBalance: ', formatEther(ownerBalance));
    console.log('addr1Balance: ', formatEther(addr1Balance));

    //   SEND FROM OWNER TO ADDR1
    //     const amt = parseEther('10');
    //     //     approve
    approveTx = await monyo.connect(addr1).approve(owner.address, amt);
    approveRcpt = await approveTx.wait();

    allowance = await monyo.allowance(addr1.address, owner.address);
    console.log('addr1 allowance: ', formatEther(allowance));

    /** REMEMBER FOR TRANSFER_FROM METHOD
     * you added approve for owner here .
     * then you should call from owner
     * this transferFrom method will transfer addr1.address to owner.address
     * if the addr1 approved the for owner
     */

    transferFromTx = await monyo.connect(owner).transferFrom(addr1.address, owner.address, amt);
    transferFromRcpt = await transferFromTx.wait();

    addr1Balance = await monyo.balanceOf(addr1.address);
    ownerBalance = await monyo.balanceOf(owner.address);
    console.log('ownerBalance: ', formatEther(ownerBalance));
    console.log('addr1Balance: ', formatEther(addr1Balance));
  });
});
