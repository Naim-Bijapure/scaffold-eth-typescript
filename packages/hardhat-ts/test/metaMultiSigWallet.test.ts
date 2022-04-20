import { expect } from 'chai';
import { ethers } from 'hardhat';

describe('YourContract', function () {
  it("Should return the new purpose once it's changed", async function () {
    const YourContract = await ethers.getContractFactory('YourContract');
    const yourContract = await YourContract.deploy();
    console.log('yourContract: ', yourContract);

    await yourContract.deployed();
    expect(await yourContract.purpose()).to.equal('Building Unstoppable Apps!!!');

    await yourContract.setPurpose('Hola, mundo!');
    expect(await yourContract.purpose()).to.equal('Hola, mundo!');
  });
});
