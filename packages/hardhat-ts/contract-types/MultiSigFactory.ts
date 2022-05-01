/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PayableOverrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import { FunctionFragment, Result, EventFragment } from "@ethersproject/abi";
import { Listener, Provider } from "@ethersproject/providers";
import { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";

export interface MultiSigFactoryInterface extends utils.Interface {
  contractName: "MultiSigFactory";
  functions: {
    "create(uint256,address[],uint256)": FunctionFragment;
    "emitOwners(address,address[],uint256)": FunctionFragment;
    "getMultiSig(uint256)": FunctionFragment;
    "multiSigs(uint256)": FunctionFragment;
    "numberOfMultiSigs()": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "create",
    values: [BigNumberish, string[], BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "emitOwners",
    values: [string, string[], BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getMultiSig",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "multiSigs",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "numberOfMultiSigs",
    values?: undefined
  ): string;

  decodeFunctionResult(functionFragment: "create", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "emitOwners", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getMultiSig",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "multiSigs", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "numberOfMultiSigs",
    data: BytesLike
  ): Result;

  events: {
    "Create(uint256,address,address,address[],uint256)": EventFragment;
    "Owners(address,address[],uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "Create"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Owners"): EventFragment;
}

export type CreateEvent = TypedEvent<
  [BigNumber, string, string, string[], BigNumber],
  {
    contractId: BigNumber;
    contractAddress: string;
    creator: string;
    owners: string[];
    signaturesRequired: BigNumber;
  }
>;

export type CreateEventFilter = TypedEventFilter<CreateEvent>;

export type OwnersEvent = TypedEvent<
  [string, string[], BigNumber],
  { contractAddress: string; owners: string[]; signaturesRequired: BigNumber }
>;

export type OwnersEventFilter = TypedEventFilter<OwnersEvent>;

export interface MultiSigFactory extends BaseContract {
  contractName: "MultiSigFactory";
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: MultiSigFactoryInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    create(
      _chainId: BigNumberish,
      _owners: string[],
      _signaturesRequired: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    emitOwners(
      _contractAddress: string,
      _owners: string[],
      _signaturesRequired: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    getMultiSig(
      _index: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [string, BigNumber, BigNumber] & {
        multiSigAddress: string;
        signaturesRequired: BigNumber;
        balance: BigNumber;
      }
    >;

    multiSigs(arg0: BigNumberish, overrides?: CallOverrides): Promise<[string]>;

    numberOfMultiSigs(overrides?: CallOverrides): Promise<[BigNumber]>;
  };

  create(
    _chainId: BigNumberish,
    _owners: string[],
    _signaturesRequired: BigNumberish,
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  emitOwners(
    _contractAddress: string,
    _owners: string[],
    _signaturesRequired: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  getMultiSig(
    _index: BigNumberish,
    overrides?: CallOverrides
  ): Promise<
    [string, BigNumber, BigNumber] & {
      multiSigAddress: string;
      signaturesRequired: BigNumber;
      balance: BigNumber;
    }
  >;

  multiSigs(arg0: BigNumberish, overrides?: CallOverrides): Promise<string>;

  numberOfMultiSigs(overrides?: CallOverrides): Promise<BigNumber>;

  callStatic: {
    create(
      _chainId: BigNumberish,
      _owners: string[],
      _signaturesRequired: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    emitOwners(
      _contractAddress: string,
      _owners: string[],
      _signaturesRequired: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    getMultiSig(
      _index: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [string, BigNumber, BigNumber] & {
        multiSigAddress: string;
        signaturesRequired: BigNumber;
        balance: BigNumber;
      }
    >;

    multiSigs(arg0: BigNumberish, overrides?: CallOverrides): Promise<string>;

    numberOfMultiSigs(overrides?: CallOverrides): Promise<BigNumber>;
  };

  filters: {
    "Create(uint256,address,address,address[],uint256)"(
      contractId?: BigNumberish | null,
      contractAddress?: string | null,
      creator?: null,
      owners?: null,
      signaturesRequired?: null
    ): CreateEventFilter;
    Create(
      contractId?: BigNumberish | null,
      contractAddress?: string | null,
      creator?: null,
      owners?: null,
      signaturesRequired?: null
    ): CreateEventFilter;

    "Owners(address,address[],uint256)"(
      contractAddress?: string | null,
      owners?: null,
      signaturesRequired?: BigNumberish | null
    ): OwnersEventFilter;
    Owners(
      contractAddress?: string | null,
      owners?: null,
      signaturesRequired?: BigNumberish | null
    ): OwnersEventFilter;
  };

  estimateGas: {
    create(
      _chainId: BigNumberish,
      _owners: string[],
      _signaturesRequired: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    emitOwners(
      _contractAddress: string,
      _owners: string[],
      _signaturesRequired: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    getMultiSig(
      _index: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    multiSigs(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    numberOfMultiSigs(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    create(
      _chainId: BigNumberish,
      _owners: string[],
      _signaturesRequired: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    emitOwners(
      _contractAddress: string,
      _owners: string[],
      _signaturesRequired: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    getMultiSig(
      _index: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    multiSigs(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    numberOfMultiSigs(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}