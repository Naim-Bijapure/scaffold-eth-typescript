import { DeployFunction } from 'hardhat-deploy/types';
import { HardhatRuntimeEnvironment } from 'hardhat/types';

const func: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
  const { getNamedAccounts, deployments } = hre;
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();
  const CHAIN_ID = 31337;

  await deploy('YourContract', {
    // Learn more about args here: https://www.npmjs.com/package/hardhat-deploy#deploymentsdeploy
    from: deployer,
    // args: ["Hello"],
    log: true,
  });

  const multiSigFactoryDeployed = await deploy('MultiSigFactory', {
    from: deployer,
    // args: [31337, ['0x813f45BD0B48a334A3cc06bCEf1c44AAd907b8c1'], 1],
    log: true,
  });

  const metaMultiSigWalletDeployed = await deploy('MetaMultiSigWallet', {
    from: deployer,
    args: [31337, ['0x813f45BD0B48a334A3cc06bCEf1c44AAd907b8c1'], 1, multiSigFactoryDeployed.address],
    log: true,
  });

  // const MONYO_TOKEN_TOTAL_SUPPLY = '100';
  // const monyoDeployed = await deploy('Monyo', {
  //   from: deployer,
  //   args: [metaMultiSigWalletDeployed.address, hre.ethers.utils.parseEther(MONYO_TOKEN_TOTAL_SUPPLY)],
  //   log: true,
  // });

  // await (deployer as any).sendTransaction({
  //   to: metaMultiSigWalletDeployed.address,
  //   value: hre.ethers.utils.parseEther('1.0'),
  // });

  // console.log('monyoDeployed: ', monyoDeployed.address);
  console.log('multiSigFactoryDeployed.address: ', multiSigFactoryDeployed.address);
  console.log('MetaMultiSigWalletDeployed: ', metaMultiSigWalletDeployed.address);
};
export default func;
func.tags = ['YourContract', 'MultiSigFactory', 'MetaMultiSigWallet', 'Monyo'];
