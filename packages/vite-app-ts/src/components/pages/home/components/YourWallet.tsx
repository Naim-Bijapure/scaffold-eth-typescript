import { Card, Collapse, Empty } from 'antd';
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
            {walletAddress.length > 0 && (
              <>
                <div>
                  <Balance address={walletAddress} price={price} />
                </div>
                <div>
                  <Address address={walletAddress} />
                </div>
                <div className="text-blue-400">{signatureCount} signatures required</div>
              </>
            )}

            {walletAddress.length === 0 && (
              <>
                <Empty description="No wallet found" />
              </>
            )}
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
