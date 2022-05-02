import { parseEther } from '@ethersproject/units';
import { Button, Input, InputNumber, Modal, Select } from 'antd';
import { AddressInput, EtherInput } from 'eth-components/ant';
import { useEthersContext } from 'eth-hooks/context';
import React, { useEffect, useState } from 'react';

import API from '~~/config/API';
import { MetaMultiSigWallet } from '~~/generated/contract-types';

const { Option } = Select;

interface IProposeTranscaction {
  walletAddress: string;
  walletContract: MetaMultiSigWallet;
  walletFactory: MetaMultiSigWallet;
  openModal: boolean;
  onSubmit: () => void;
  onClose: (arg: any) => void;
  provider: any;
  price: any;
  owners: Array<string>;
}
const ProposeModal: React.FC<IProposeTranscaction> = ({
  walletAddress,
  walletContract,
  walletFactory,
  openModal,
  provider,
  price,
  owners,
  onClose,
  onSubmit,
}) => {
  const ethersContext = useEthersContext();
  const [selectedAction, setSelectedAction] = useState<string>('');
  const [toAddress, setToAddress] = useState<string>('');
  const [currentCallData, setCurrentCallData] = useState<any>(null);
  const [value, setValue] = useState<string>('');
  const [newSignatureCount, setNewSignatureCount] = useState<number>(0);
  const [toggleLoading, setToggleLoading] = useState<boolean>(false);

  const onActionSelect = (value: string): void => {
    setSelectedAction(value);
    setValue('');
    setToAddress('');
    setCurrentCallData(null);
    setNewSignatureCount(0);
  };

  const onProposalCreate = async (): Promise<void> => {
    setToggleLoading(true);
    const etherValue = value ? parseEther(value) : 0;

    const nonce = await walletContract.nonce();
    const signatureRequired = await walletContract.signaturesRequired();

    const walletAddress = walletContract.address;
    const date = new Date();

    const currentToAddress = currentCallData === '0x' ? toAddress : walletAddress;

    const hash = await walletContract.getTransactionHash(
      nonce.toNumber(),
      // ethersContext.account as string,
      currentToAddress,
      etherValue.toString(),
      currentCallData
    );

    const reqData = {
      proposalId: date.getMilliseconds(),
      nonce: nonce.toNumber(),
      eventName: selectedAction,
      contractAddress: walletAddress,
      from: ethersContext.account,
      to: currentToAddress,
      callData: currentCallData,
      value: etherValue.toString(),
      newSignatureCount,
      hash,
      signatureRequired: signatureRequired.toNumber(),
      signatures: [],
      signers: owners,
      isExecuted: false,
    };

    const oldData = await (await API.get(`/${walletAddress}`)).data;
    const oldTranscactions = oldData['transcactions'];

    const reqTx = { transcactions: [...oldTranscactions, reqData] };

    const res = await API.post(`/add`, reqTx);
    console.log('res: ', res.data);
    onSubmit();

    setToggleLoading(false);
  };

  useEffect(() => {
    if (selectedAction === 'transferFunds') {
      const callData = '0x';
      setCurrentCallData(callData);
    }

    if (['addSigner', 'removeSigner'].includes(selectedAction)) {
      if (Boolean(toAddress) && newSignatureCount > 0) {
        // @ts-ignore
        const callData = walletFactory?.interface.encodeFunctionData(selectedAction, [toAddress, newSignatureCount]);
        setCurrentCallData(callData);
      }
    }
  }, [selectedAction, newSignatureCount]);

  return (
    <Modal
      title="Create new proposal"
      visible={openModal}
      // onOk={onSubmit}
      onCancel={onClose}
      footer={[
        <Button key="back" onClick={onClose}>
          Return
        </Button>,
        <Button
          key={selectedAction}
          type="primary"
          onClick={async (): Promise<void> => onProposalCreate()}
          disabled={toAddress.length === 0}
          loading={toggleLoading}>
          Submit
        </Button>,
      ]}>
      {/* <Button onClick={onTest}>Test</Button> */}
      <div className="flex flex-col  items-center w-full">
        {/* select action */}
        <div className="m-2 w-[70%]">
          <Select placeholder="select action" className="w-full" onChange={onActionSelect}>
            <Option value="transferFunds">Transfer funds</Option>
            <Option value="addSigner">Add Signer</Option>
            <Option value="removeSigner">Remove Signer</Option>
            <Option value="customCall">Custom Call Data</Option>
          </Select>
        </div>

        {/* add address */}
        <div className="m-2 w-[70%]" key={selectedAction}>
          <span className="text-gray-400">
            Enter {selectedAction === 'transferFunds' ? 'receipent' : 'owner'} address
          </span>
          <AddressInput
            key={selectedAction}
            address={toAddress}
            ensProvider={provider}
            placeholder={'Enter  address'}
            onChange={setToAddress}
          />

          {Boolean(toAddress) && toAddress?.includes('0x') === false && toAddress.length < 42 && (
            <div className="my-1 text-red-600">invalid address</div>
          )}
        </div>

        <div className={`m-2 w-[70%] ${['customCall'].includes(selectedAction) ? '' : 'hidden'}`}>
          <Input placeholder="Custom call data" onChange={(e) => setCurrentCallData(e.target.value)} />
          {Boolean(currentCallData) && currentCallData?.includes('0x') === false && (
            <div className="my-1 text-red-600">custom call data is invalid</div>
          )}
        </div>

        {/* eth input  */}
        <div className={`m-2 w-[70%] ${['transferFunds', 'customCall'].includes(selectedAction) ? '' : 'hidden'}`}>
          <EtherInput
            price={price}
            key={selectedAction}
            value={value}
            placeholder="Enter amount"
            onChange={(value: string): void => setValue(Number(value).toFixed(5))}
          />
        </div>

        <div className={`m-2 w-[70%] ${['addSigner', 'removeSigner'].includes(selectedAction) ? '' : 'hidden'}`}>
          <InputNumber
            style={{ width: '100%' }}
            placeholder="New # of signer required"
            min={1}
            onChange={setNewSignatureCount}
          />
        </div>
      </div>
    </Modal>
  );
};
export default ProposeModal;
