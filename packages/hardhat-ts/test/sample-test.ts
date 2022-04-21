import chai, { expect } from 'chai';
import { BigNumber } from 'ethers';
import { ethers, waffle } from 'hardhat';

describe('YourContract', function () {
  it("Should return the new purpose once it's changed", async function () {
    const YourContract = await ethers.getContractFactory('YourContract');
    const yourContract = await YourContract.deploy();

    await yourContract.deployed();
    // expect(await yourContract.purpose()).to.equal('Building Unstoppable Apps!!!');

    // await yourContract.setPurpose('Hola, mundo!');
    // expect(await yourContract.purpose()).to.equal('Hola, mundo!');
    const [owner] = await ethers.getSigners();

    await expect(yourContract.setPurpose('Hola, mundo!')).to.emit(yourContract, 'SetPurpose');
  });
});
