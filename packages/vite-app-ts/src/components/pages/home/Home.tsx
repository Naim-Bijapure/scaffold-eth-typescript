import { WalletTwoTone as CreateWalletIcon, SwapOutlined as ProposeIcon } from '@ant-design/icons';
import { parseEther } from '@ethersproject/units';
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
import { asyncDelay } from '~~/models/constants/constants';

import { NETWORKS, TNetworkNames } from '~~/models/constants/networks';
import { TARGET_NETWORK_INFO } from '~~/config/appConfig';

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

  console.log('owners: ', owners);

  const notifyTx: any = transactor(ethComponentsSettings, ethersContext.signer);

  function onTabChange(key: any): void {
    setCurrentTab(key);
  }
  function onWalletSelect(selectedWalletAddr: any): any {
    setCurrentSelectedWallet(selectedWalletAddr);
  }

  const onWalletCreate = (addressList: Array<string>, signatureCount: number, fundAmount: string = '0'): void => {
    const value = parseEther(parseFloat(fundAmount).toFixed(12));

    const createMultiSigTx = multiSigFactory?.create(
      ethersContext.chainId as BigNumberish,
      addressList,
      signatureCount,
      { value: value }
    );

    notifyTx(createMultiSigTx, (data: any) => {
      // setOpenModal(false);
      setOpenModal({ ...openModal, walletModal: false });
    });
  };

  const onProposalCreate = async (): Promise<void> => {
    notification['success']({ message: 'propsal created successfully' });
    setOpenModal({ ...openModal, proposeModal: false });
    setCurrentTab('0');
    await asyncDelay(100);
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

  // assign current created wallet addresses
  useEffect(() => {
    const multiSigContracts = owners
      .filter((obj) => (obj.args[1] as any).includes(ethersContext.account))
      .map((obj) => obj.args[0]);

    setMultiSigContracts([...new Set([...multiSigContracts])]);
    setCurrentSelectedWallet(multiSigContracts.length > 0 ? multiSigContracts[multiSigContracts.length - 1] : '');
  }, [owners.length, ethersContext.account, owners]);

  // assign contract wallet addresses
  useEffect(() => {
    const lastOwner = owners.length === 0 ? owners : [owners[owners.length - 1]];
    const walletOwners: any = owners
      .filter((obj) => obj.args[0] === currentSelectedWallet)
      .map((obj) => obj.args[1])
      .flat();

    let signatureCount: any = owners
      .filter((obj) => obj.args[0] === currentSelectedWallet)
      .map((obj) => obj.args[2])
      .flat();
    signatureCount = currentSelectedWallet.length > 0 ? signatureCount[0]?.toNumber() : 0;

    setSignatureCount(signatureCount);
    setWalletOwners([...new Set([...walletOwners])]);
    setCurrentTab('1');
  }, [currentSelectedWallet]);

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

  // const cachedNetwork: TNetworkNames = window.localStorage.getItem('network') as TNetworkNames;
  const targetNetwork = TARGET_NETWORK_INFO;

  const options = [];
  for (const id in NETWORKS) {
    options.push(
      <Select.Option key={id} value={NETWORKS[id as TNetworkNames].name as TNetworkNames}>
        <span style={{ color: NETWORKS[id as TNetworkNames].color }}>{NETWORKS[id as TNetworkNames].name}</span>
      </Select.Option>
    );
  }

  // const networkSelect = (
  // );

  return (
    <div className="flex flex-col items-start m-5" key={ethersContext.account}>
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

        {/* select network */}
        <div className="w-[10%] mx-2 ">
          <Select
            defaultValue={targetNetwork.name as TNetworkNames}
            style={{ textAlign: 'left', width: 170 }}
            onChange={(value: TNetworkNames): void => {
              if (targetNetwork.chainId !== NETWORKS[value].chainId) {
                window.localStorage.setItem('network', value);
                setTimeout(() => {
                  window.location.reload();
                }, 1);
              }
            }}>
            {options}
          </Select>
        </div>

        {/* create add proposal */}

        <div className="mx-1 ml-auto">
          <div>
            <Button
              onClick={(): void => onOpenModal('proposeModal')}
              className="flex items-center h-8"
              icon={<ProposeIcon style={{ color: '#40A9FF' }} className="text-2xl" />}
              disabled={currentSelectedWallet.length === 0}>
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
        price={price}
        key={ethersContext.account}
        currentAccount={ethersContext.account as string}
      />

      <ProposeModal
        openModal={openModal['proposeModal']}
        onClose={(): void => onCloseModal('proposeModal')}
        onSubmit={onProposalCreate}
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
