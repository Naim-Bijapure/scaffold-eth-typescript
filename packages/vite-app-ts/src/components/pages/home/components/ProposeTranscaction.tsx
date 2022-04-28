import { parseEther } from '@ethersproject/units';
import { Button } from 'antd';
import { useEventListener } from 'eth-hooks';
import { useEthersContext } from 'eth-hooks/context';
import React from 'react';
import { useAppContracts } from '~~/config/contractContext';

import { MetaMultiSigWallet } from '~~/generated/contract-types';
import { DebugLogEvent } from '~~/generated/contract-types/MetaMultiSigWallet';

interface IProposeTranscaction {
  walletAddress: string;
  walletContract: MetaMultiSigWallet;
  walletFactory: MetaMultiSigWallet;
}
const ProposeTranscaction: React.FC<IProposeTranscaction> = ({ walletAddress, walletContract, walletFactory }) => {
  const ethersContext = useEthersContext();

  const onTest = async (): Promise<void> => {
    //     const value = parseEther('10');
    const value = parseEther('0.15').toString();

    // @ts-ignore
    const callData = walletFactory?.interface.encodeFunctionData('addSigner', [
      '0xbA4C9A16f4030c2455316Bf2F169bB5b185cCAa4',
      2,
    ]);
    const hash = await walletContract.getTransactionHash(0, ethersContext.account as string, value, callData);

    const sign = await ethersContext.provider?.send('personal_sign', [hash, ethersContext.account]);
    const recoverAddress = await walletContract.recover(hash, sign);
    console.log('recoverAddress: ', recoverAddress);

    const execTx = await walletContract.executeTransaction(recoverAddress, value, callData, [sign]);
    const execRcpt = await execTx.wait();
    console.log('execRcpt: ', execRcpt);

    console.log('hash: ', hash);
  };
  return (
    <div>
      <Button onClick={onTest}>Test</Button>
    </div>
  );
};
export default ProposeTranscaction;
