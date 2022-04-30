import { Card, Collapse } from 'antd';
import { Address, Balance } from 'eth-components/ant';
import { IEthersContext } from 'eth-hooks/models';
import React from 'react';
import { MetaMultiSigWallet } from '~~/generated/contract-types';
import TranscactionPool from './TranscactionPool';

const { Panel } = Collapse;

interface IYourMultiSig {
  walletAddress: string;
  walletOwners: Array<string>;
  signatureCount: number;
  price: number;
  walletContract: MetaMultiSigWallet;
  walletFactory: MetaMultiSigWallet;
  provider: any;
  etherContext: IEthersContext;
}

const YourWallet: React.FC<IYourMultiSig> = ({
  walletAddress,
  walletOwners,
  signatureCount,
  price,
  etherContext,
  provider,
  walletContract,
  walletFactory,
}) => {
  function callback(key) {}

  const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;
  return (
    <div>
      <div className="flex justify-center ">
        <div className="w-[60%]">
          <TranscactionPool
            key={'1'}
            isExecutedPool={true}
            walletAddress={walletAddress}
            price={price}
            provider={provider}
            walletContract={walletContract}
            walletFactory={walletFactory}
            etherContext={etherContext}
          />
        </div>

        <div className="w-[40%]">
          <Card title="Your Wallet">
            <div>
              <Balance address={walletAddress} price={price} />
            </div>
            <div>
              <Address address={walletAddress} />
            </div>
            <div className="text-blue-400">{signatureCount} signatures required</div>
          </Card>

          <Card title="Owners">
            <div className="Owners">
              {walletOwners.map((address) => {
                return (
                  <div key={address}>
                    <Address address={address} />
                  </div>
                );
              })}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
export default YourWallet;
