import { DeleteFilled, PlusCircleFilled } from '@ant-design/icons';
import { Modal, InputNumber, Button } from 'antd';
import { Address, AddressInput } from 'eth-components/ant';
import React, { useEffect, useState } from 'react';

interface IWalletCreateModal {
  openModal: boolean;
  onSubmit: (addressList: Array<string>, signatureCount: number) => void;
  onClose: (arg: any) => void;
  provider: any;
}
const WalletCreateModal: React.FC<IWalletCreateModal> = ({ openModal, onSubmit, onClose, provider }) => {
  const [currentAddress, setAddress] = useState<string>('');
  const [addressList, setAddressList] = useState<Array<string>>([]);
  const [signatureCount, setSignatureCount] = useState<number | null>(null);

  const onAddAddress = (): any => {
    if (currentAddress.length >= 42) {
      const list = new Set([...addressList, currentAddress]);
      setAddressList([...list]);
      setAddress('');
    }
  };

  const onRemoveAddress = (address: string): void => {
    const list = addressList.filter((value) => value !== address);
    setAddressList([...list]);
  };
  useEffect(() => {
    if (openModal === false) {
      setAddressList([]);
      setAddress('');
      setSignatureCount(null);
    }
  }, [openModal]);

  return (
    <div>
      <Modal
        title="Create new wallet"
        visible={openModal}
        // onOk={onSubmit}
        onCancel={onClose}
        footer={[
          <Button key="back" onClick={onClose}>
            Return
          </Button>,
          <Button
            key={'submit'}
            type="primary"
            onClick={(): void => onSubmit(addressList, signatureCount as number)}
            disabled={addressList.length === 0 && signatureCount === null}>
            Submit
          </Button>,
        ]}>
        {/* action header */}
        <div className="flex items-center justify-between w-full">
          <div className="w-full m-1">
            <AddressInput
              placeholder="Enter unique owner address"
              address={currentAddress}
              onChange={setAddress}
              ensProvider={provider}
            />
          </div>
          <div className="m-1">
            <PlusCircleFilled className="text-xl" onClick={onAddAddress} style={{ color: 'Green' }}>
              Add{' '}
            </PlusCircleFilled>
          </div>
        </div>

        {/* display address list */}
        <div className="border ">
          {addressList.map((address: string) => {
            return (
              <div key={address} className="flex items-center justify-center">
                <Address address={address} />
                <DeleteFilled
                  className="text-xl"
                  color="red"
                  style={{ color: 'red' }}
                  onClick={(): void => onRemoveAddress(address)}
                />
              </div>
            );
          })}
        </div>
        <div className="w-full m-1">
          <InputNumber style={{ width: '200px' }} placeholder="signature count" min={1} onChange={setSignatureCount} />
        </div>
      </Modal>
    </div>
  );
};
export default WalletCreateModal;
