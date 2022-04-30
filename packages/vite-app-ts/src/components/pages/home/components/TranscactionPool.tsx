import { CaretRightOutlined, CheckCircleTwoTone as SignIcon, SendOutlined as ExecuteIcon } from '@ant-design/icons';
import { Button, Card, Collapse, Descriptions, Empty, notification, Progress, Tooltip } from 'antd';
import { Address, Balance, Blockie } from 'eth-components/ant';
import { IEthersContext } from 'eth-hooks/models';
import React, { useEffect, useState } from 'react';

import API from '~~/config/API';
import { MetaMultiSigWallet } from '~~/generated/contract-types';

const { Panel } = Collapse;

interface ITranscactionPool {
  walletAddress: string;
  walletContract: MetaMultiSigWallet;
  walletFactory: MetaMultiSigWallet;
  provider: any;
  price: any;
  etherContext: IEthersContext;
  notifyTx?: any;
  isExecutedPool: boolean;
}
const TranscactionPool: React.FC<ITranscactionPool> = ({
  walletAddress,
  walletContract,
  walletFactory,
  price,
  etherContext,
  notifyTx,
  isExecutedPool,
}) => {
  const [transcactions, setTranscactions] = useState<Array<any>>([]);
  const [loadTranscactionsToggle, setLoadTranscactionsToggle] = useState<boolean>(false);

  const loadTranscactions = async (): Promise<void> => {
    try {
      const transcactions = await (await API.get(`/basket/${walletAddress}`)).data['transcactions'];

      // const parsedData = walletFactory.interface.parseTransaction({ data: transcactions[0]['hash'] });
      setTranscactions(transcactions.filter((data) => data['isExecuted'] === isExecutedPool));
    } catch (error) {
      // setTranscactions([]);
    }
  };
  useEffect(() => {
    void loadTranscactions();
  }, []);

  useEffect(() => {
    void loadTranscactions();
  }, [loadTranscactionsToggle]);

  const onExecuteTranscaction = async (transcactionId: number): Promise<void> => {
    const selectedTranscactionIndex = transcactions.findIndex((data, index) => data['proposalId'] === transcactionId);

    const currentTranscaction = transcactions[selectedTranscactionIndex];

    const transcactionHash = currentTranscaction['hash'];

    const sign = await etherContext.provider?.send('personal_sign', [transcactionHash, etherContext.account]);
    const recoverAddress = await walletContract.recover(transcactionHash, sign);
    const isOwner = await walletContract.isOwner(recoverAddress);
    if (isOwner) {
      const value = currentTranscaction['value'];
      const callData = currentTranscaction['callData'];
      const signitures = currentTranscaction['signatures'];
      const execTx = walletContract.executeTransaction(recoverAddress, value, callData, [...signitures]);
      // const execRcpt = await execTx.wait();
      //

      notifyTx(execTx, async (data: any) => {
        transcactions[selectedTranscactionIndex]['isExecuted'] = true;
        const res = await API.post(`/basket/${walletAddress}`, { transcactions: [...transcactions] });

        notification['success']({ message: 'Transcaction executed successfully' });
        setLoadTranscactionsToggle(!loadTranscactionsToggle);
      });
    }
  };

  const ExecuteButton = (isExecutable: boolean, transcactionId: number): any => (
    <>
      <div className={isExecutedPool ? 'hidden' : 'flex items-center justify-center  w-[100%] '}>
        <Tooltip
          title={isExecutable ? 'Execute transcaction' : 'Not enough signatures'}
          color={isExecutable ? 'blue' : 'orange'}>
          <Button
            type="link"
            disabled={isExecutable === false}
            onClick={async (event): Promise<void> => {
              event.stopPropagation();
              await onExecuteTranscaction(transcactionId);
            }}
            icon={
              <ExecuteIcon className={isExecutable ? 'text-xl text-blue-500' : 'text-xl text-orange-500'} />
            }></Button>
        </Tooltip>
      </div>
    </>
  );

  const onSignTranscaction = async (transcactionId: string): Promise<void> => {
    const selectedTranscactionIndex = transcactions.findIndex((data, index) => data['proposalId'] === transcactionId);

    const transcactionHash = transcactions[selectedTranscactionIndex]['hash'];

    const sign = await etherContext.provider?.send('personal_sign', [transcactionHash, etherContext.account]);
    const recoverAddress = await walletContract.recover(transcactionHash, sign);
    const isOwner = await walletContract.isOwner(recoverAddress);
    if (isOwner) {
      transcactions[selectedTranscactionIndex]['signatures'].push(sign);
      setTranscactions([...transcactions]);

      const res = await API.post(`/basket/${walletAddress}`, { transcactions: [...transcactions] });

      notification['success']({ message: 'Added signature successfully' });
      setLoadTranscactionsToggle(!loadTranscactionsToggle);
    }
  };

  return (
    <div>
      {/* pool collaps list */}

      {transcactions.length > 0 && (
        <div className={transcactions.length !== 0 ? '' : 'hidden'}>
          <Card title={isExecutedPool ? 'Executed transcaction pool' : 'Transcaction pool'}>
            <Collapse
              // bordered={false}
              defaultActiveKey={['1']}
              expandIcon={({ isActive }): any => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
              className="w-full site-collapse-custom-collapse">
              {transcactions.map((data, index) => {
                //
                const isExecutable = data.signatureRequired === data?.signatures.length;
                const functionSignature: string =
                  data.callData === '0x'
                    ? data.callData
                    : walletFactory.interface.parseTransaction({
                        data: data.callData,
                      }).signature;

                return (
                  <Panel
                    header={
                      <div className="flex items-center justify-start  w-[70%] ">
                        <span className="mx-5">#{index + 1}</span>
                        <span>
                          <Blockie scale={3} address={data['hash']} />
                        </span>
                        <span className="mx-2 ">{data.hash.slice(0, 6)}</span>
                        <span className="mr-auto">{data['eventName']}</span>
                        <div className="w-1/2 ml-auto  ">
                          <Tooltip
                            title={`${data?.signatures.length}/${data.signatureRequired} signatures`}
                            color={'blue'}>
                            <Progress
                              showInfo={false}
                              percent={100}
                              success={{ percent: (100 / data.signatureRequired) * data?.signatures.length }}
                              size="small"
                            />
                          </Tooltip>
                        </div>
                        <div className="ml-auto">
                          <Tooltip
                            title={isExecutable ? 'all signatures completed' : 'sign the proposal'}
                            color={isExecutable ? 'green' : 'blue'}>
                            <Button
                              type="link"
                              onClick={async (): Promise<any> => {
                                await onSignTranscaction(data['proposalId']);
                              }}
                              disabled={isExecutable}
                              icon={<SignIcon className="text-xl" />}></Button>
                          </Tooltip>
                        </div>

                        <div className="ml-auto n-poolBalance">
                          <Balance address="" balance={data['value']} dollarMultiplier={price} />
                        </div>
                      </div>
                    }
                    key={index}
                    className="w-full"
                    extra={ExecuteButton(isExecutable, data['proposalId'])}>
                    <p>
                      <Descriptions
                        title="Proposal details"
                        bordered
                        layout="vertical"
                        column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}>
                        <Descriptions.Item label="Event Name">{data.eventName}</Descriptions.Item>
                        <Descriptions.Item label="Function signature">{functionSignature}</Descriptions.Item>
                        <Descriptions.Item label="Sign hash">{data?.hash.slice(0, 6)}</Descriptions.Item>
                        <Descriptions.Item label="From">
                          <p className="n-addressAdjustement">
                            <Address address={data['from']} />
                          </p>
                        </Descriptions.Item>
                        <Descriptions.Item label="To">
                          <p className="n-addressAdjustement">
                            <Address address={data['to']} />
                          </p>
                        </Descriptions.Item>
                        <Descriptions.Item label="Signature required">{data.signatureRequired}</Descriptions.Item>
                        <Descriptions.Item label="Owners">
                          <p>
                            {data.signers.map((address, index) => {
                              return (
                                <p key={address} className="n-addressAdjustement">
                                  <Address address={transcactions[0]['contractAddress']} />
                                </p>
                              );
                            })}
                          </p>
                        </Descriptions.Item>
                        <Descriptions.Item label="Signed owners">
                          <p>
                            {data.signedOwners?.map((address, index) => {
                              return (
                                <p key={address} className="n-addressAdjustement">
                                  <Address address={transcactions[0]['contractAddress']} />
                                </p>
                              );
                            })}
                          </p>
                        </Descriptions.Item>

                        <Descriptions.Item label="Value">
                          <p className="n-poolBalance">
                            <Balance address="" balance={data['value']} dollarMultiplier={price} />
                          </p>
                        </Descriptions.Item>
                      </Descriptions>
                    </p>
                  </Panel>
                );
              })}
            </Collapse>
          </Card>
        </div>
      )}

      {/* empty */}

      <div className={transcactions.length === 0 ? 'm-20' : 'hidden'}>
        <Empty description={'No transcactions'} />
      </div>
    </div>
  );
};
export default TranscactionPool;
