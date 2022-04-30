import { WalletTwoTone as CreateWalletIcon, SwapOutlined as ProposeIcon } from '@ant-design/icons';
import { Tabs, Select, Button, notification } from 'antd';
import { transactor } from 'eth-components/functions';
import { IEthComponentsSettings } from 'eth-components/models';
import { useEventListener } from 'eth-hooks';
import { useEthersContext } from 'eth-hooks/context';
import { BigNumberish, ContractInterface, ethers } from 'ethers';
import React, { useEffect, useState } from 'react';

import ProposeModal from './components/ProposeModal';
import TranscactionPool from './components/TranscactionPool';
import WalletCreateModal from './components/WalletCreateModal';
import YourWallet from './components/YourWallet';

import { IScaffoldAppProviders } from '~~/components/main/hooks/useScaffoldAppProviders';
import { useAppContracts } from '~~/config/contractContext';
import { MetaMultiSigWallet, OwnerEvent } from '~~/generated/contract-types/MetaMultiSigWallet';

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

interface IHome {
  price: number;
  scaffoldAppProviders: IScaffoldAppProviders;
}
export const Home: React.FC<IHome> = ({ price, scaffoldAppProviders }) => {
  // const [openModal, setOpenModal] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<{ walletModal: boolean; proposeModal: boolean }>({
    walletModal: false,
    proposeModal: false,
  });
  const [currentSelectedWallet, setCurrentSelectedWallet] = useState<string>('');
  const [currentContractWallet, setCurrentContractWallet] = useState<MetaMultiSigWallet>();
  const [multiSigContracts, setMultiSigContracts] = useState<Array<string>>([]);
  const [walletOwners, setWalletOwners] = useState<Array<string>>([]);
  const [signatureCount, setSignatureCount] = useState<number>();
  const [currentTab, setCurrentTab] = useState<string>('0');

  const ethersContext = useEthersContext();
  const yourContract = useAppContracts('YourContract', ethersContext.chainId);
  const multiSigFactory = useAppContracts('MultiSigFactory', ethersContext.chainId);
  const metaMultiSigWallet = useAppContracts('MetaMultiSigWallet', ethersContext.chainId);

  // const [owners] = useEventListener<OwnerEvent>(multiSigFactory, multiSigFactory?.filters.Owners(), 0);
  const [owners] = useEventListener<OwnerEvent>(multiSigFactory, 'Owners', 0);
  // const [debugLog] = useEventListener<DebugLogEvent>(multiSigFactory, 'DebugLog', 0);
  // console.log('Home=> debugLog: ', debugLog[0]?.args);
  console.log('owners: ', owners);

  const notifyTx: any = transactor(ethComponentsSettings, ethersContext.signer);

  function onTabChange(key: any): void {
    setCurrentTab(key);
  }
  function onWalletSelect(selectedWalletAddr: any): any {
    setCurrentSelectedWallet(selectedWalletAddr);
  }

  const onWalletCreate = (addressList: Array<string>, signatureCount: number): void => {
    const createMultiSigTx = multiSigFactory?.create(
      ethersContext.chainId as BigNumberish,
      addressList,
      signatureCount
    );

    notifyTx(createMultiSigTx, (data: any) => {
      // setOpenModal(false);
      setOpenModal({ ...openModal, walletModal: false });
    });
  };

  const onProposalCreaet = (): void => {
    notification['success']({ message: 'propsale created successfully' });
    setOpenModal({ ...openModal, proposeModal: false });
    setCurrentTab('2');
  };

  const onOpenModal = (modalType: 'walletModal' | 'proposeModal'): void => {
    // setOpenModal(true);
    setOpenModal({ ...openModal, [modalType]: true });
  };

  const onCloseModal = (modalType: 'walletModal' | 'proposeModal'): void => {
    // setOpenModal(false);
    setOpenModal({ ...openModal, [modalType]: false });
  };
  // assign contract addresses
  useEffect(() => {
    const multiSigContracts = owners
      .filter((obj) => obj.args[1].includes(ethersContext.account))
      .map((obj) => obj.args[0]);

    setMultiSigContracts(multiSigContracts);
    setCurrentSelectedWallet(multiSigContracts.length > 0 ? multiSigContracts[multiSigContracts.length - 1] : '');
  }, [owners.length, ethersContext.account, owners]);

  // assign contract wallet addresses
  useEffect(() => {
    const walletOwners: any = owners
      .filter((obj) => obj.args[0] === currentSelectedWallet)
      .map((obj) => obj.args[1])
      .flat();

    let signatureCount: any = owners
      .filter((obj) => obj.args[0] === currentSelectedWallet)
      .map((obj) => obj.args[2])
      .flat();
    signatureCount = currentSelectedWallet.length > 0 ? signatureCount[0].toNumber() : 0;

    setSignatureCount(signatureCount);
    setWalletOwners(walletOwners);
    setCurrentTab('1');
  }, [currentSelectedWallet, owners]);

  // const sleep = async (duration: number): Promise<boolean> =>
  //   new Promise((resolve, reject) => setTimeout(() => resolve(true), duration));

  // created a contract instance from current selected contract wallet
  const loadContract = async (): Promise<void> => {
    // await sleep(1000);
    const currentContractWallet: MetaMultiSigWallet = new ethers.Contract(
      currentSelectedWallet,
      metaMultiSigWallet?.interface as ContractInterface,
      ethersContext.signer
    ) as MetaMultiSigWallet;

    setCurrentContractWallet(currentContractWallet);
  };

  useEffect((): void => {
    void loadContract();
  }, [currentSelectedWallet]);

  return (
    <div className="flex flex-col items-start m-5">
      {/* action block */}
      <div className="flex justify-between w-full m-1">
        {/* select */}
        <div className="w-[30%] ">
          <Select
            placeholder="select wallet "
            className="w-full"
            value={currentSelectedWallet}
            key={ethersContext.account}
            onChange={onWalletSelect}>
            {multiSigContracts.map((address) => {
              return (
                <Option key={address} value={address}>
                  {address}
                </Option>
              );
            })}
          </Select>
        </div>

        <div>
          <Button
            onClick={async (): Promise<void> => {
              const isOwner = await currentContractWallet?.isOwner('0xbA4C9A16f4030c2455316Bf2F169bB5b185cCAa4');
              console.log('isOwner: ', isOwner);
            }}
            className="flex items-center h-8"
            // icon={<ProposeIcon style={{ color: '#40A9FF' }} className="text-2xl" />}
          >
            Debug
          </Button>
        </div>

        {/* create add proposal */}

        <div className="mx-1 ml-auto">
          <div>
            <Button
              onClick={(): void => onOpenModal('proposeModal')}
              className="flex items-center h-8"
              icon={<ProposeIcon style={{ color: '#40A9FF' }} className="text-2xl" />}>
              Add Proposal
            </Button>
          </div>
        </div>

        {/* create wallet */}
        <div className="mx-1">
          <div>
            <Button
              onClick={(): void => onOpenModal('walletModal')}
              className="flex items-center h-8"
              icon={<CreateWalletIcon className="text-2xl" />}>
              Create new wallet
            </Button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="w-full h-full m-1 border-t-2 border-blue-50">
        <Tabs defaultActiveKey="1" activeKey={currentTab} onChange={onTabChange} tabPosition="left" size="large">
          <TabPane tab="Your MultiSig" key="1">
            <YourWallet
              key={currentTab}
              signatureCount={signatureCount as number}
              walletOwners={walletOwners}
              walletAddress={currentSelectedWallet}
              price={price}
              walletFactory={metaMultiSigWallet as MetaMultiSigWallet}
              provider={ethersContext.provider}
              walletContract={currentContractWallet as MetaMultiSigWallet}
              etherContext={ethersContext}
            />
          </TabPane>
          {/* <TabPane tab="Propose Transcation" key="2">
            <ProposeTranscaction
              walletContract={currentContractWallet as MetaMultiSigWallet}
              walletAddress={currentSelectedWallet}
              walletFactory={metaMultiSigWallet as MetaMultiSigWallet}
            />
          </TabPane> */}
          <TabPane tab="Pool" key="2">
            <TranscactionPool
              key={currentTab}
              provider={ethersContext.provider}
              walletContract={currentContractWallet as MetaMultiSigWallet}
              walletAddress={currentSelectedWallet}
              walletFactory={metaMultiSigWallet as MetaMultiSigWallet}
              price={price}
              etherContext={ethersContext}
              notifyTx={notifyTx}
              isExecutedPool={false}
            />
          </TabPane>
        </Tabs>
      </div>
      <WalletCreateModal
        openModal={openModal['walletModal']}
        onClose={(): void => onCloseModal('walletModal')}
        onSubmit={onWalletCreate}
        provider={ethersContext.provider}
      />

      <ProposeModal
        openModal={openModal['proposeModal']}
        onClose={(): void => onCloseModal('proposeModal')}
        onSubmit={onProposalCreaet}
        provider={ethersContext.provider}
        walletContract={currentContractWallet as MetaMultiSigWallet}
        owners={walletOwners}
        walletAddress={currentSelectedWallet}
        walletFactory={metaMultiSigWallet as MetaMultiSigWallet}
        price={price}
      />
    </div>
  );
};
