import { Card, Collapse } from 'antd';
import { Address, Balance } from 'eth-components/ant';
import React from 'react';

const { Panel } = Collapse;

interface IYourMultiSig {
  walletAddress: string;
  walletOwners: Array<string>;
  signatureCount: number;
  price: number;
}

const YourWallet: React.FC<IYourMultiSig> = ({ walletAddress, walletOwners, signatureCount, price }) => {
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
          <Card title="Executed Transcactions">
            <Collapse defaultActiveKey={['1']} onChange={callback}>
              <Panel header="This is panel header 1" key="1">
                <p>{text}</p>
              </Panel>
              <Panel header="This is panel header 2" key="2">
                <p>{text}</p>
              </Panel>
              <Panel header="This is panel header 3" key="3">
                <p>{text}</p>
              </Panel>
            </Collapse>
          </Card>
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
                  <>
                    <Address address={address} />
                  </>
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
