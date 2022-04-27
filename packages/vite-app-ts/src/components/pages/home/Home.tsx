import { Button, Tabs, Select } from 'antd';
import { transactor } from 'eth-components/functions';
import { IEthComponentsSettings } from 'eth-components/models';
import { useEventListener } from 'eth-hooks';
import { useEthersContext } from 'eth-hooks/context';
import { BigNumberish } from 'ethers';
import React, { useState } from 'react';

import WalletCreateModal from './components/WalletCreateModal';

import { useAppContracts } from '~~/config/contractContext';
import { OwnerEvent } from '~~/generated/contract-types/MetaMultiSigWallet';

const BLOCKNATIVE_DAPPID = import.meta.env.VITE_KEY_BLOCKNATIVE_DAPPID;
// create eth components context for options and API keys
const ethComponentsSettings: IEthComponentsSettings = {
  apiKeys: {
    BlocknativeDappId: BLOCKNATIVE_DAPPID,
  },
};
const { TabPane } = Tabs;
const { Option } = Select;

// create modal

export const Home: React.FC<any> = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);

  const ethersContext = useEthersContext();
  const yourContract = useAppContracts('YourContract', ethersContext.chainId);
  const multiSigFactory = useAppContracts('MultiSigFactory', ethersContext.chainId);

  const [owners] = useEventListener<OwnerEvent>(multiSigFactory, multiSigFactory?.filters.Owners(), 0);

  const mulsigContracts = owners.length > 0 ? owners.map((obj) => obj.args[0]) : [];

  const notifyTx: any = transactor(ethComponentsSettings, ethersContext.signer);

  function onTabChange(key) {}
  function onWalletSelect(value) {}

  const onWalletCreate = async (addressList: Array<string>, signatureCount: number): Promise<any> => {
    const createMultiSigTx = multiSigFactory?.create(
      ethersContext.chainId as BigNumberish,
      addressList,
      signatureCount
    );

    notifyTx(createMultiSigTx, (data: any) => {
      setOpenModal(false);
    });
  };

  const onOpenModal = async (): Promise<any> => {
    setOpenModal(true);
  };

  const onCloseModal = async (): Promise<any> => {
    setOpenModal(false);
  };

  return (
    <div className="flex flex-col items-start m-5">
      {/* action block */}
      <div className="flex justify-between w-full m-1">
        {/* select */}
        <div className="w-96">
          <Select placeholder="select wallet " className="w-full" onChange={onWalletSelect}>
            {mulsigContracts.map((address) => {
              return (
                <>
                  <Option value={address}>{address}</Option>
                </>
              );
            })}
          </Select>
        </div>

        {/* create */}
        <div>
          <Button type="primary" onClick={onOpenModal}>
            Create new wallet
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="w-full h-full m-1 border-t-2 border-blue-50">
        <Tabs defaultActiveKey="1" onChange={onTabChange} tabPosition="left" size="large">
          <TabPane tab="Your MultiSig" key="1">
            Content of Tab Pane 1
          </TabPane>
          <TabPane tab="Propose Transcation" key="2">
            Content of Tab Pane 2
          </TabPane>
          <TabPane tab="Pool" key="3">
            Content of Tab Pane 3
          </TabPane>
        </Tabs>
      </div>
      <WalletCreateModal
        openModal={openModal}
        onClose={onCloseModal}
        onSubmit={onWalletCreate}
        provider={ethersContext.provider}
      />
    </div>
  );
};
