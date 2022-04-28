import { Button, Tabs, Select } from 'antd';
import { transactor } from 'eth-components/functions';
import { IEthComponentsSettings } from 'eth-components/models';
import { useEventListener } from 'eth-hooks';
import { useEthersContext } from 'eth-hooks/context';
import { BigNumberish, ContractInterface, ethers } from 'ethers';
import React, { useEffect, useState } from 'react';

import ProposeTranscaction from './components/ProposeTranscaction';
import WalletCreateModal from './components/WalletCreateModal';
import YourWallet from './components/YourWallet';

import { IScaffoldAppProviders } from '~~/components/main/hooks/useScaffoldAppProviders';
import { useAppContracts } from '~~/config/contractContext';
import { MetaMultiSigWallet, OwnerEvent } from '~~/generated/contract-types/MetaMultiSigWallet';
import { DebugLogEvent } from '~~/generated/contract-types/MultiSigFactory';

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
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [currentSelectedWallet, setCurrentSelectedWallet] = useState<string>('');
  const [currentContractWallet, setCurrentContractWallet] = useState<MetaMultiSigWallet>();
  const [multiSigContracts, setMultiSigContracts] = useState<Array<string>>([]);
  const [walletOwners, setWalletOwners] = useState<Array<string>>([]);
  const [signatureCount, setSignatureCount] = useState<number>();

  const ethersContext = useEthersContext();
  const yourContract = useAppContracts('YourContract', ethersContext.chainId);
  const multiSigFactory = useAppContracts('MultiSigFactory', ethersContext.chainId);
  const metaMultiSigWallet = useAppContracts('MetaMultiSigWallet', ethersContext.chainId);

  const [owners] = useEventListener<OwnerEvent>(multiSigFactory, multiSigFactory?.filters.Owners(), 0);
  // const [debugLog] = useEventListener<DebugLogEvent>(multiSigFactory, 'DebugLog', 0);
  // console.log('Home=> debugLog: ', debugLog[0]?.args);
  console.log('owners: ', owners);

  const notifyTx: any = transactor(ethComponentsSettings, ethersContext.signer);

  function onTabChange(key: any): void {}
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
      setOpenModal(false);
    });
  };

  const onOpenModal = (): any => {
    setOpenModal(true);
  };

  const onCloseModal = (): any => {
    setOpenModal(false);
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
  }, [currentSelectedWallet, owners]);

  // const sleep = async (duration: number): Promise<boolean> =>
  //   new Promise((resolve, reject) => setTimeout(() => resolve(true), duration));

  // created a contract instance from current selected contract wallet
  const loadContract = async (): Promise<void> => {
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
        <div className="w-96">
          <Select
            placeholder="select wallet "
            className="w-full"
            value={currentSelectedWallet}
            key={ethersContext.account}
            onChange={onWalletSelect}>
            {multiSigContracts.map((address) => {
              return (
                <>
                  <Option key={address} value={address}>
                    {address}
                  </Option>
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
        <Tabs defaultActiveKey="2" onChange={onTabChange} tabPosition="left" size="large">
          <TabPane tab="Your MultiSig" key="1">
            <YourWallet
              signatureCount={signatureCount as number}
              walletOwners={walletOwners}
              walletAddress={currentSelectedWallet}
              price={price}
            />
          </TabPane>
          <TabPane tab="Propose Transcation" key="2">
            <ProposeTranscaction
              walletContract={currentContractWallet as MetaMultiSigWallet}
              walletAddress={currentSelectedWallet}
              walletFactory={metaMultiSigWallet as MetaMultiSigWallet}
            />
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
