/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  MultiSigFactory,
  MultiSigFactoryInterface,
} from "../MultiSigFactory";

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "contractId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "contractAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "creator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address[]",
        name: "owners",
        type: "address[]",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "signaturesRequired",
        type: "uint256",
      },
    ],
    name: "Create",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "contractAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address[]",
        name: "owners",
        type: "address[]",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "signaturesRequired",
        type: "uint256",
      },
    ],
    name: "Owners",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_chainId",
        type: "uint256",
      },
      {
        internalType: "address[]",
        name: "_owners",
        type: "address[]",
      },
      {
        internalType: "uint256",
        name: "_signaturesRequired",
        type: "uint256",
      },
    ],
    name: "create",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_contractAddress",
        type: "address",
      },
      {
        internalType: "address[]",
        name: "_owners",
        type: "address[]",
      },
      {
        internalType: "uint256",
        name: "_signaturesRequired",
        type: "uint256",
      },
    ],
    name: "emitOwners",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_index",
        type: "uint256",
      },
    ],
    name: "getMultiSig",
    outputs: [
      {
        internalType: "address",
        name: "multiSigAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "signaturesRequired",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "balance",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "multiSigs",
    outputs: [
      {
        internalType: "contract MetaMultiSigWallet",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "numberOfMultiSigs",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b506125be806100206000396000f3fe608060405260043610620000505760003560e01c80632f1d8a2314620000555780639567e7ed1462000079578063bedf429414620000c4578063c67fdb9414620000eb578063f931486b1462000129575b600080fd5b3480156200006257600080fd5b506000546040519081526020015b60405180910390f35b3480156200008657600080fd5b506200009e6200009836600462000566565b62000140565b604080516001600160a01b03909416845260208401929092529082015260600162000070565b348015620000d157600080fd5b50620000e9620000e336600462000509565b6200020a565b005b348015620000f857600080fd5b50620001106200010a36600462000566565b620002c3565b6040516001600160a01b03909116815260200162000070565b620000e96200013a3660046200059a565b620002ee565b600080600080600085815481106200015c576200015c620006a3565b9060005260206000200160009054906101000a90046001600160a01b0316905080816001600160a01b031663ce757d296040518163ffffffff1660e01b815260040160206040518083038186803b158015620001b757600080fd5b505afa158015620001cc573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190620001f2919062000580565b90945092506001600160a01b03163190509193909250565b3360009081526001602052604090205460ff166200027a5760405162461bcd60e51b815260206004820152602360248201527f63616c6c6572206e6f74207265676973746572656420746f20757365206c6f6760448201526233b2b960e91b606482015260840160405180910390fd5b80836001600160a01b03167f767d0acba39e4cf96349b168ed9d32211fb4940be0f3549d31154941785c9b6a84604051620002b691906200064b565b60405180910390a3505050565b60008181548110620002d457600080fd5b6000918252602090912001546001600160a01b0316905081565b6000805490506000348585853060405162000309906200042a565b62000318949392919062000667565b6040518091039082f090508015801562000336573d6000803e3d6000fd5b5060008054600180820183557f290decd9548b62a8d60345a988386fc84ba6bc95484008f6362f93160ef3e56390910180546001600160a01b0319166001600160a01b0385169081179091558083526020829052604092839020805460ff191690921790915590519192509083907f8e7afa2cfd444b14c15f2c5a27041b913dfe206302b391e01c241cb58ade033790620003d79033908990899062000615565b60405180910390a382816001600160a01b03167f767d0acba39e4cf96349b168ed9d32211fb4940be0f3549d31154941785c9b6a866040516200041b91906200064b565b60405180910390a35050505050565b611eb980620006d083390190565b80356001600160a01b03811681146200045057600080fd5b919050565b600082601f8301126200046757600080fd5b8135602067ffffffffffffffff80831115620004875762000487620006b9565b8260051b604051601f19603f83011681018181108482111715620004af57620004af620006b9565b60405284815283810192508684018288018501891015620004cf57600080fd5b600092505b85831015620004fd57620004e88162000438565b845292840192600192909201918401620004d4565b50979650505050505050565b6000806000606084860312156200051f57600080fd5b6200052a8462000438565b9250602084013567ffffffffffffffff8111156200054757600080fd5b620005558682870162000455565b925050604084013590509250925092565b6000602082840312156200057957600080fd5b5035919050565b6000602082840312156200059357600080fd5b5051919050565b600080600060608486031215620005b057600080fd5b83359250602084013567ffffffffffffffff8111156200054757600080fd5b600081518084526020808501945080840160005b838110156200060a5781516001600160a01b031687529582019590820190600101620005e3565b509495945050505050565b6001600160a01b03841681526060602082018190526000906200063b90830185620005cf565b9050826040830152949350505050565b602081526000620006606020830184620005cf565b9392505050565b848152608060208201526000620006826080830186620005cf565b6040830194909452506001600160a01b039190911660609091015292915050565b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052604160045260246000fdfe608060405260405162001eb938038062001eb9833981016040819052620000269162000249565b60008211620000905760405162461bcd60e51b815260206004820152602b60248201527f636f6e7374727563746f723a206d757374206265206e6f6e2d7a65726f20736960448201526a19dcc81c995c5d5a5c995960aa1b60648201526084015b60405180910390fd5b600580546001600160a01b0319166001600160a01b038316179055600182905560005b83518110156200021c576000848281518110620000d457620000d462000376565b6020026020010151905060006001600160a01b0316816001600160a01b03161415620001435760405162461bcd60e51b815260206004820152601960248201527f636f6e7374727563746f723a207a65726f206164647265737300000000000000604482015260640162000087565b6001600160a01b03811660009081526020819052604090205460ff1615620001ae5760405162461bcd60e51b815260206004820152601d60248201527f636f6e7374727563746f723a206f776e6572206e6f7420756e69717565000000604482015260640162000087565b6001600160a01b03811660008181526020818152604091829020805460ff1916600190811790915591519182527ffe545f48304051c4029eb2da9927daa59da0414b4b084fdceaf2955b609b899e910160405180910390a2508062000213816200034c565b915050620000b3565b50505060039190915550620003a2565b80516001600160a01b03811681146200024457600080fd5b919050565b600080600080608085870312156200026057600080fd5b8451602080870151919550906001600160401b03808211156200028257600080fd5b818801915088601f8301126200029757600080fd5b815181811115620002ac57620002ac6200038c565b8060051b604051601f19603f83011681018181108582111715620002d457620002d46200038c565b604052828152858101935084860182860187018d1015620002f457600080fd5b600095505b8386101562000322576200030d816200022c565b855260019590950194938601938601620002f9565b508098505050505050506040850151915062000341606086016200022c565b905092959194509250565b60006000198214156200036f57634e487b7160e01b600052601160045260246000fd5b5060010190565b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052604160045260246000fd5b611b0780620003b26000396000f3fe6080604052600436106100f75760003560e01c8063836992751161008a578063ce757d2911610059578063ce757d291461032d578063d1fbffa014610343578063de4b9e9314610370578063e0a2ff541461039057600080fd5b8063836992751461028a5780639a8a0592146102e1578063a8397ddc146102f7578063affed0e01461031757600080fd5b80633034a742116100c65780633034a742146101fc5780633bad54261461021c578063545a4a3c1461023c57806365af1bed1461026a57600080fd5b8063025e7c271461013d57806319045a251461017a5780632a387d5d1461019a5780632f54bf6e146101bc57600080fd5b36610138576040805134815247602082015233917f90890809c654f11d6e72a28fa60149770a0d11ec6c92319d6ceb2bb0a4ea1a15910160405180910390a2005b600080fd5b34801561014957600080fd5b5061015d6101583660046116ce565b6103b0565b6040516001600160a01b0390911681526020015b60405180910390f35b34801561018657600080fd5b5061015d610195366004611687565b6103da565b3480156101a657600080fd5b506101ba6101b5366004611652565b610444565b005b3480156101c857600080fd5b506101ec6101d7366004611500565b60006020819052908152604090205460ff1681565b6040519015158152602001610171565b34801561020857600080fd5b506101ba6102173660046116ce565b6105d2565b34801561022857600080fd5b506101ba610237366004611626565b61066c565b34801561024857600080fd5b5061025c6102573660046116e7565b610822565b604051908152602001610171565b34801561027657600080fd5b506101ba610285366004611626565b610861565b34801561029657600080fd5b506102c66102a5366004611500565b60076020526000908152604090208054600182015460029092015490919083565b60408051938452602084019290925290820152606001610171565b3480156102ed57600080fd5b5061025c60035481565b34801561030357600080fd5b506101ba61031236600461174a565b6109ff565b34801561032357600080fd5b5061025c60025481565b34801561033957600080fd5b5061025c60015481565b34801561034f57600080fd5b5061036361035e36600461151d565b610a6a565b60405161017191906118f8565b34801561037c57600080fd5b506101ba61038b366004611500565b610dc3565b34801561039c57600080fd5b5061025c6103ab366004611500565b610efb565b600681815481106103c057600080fd5b6000918252602090912001546001600160a01b0316905081565b600061043d82610437856040517f19457468657265756d205369676e6564204d6573736167653a0a3332000000006020820152603c8101829052600090605c01604051602081830303815290604052805190602001209050919050565b90610f5b565b9392505050565b33301461046c5760405162461bcd60e51b815260040161046390611935565b60405180910390fd5b6001600160a01b038316600090815260076020526040902054156104d25760405162461bcd60e51b815260206004820152601f60248201527f6f70656e53747265616d3a2073747265616d20616c7265616479206f70656e006044820152606401610463565b6000821161051a5760405162461bcd60e51b81526020600482015260156024820152741bdc195b94dd1c99585b4e881b9bc8185b5bdd5b9d605a1b6044820152606401610463565b6000811161056a5760405162461bcd60e51b815260206004820152601860248201527f6f70656e53747265616d3a206e6f206672657175656e637900000000000000006044820152606401610463565b6001600160a01b038316600081815260076020908152604091829020858155600181018590554260029091015581518581529081018490527f81236f9eb471668cf00861415085dace409d719678881c59b03e49683bbef716910160405180910390a2505050565b3330146105f15760405162461bcd60e51b815260040161046390611935565b600081116106675760405162461bcd60e51b815260206004820152603860248201527f7570646174655369676e61747572657352657175697265643a206d757374206260448201527f65206e6f6e2d7a65726f207369677320726571756972656400000000000000006064820152608401610463565b600155565b33301461068b5760405162461bcd60e51b815260040161046390611935565b6001600160a01b03821660009081526020819052604090205460ff166106f35760405162461bcd60e51b815260206004820152601760248201527f72656d6f76655369676e65723a206e6f74206f776e65720000000000000000006044820152606401610463565b600081116107585760405162461bcd60e51b815260206004820152602c60248201527f72656d6f76655369676e65723a206d757374206265206e6f6e2d7a65726f207360448201526b1a59dcc81c995c5d5a5c995960a21b6064820152608401610463565b6001600160a01b03821660008181526020818152604091829020805460ff19168155600185905554915160ff909216151582527ffe545f48304051c4029eb2da9927daa59da0414b4b084fdceaf2955b609b899e91015b60405180910390a2600554604051632fb7d0a560e21b81526001600160a01b039091169063bedf4294906107ec9030906006908690600401611890565b600060405180830381600087803b15801561080657600080fd5b505af115801561081a573d6000803e3d6000fd5b505050505050565b60003060035486868686604051602001610841969594939291906117c7565b604051602081830303815290604052805190602001209050949350505050565b3330146108805760405162461bcd60e51b815260040161046390611935565b6001600160a01b0382166108d65760405162461bcd60e51b815260206004820152601760248201527f6164645369676e65723a207a65726f20616464726573730000000000000000006044820152606401610463565b6001600160a01b03821660009081526020819052604090205460ff161561093f5760405162461bcd60e51b815260206004820152601b60248201527f6164645369676e65723a206f776e6572206e6f7420756e6971756500000000006044820152606401610463565b600081116109a15760405162461bcd60e51b815260206004820152602960248201527f6164645369676e65723a206d757374206265206e6f6e2d7a65726f2073696773604482015268081c995c5d5a5c995960ba1b6064820152608401610463565b6001600160a01b03821660008181526020818152604091829020805460ff19166001908117825585905554915160ff909216151582527ffe545f48304051c4029eb2da9927daa59da0414b4b084fdceaf2955b609b899e91016107af565b33600090815260076020526040902054610a5b5760405162461bcd60e51b815260206004820152601860248201527f77697468647261773a206e6f206f70656e2073747265616d00000000000000006044820152606401610463565b610a66338383610f7f565b5050565b3360009081526020819052604090205460609060ff16610ae05760405162461bcd60e51b815260206004820152602b60248201527f657865637574655472616e73616374696f6e3a206f6e6c79206f776e6572732060448201526a63616e206578656375746560a81b6064820152608401610463565b6000610af0600254878787610822565b600280549192506000610b0283611a49565b919050555060008060005b8551811015610c03576000610b3b85888481518110610b2e57610b2e611a90565b60200260200101516103da565b9050826001600160a01b0316816001600160a01b031611610bbc5760405162461bcd60e51b815260206004820152603560248201527f657865637574655472616e73616374696f6e3a206475706c6963617465206f7260448201527420756e6f726465726564207369676e61747572657360581b6064820152608401610463565b6001600160a01b038116600090815260208190526040902054909250829060ff1615610bf05783610bec81611a49565b9450505b5080610bfb81611a49565b915050610b0d565b50600154821015610c6e5760405162461bcd60e51b815260206004820152602f60248201527f657865637574655472616e73616374696f6e3a206e6f7420656e6f756768207660448201526e616c6964207369676e61747572657360881b6064820152608401610463565b600080896001600160a01b03168989604051610c8a9190611822565b60006040518083038185875af1925050503d8060008114610cc7576040519150601f19603f3d011682016040523d82523d6000602084013e610ccc565b606091505b50604080518082019091526011815270036bab63a34a9b4b3a330b1ba37b93c9d1607d1b6020820152600554929450909250610d10916001600160a01b03166110ce565b81610d5d5760405162461bcd60e51b815260206004820152601d60248201527f657865637574655472616e73616374696f6e3a207478206661696c65640000006044820152606401610463565b336001600160a01b03167f9053e9ec105157fac8c9308d63e6b22be5f50fe915a3e567419b624311a02d748b8b8b6001600254610d9a9190611a02565b8a87604051610dae9695949392919061183e565b60405180910390a29998505050505050505050565b333014610de25760405162461bcd60e51b815260040161046390611935565b6001600160a01b038116600090815260076020526040902054610e525760405162461bcd60e51b815260206004820152602260248201527f636c6f736553747265616d3a2073747265616d20616c726561647920636c6f73604482015261195960f21b6064820152608401610463565b610eaa8160076000846001600160a01b03166001600160a01b03168152602001908152602001600020600001546040518060400160405280600d81526020016c1cdd1c99585b4818db1bdcd959609a1b815250610f7f565b6001600160a01b03811660008181526007602052604080822082815560018101839055600201829055517fcc362a45d32c94d02a329570bd5935709d77f6dc79ac6afa5107b513642461c29190a250565b6001600160a01b03811660009081526007602052604081206001810154600290910154610f289042611a02565b6001600160a01b038416600090815260076020526040902054610f4b91906119e3565b610f5591906119c1565b92915050565b6000806000610f6a8585611113565b91509150610f7781611183565b509392505050565b6000610f8a84610efb565b905082811015610fd35760405162461bcd60e51b81526020600482015260146024820152730eed2e8d0c8e4c2ee7440dcdee840cadcdeeaced60631b6044820152606401610463565b6001600160a01b03841660009081526007602052604090206002015481908490610ffd9042611a02565b61100791906119e3565b61101191906119c1565b6001600160a01b03851660009081526007602052604090206002015461103791906119a9565b6001600160a01b038516600081815260076020526040908190206002019290925590517f485f1bb6524c663555797e00171a10f341656e59b02d6b557a0a38ba7d5d9751906110899086908690611957565b60405180910390a26040516001600160a01b0385169084156108fc029085906000818181858888f193505050501580156110c7573d6000803e3d6000fd5b5050505050565b610a6682826040516024016110e492919061190b565b60408051601f198184030181529190526020810180516001600160e01b031663319af33360e01b179052611341565b60008082516041141561114a5760208301516040840151606085015160001a61113e87828585611362565b9450945050505061117c565b825160401415611174576020830151604084015161116986838361144f565b93509350505061117c565b506000905060025b9250929050565b600081600481111561119757611197611a7a565b14156111a05750565b60018160048111156111b4576111b4611a7a565b14156112025760405162461bcd60e51b815260206004820152601860248201527f45434453413a20696e76616c6964207369676e617475726500000000000000006044820152606401610463565b600281600481111561121657611216611a7a565b14156112645760405162461bcd60e51b815260206004820152601f60248201527f45434453413a20696e76616c6964207369676e6174757265206c656e677468006044820152606401610463565b600381600481111561127857611278611a7a565b14156112d15760405162461bcd60e51b815260206004820152602260248201527f45434453413a20696e76616c6964207369676e6174757265202773272076616c604482015261756560f01b6064820152608401610463565b60048160048111156112e5576112e5611a7a565b141561133e5760405162461bcd60e51b815260206004820152602260248201527f45434453413a20696e76616c6964207369676e6174757265202776272076616c604482015261756560f01b6064820152608401610463565b50565b80516a636f6e736f6c652e6c6f67602083016000808483855afa5050505050565b6000807f7fffffffffffffffffffffffffffffff5d576e7357a4501ddfe92f46681b20a08311156113995750600090506003611446565b8460ff16601b141580156113b157508460ff16601c14155b156113c25750600090506004611446565b6040805160008082526020820180845289905260ff881692820192909252606081018690526080810185905260019060a0016020604051602081039080840390855afa158015611416573d6000803e3d6000fd5b5050604051601f1901519150506001600160a01b03811661143f57600060019250925050611446565b9150600090505b94509492505050565b6000806001600160ff1b0383168161146c60ff86901c601b6119a9565b905061147a87828885611362565b935093505050935093915050565b600067ffffffffffffffff8311156114a2576114a2611aa6565b6114b5601f8401601f1916602001611978565b90508281528383830111156114c957600080fd5b828260208301376000602084830101529392505050565b600082601f8301126114f157600080fd5b61043d83833560208501611488565b60006020828403121561151257600080fd5b813561043d81611abc565b6000806000806080858703121561153357600080fd5b843561153e81611abc565b93506020858101359350604086013567ffffffffffffffff8082111561156357600080fd5b61156f89838a016114e0565b9450606088013591508082111561158557600080fd5b818801915088601f83011261159957600080fd5b8135818111156115ab576115ab611aa6565b8060051b6115ba858201611978565b8281528581019085870183870188018e10156115d557600080fd5b600093505b84841015611614578035868111156115f157600080fd5b6115ff8f8a838b01016114e0565b845250600193909301929187019187016115da565b50999c989b5096995050505050505050565b6000806040838503121561163957600080fd5b823561164481611abc565b946020939093013593505050565b60008060006060848603121561166757600080fd5b833561167281611abc565b95602085013595506040909401359392505050565b6000806040838503121561169a57600080fd5b82359150602083013567ffffffffffffffff8111156116b857600080fd5b6116c4858286016114e0565b9150509250929050565b6000602082840312156116e057600080fd5b5035919050565b600080600080608085870312156116fd57600080fd5b84359350602085013561170f81611abc565b925060408501359150606085013567ffffffffffffffff81111561173257600080fd5b61173e878288016114e0565b91505092959194509250565b6000806040838503121561175d57600080fd5b82359150602083013567ffffffffffffffff81111561177b57600080fd5b8301601f8101851361178c57600080fd5b6116c485823560208401611488565b600081518084526117b3816020860160208601611a19565b601f01601f19169290920160200192915050565b60006bffffffffffffffffffffffff19808960601b168352876014840152866034840152808660601b166054840152508360688301528251611810816088850160208701611a19565b91909101608801979650505050505050565b60008251611834818460208701611a19565b9190910192915050565b60018060a01b038716815285602082015260c06040820152600061186560c083018761179b565b85606084015284608084015282810360a0840152611883818561179b565b9998505050505050505050565b60006060820160018060a01b03808716845260206060818601528287548085526080870191508860005282600020945060005b818110156118e15785548516835260019586019592840192016118c3565b505080945050505050826040830152949350505050565b60208152600061043d602083018461179b565b60408152600061191e604083018561179b565b905060018060a01b03831660208301529392505050565b6020808252600890820152672737ba1029b2b63360c11b604082015260600190565b828152604060208201526000611970604083018461179b565b949350505050565b604051601f8201601f1916810167ffffffffffffffff811182821017156119a1576119a1611aa6565b604052919050565b600082198211156119bc576119bc611a64565b500190565b6000826119de57634e487b7160e01b600052601260045260246000fd5b500490565b60008160001904831182151516156119fd576119fd611a64565b500290565b600082821015611a1457611a14611a64565b500390565b60005b83811015611a34578181015183820152602001611a1c565b83811115611a43576000848401525b50505050565b6000600019821415611a5d57611a5d611a64565b5060010190565b634e487b7160e01b600052601160045260246000fd5b634e487b7160e01b600052602160045260246000fd5b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052604160045260246000fd5b6001600160a01b038116811461133e57600080fdfea2646970667358221220e615c94024cf473e9651445cec43caf90e52537575bf670e0101800ec3b2522c64736f6c63430008060033a2646970667358221220dcae486b78e01a829fb767e2cf29adf39bf6523927a5621042a27bb308dcb1af64736f6c63430008060033";

type MultiSigFactoryConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: MultiSigFactoryConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class MultiSigFactory__factory extends ContractFactory {
  constructor(...args: MultiSigFactoryConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
    this.contractName = "MultiSigFactory";
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<MultiSigFactory> {
    return super.deploy(overrides || {}) as Promise<MultiSigFactory>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): MultiSigFactory {
    return super.attach(address) as MultiSigFactory;
  }
  connect(signer: Signer): MultiSigFactory__factory {
    return super.connect(signer) as MultiSigFactory__factory;
  }
  static readonly contractName: "MultiSigFactory";
  public readonly contractName: "MultiSigFactory";
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): MultiSigFactoryInterface {
    return new utils.Interface(_abi) as MultiSigFactoryInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): MultiSigFactory {
    return new Contract(address, _abi, signerOrProvider) as MultiSigFactory;
  }
}