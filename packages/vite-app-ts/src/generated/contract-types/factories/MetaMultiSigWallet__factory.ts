/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Signer,
  utils,
  Contract,
  ContractFactory,
  PayableOverrides,
  BigNumberish,
} from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  MetaMultiSigWallet,
  MetaMultiSigWalletInterface,
} from "../MetaMultiSigWallet";

const _abi = [
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
      {
        internalType: "address",
        name: "_factory",
        type: "address",
      },
    ],
    stateMutability: "payable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
    ],
    name: "CloseStream",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "balance",
        type: "uint256",
      },
    ],
    name: "Deposit",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address payable",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "nonce",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "hash",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "result",
        type: "bytes",
      },
    ],
    name: "ExecuteTransaction",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "frequency",
        type: "uint256",
      },
    ],
    name: "OpenStream",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "added",
        type: "bool",
      },
    ],
    name: "Owner",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "reason",
        type: "string",
      },
    ],
    name: "Withdraw",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newSigner",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "newSignaturesRequired",
        type: "uint256",
      },
    ],
    name: "addSigner",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "chainId",
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
  {
    inputs: [
      {
        internalType: "address payable",
        name: "to",
        type: "address",
      },
    ],
    name: "closeStream",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address payable",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
      {
        internalType: "bytes[]",
        name: "signatures",
        type: "bytes[]",
      },
    ],
    name: "executeTransaction",
    outputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_nonce",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "getTransactionHash",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "isOwner",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "nonce",
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
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "frequency",
        type: "uint256",
      },
    ],
    name: "openStream",
    outputs: [],
    stateMutability: "nonpayable",
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
    name: "owners",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "_hash",
        type: "bytes32",
      },
      {
        internalType: "bytes",
        name: "_signature",
        type: "bytes",
      },
    ],
    name: "recover",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "oldSigner",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "newSignaturesRequired",
        type: "uint256",
      },
    ],
    name: "removeSigner",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "signaturesRequired",
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
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
    ],
    name: "streamBalance",
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
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "reason",
        type: "string",
      },
    ],
    name: "streamWithdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "streams",
    outputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "frequency",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "last",
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
        name: "newSignaturesRequired",
        type: "uint256",
      },
    ],
    name: "updateSignaturesRequired",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    stateMutability: "payable",
    type: "receive",
  },
];

const _bytecode =
  "0x608060405260405162001dea38038062001dea833981016040819052620000269162000249565b60008211620000905760405162461bcd60e51b815260206004820152602b60248201527f636f6e7374727563746f723a206d757374206265206e6f6e2d7a65726f20736960448201526a19dcc81c995c5d5a5c995960aa1b60648201526084015b60405180910390fd5b600580546001600160a01b0319166001600160a01b038316179055600182905560005b83518110156200021c576000848281518110620000d457620000d462000376565b6020026020010151905060006001600160a01b0316816001600160a01b03161415620001435760405162461bcd60e51b815260206004820152601960248201527f636f6e7374727563746f723a207a65726f206164647265737300000000000000604482015260640162000087565b6001600160a01b03811660009081526020819052604090205460ff1615620001ae5760405162461bcd60e51b815260206004820152601d60248201527f636f6e7374727563746f723a206f776e6572206e6f7420756e69717565000000604482015260640162000087565b6001600160a01b03811660008181526020818152604091829020805460ff1916600190811790915591519182527ffe545f48304051c4029eb2da9927daa59da0414b4b084fdceaf2955b609b899e910160405180910390a2508062000213816200034c565b915050620000b3565b50505060039190915550620003a2565b80516001600160a01b03811681146200024457600080fd5b919050565b600080600080608085870312156200026057600080fd5b8451602080870151919550906001600160401b03808211156200028257600080fd5b818801915088601f8301126200029757600080fd5b815181811115620002ac57620002ac6200038c565b8060051b604051601f19603f83011681018181108582111715620002d457620002d46200038c565b604052828152858101935084860182860187018d1015620002f457600080fd5b600095505b8386101562000322576200030d816200022c565b855260019590950194938601938601620002f9565b508098505050505050506040850151915062000341606086016200022c565b905092959194509250565b60006000198214156200036f57634e487b7160e01b600052601160045260246000fd5b5060010190565b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052604160045260246000fd5b611a3880620003b26000396000f3fe6080604052600436106100f75760003560e01c8063836992751161008a578063ce757d2911610059578063ce757d291461032d578063d1fbffa014610343578063de4b9e9314610370578063e0a2ff541461039057600080fd5b8063836992751461028a5780639a8a0592146102e1578063a8397ddc146102f7578063affed0e01461031757600080fd5b80633034a742116100c65780633034a742146101fc5780633bad54261461021c578063545a4a3c1461023c57806365af1bed1461026a57600080fd5b8063025e7c271461013d57806319045a251461017a5780632a387d5d1461019a5780632f54bf6e146101bc57600080fd5b36610138576040805134815247602082015233917f90890809c654f11d6e72a28fa60149770a0d11ec6c92319d6ceb2bb0a4ea1a15910160405180910390a2005b600080fd5b34801561014957600080fd5b5061015d610158366004611629565b6103b0565b6040516001600160a01b0390911681526020015b60405180910390f35b34801561018657600080fd5b5061015d6101953660046115e2565b6103da565b3480156101a657600080fd5b506101ba6101b53660046115ad565b610444565b005b3480156101c857600080fd5b506101ec6101d736600461145b565b60006020819052908152604090205460ff1681565b6040519015158152602001610171565b34801561020857600080fd5b506101ba610217366004611629565b6105d2565b34801561022857600080fd5b506101ba610237366004611581565b61066c565b34801561024857600080fd5b5061025c610257366004611642565b610822565b604051908152602001610171565b34801561027657600080fd5b506101ba610285366004611581565b610861565b34801561029657600080fd5b506102c66102a536600461145b565b60076020526000908152604090208054600182015460029092015490919083565b60408051938452602084019290925290820152606001610171565b3480156102ed57600080fd5b5061025c60035481565b34801561030357600080fd5b506101ba6103123660046116a5565b6109ff565b34801561032357600080fd5b5061025c60025481565b34801561033957600080fd5b5061025c60015481565b34801561034f57600080fd5b5061036361035e366004611478565b610a6a565b6040516101719190611853565b34801561037c57600080fd5b506101ba61038b36600461145b565b610d84565b34801561039c57600080fd5b5061025c6103ab36600461145b565b610ebc565b600681815481106103c057600080fd5b6000918252602090912001546001600160a01b0316905081565b600061043d82610437856040517f19457468657265756d205369676e6564204d6573736167653a0a3332000000006020820152603c8101829052600090605c01604051602081830303815290604052805190602001209050919050565b90610f1c565b9392505050565b33301461046c5760405162461bcd60e51b815260040161046390611866565b60405180910390fd5b6001600160a01b038316600090815260076020526040902054156104d25760405162461bcd60e51b815260206004820152601f60248201527f6f70656e53747265616d3a2073747265616d20616c7265616479206f70656e006044820152606401610463565b6000821161051a5760405162461bcd60e51b81526020600482015260156024820152741bdc195b94dd1c99585b4e881b9bc8185b5bdd5b9d605a1b6044820152606401610463565b6000811161056a5760405162461bcd60e51b815260206004820152601860248201527f6f70656e53747265616d3a206e6f206672657175656e637900000000000000006044820152606401610463565b6001600160a01b038316600081815260076020908152604091829020858155600181018590554260029091015581518581529081018490527f81236f9eb471668cf00861415085dace409d719678881c59b03e49683bbef716910160405180910390a2505050565b3330146105f15760405162461bcd60e51b815260040161046390611866565b600081116106675760405162461bcd60e51b815260206004820152603860248201527f7570646174655369676e61747572657352657175697265643a206d757374206260448201527f65206e6f6e2d7a65726f207369677320726571756972656400000000000000006064820152608401610463565b600155565b33301461068b5760405162461bcd60e51b815260040161046390611866565b6001600160a01b03821660009081526020819052604090205460ff166106f35760405162461bcd60e51b815260206004820152601760248201527f72656d6f76655369676e65723a206e6f74206f776e65720000000000000000006044820152606401610463565b600081116107585760405162461bcd60e51b815260206004820152602c60248201527f72656d6f76655369676e65723a206d757374206265206e6f6e2d7a65726f207360448201526b1a59dcc81c995c5d5a5c995960a21b6064820152608401610463565b6001600160a01b03821660008181526020818152604091829020805460ff19168155600185905554915160ff909216151582527ffe545f48304051c4029eb2da9927daa59da0414b4b084fdceaf2955b609b899e91015b60405180910390a2600554604051632fb7d0a560e21b81526001600160a01b039091169063bedf4294906107ec90309060069086906004016117eb565b600060405180830381600087803b15801561080657600080fd5b505af115801561081a573d6000803e3d6000fd5b505050505050565b6000306003548686868660405160200161084196959493929190611722565b604051602081830303815290604052805190602001209050949350505050565b3330146108805760405162461bcd60e51b815260040161046390611866565b6001600160a01b0382166108d65760405162461bcd60e51b815260206004820152601760248201527f6164645369676e65723a207a65726f20616464726573730000000000000000006044820152606401610463565b6001600160a01b03821660009081526020819052604090205460ff161561093f5760405162461bcd60e51b815260206004820152601b60248201527f6164645369676e65723a206f776e6572206e6f7420756e6971756500000000006044820152606401610463565b600081116109a15760405162461bcd60e51b815260206004820152602960248201527f6164645369676e65723a206d757374206265206e6f6e2d7a65726f2073696773604482015268081c995c5d5a5c995960ba1b6064820152608401610463565b6001600160a01b03821660008181526020818152604091829020805460ff19166001908117825585905554915160ff909216151582527ffe545f48304051c4029eb2da9927daa59da0414b4b084fdceaf2955b609b899e91016107af565b33600090815260076020526040902054610a5b5760405162461bcd60e51b815260206004820152601860248201527f77697468647261773a206e6f206f70656e2073747265616d00000000000000006044820152606401610463565b610a66338383610f40565b5050565b3360009081526020819052604090205460609060ff16610ae05760405162461bcd60e51b815260206004820152602b60248201527f657865637574655472616e73616374696f6e3a206f6e6c79206f776e6572732060448201526a63616e206578656375746560a81b6064820152608401610463565b6000610af0600254878787610822565b600280549192506000610b028361197a565b919050555060008060005b8551811015610c03576000610b3b85888481518110610b2e57610b2e6119c1565b60200260200101516103da565b9050826001600160a01b0316816001600160a01b031611610bbc5760405162461bcd60e51b815260206004820152603560248201527f657865637574655472616e73616374696f6e3a206475706c6963617465206f7260448201527420756e6f726465726564207369676e61747572657360581b6064820152608401610463565b6001600160a01b038116600090815260208190526040902054909250829060ff1615610bf05783610bec8161197a565b9450505b5080610bfb8161197a565b915050610b0d565b50600154821015610c6e5760405162461bcd60e51b815260206004820152602f60248201527f657865637574655472616e73616374696f6e3a206e6f7420656e6f756768207660448201526e616c6964207369676e61747572657360881b6064820152608401610463565b600080896001600160a01b03168989604051610c8a919061177d565b60006040518083038185875af1925050503d8060008114610cc7576040519150601f19603f3d011682016040523d82523d6000602084013e610ccc565b606091505b509150915081610d1e5760405162461bcd60e51b815260206004820152601d60248201527f657865637574655472616e73616374696f6e3a207478206661696c65640000006044820152606401610463565b336001600160a01b03167f9053e9ec105157fac8c9308d63e6b22be5f50fe915a3e567419b624311a02d748b8b8b6001600254610d5b9190611933565b8a87604051610d6f96959493929190611799565b60405180910390a29998505050505050505050565b333014610da35760405162461bcd60e51b815260040161046390611866565b6001600160a01b038116600090815260076020526040902054610e135760405162461bcd60e51b815260206004820152602260248201527f636c6f736553747265616d3a2073747265616d20616c726561647920636c6f73604482015261195960f21b6064820152608401610463565b610e6b8160076000846001600160a01b03166001600160a01b03168152602001908152602001600020600001546040518060400160405280600d81526020016c1cdd1c99585b4818db1bdcd959609a1b815250610f40565b6001600160a01b03811660008181526007602052604080822082815560018101839055600201829055517fcc362a45d32c94d02a329570bd5935709d77f6dc79ac6afa5107b513642461c29190a250565b6001600160a01b03811660009081526007602052604081206001810154600290910154610ee99042611933565b6001600160a01b038416600090815260076020526040902054610f0c9190611914565b610f1691906118f2565b92915050565b6000806000610f2b858561108f565b91509150610f38816110ff565b509392505050565b6000610f4b84610ebc565b905082811015610f945760405162461bcd60e51b81526020600482015260146024820152730eed2e8d0c8e4c2ee7440dcdee840cadcdeeaced60631b6044820152606401610463565b6001600160a01b03841660009081526007602052604090206002015481908490610fbe9042611933565b610fc89190611914565b610fd291906118f2565b6001600160a01b038516600090815260076020526040902060020154610ff891906118da565b6001600160a01b038516600081815260076020526040908190206002019290925590517f485f1bb6524c663555797e00171a10f341656e59b02d6b557a0a38ba7d5d97519061104a9086908690611888565b60405180910390a26040516001600160a01b0385169084156108fc029085906000818181858888f19350505050158015611088573d6000803e3d6000fd5b5050505050565b6000808251604114156110c65760208301516040840151606085015160001a6110ba878285856112bd565b945094505050506110f8565b8251604014156110f057602083015160408401516110e58683836113aa565b9350935050506110f8565b506000905060025b9250929050565b6000816004811115611113576111136119ab565b141561111c5750565b6001816004811115611130576111306119ab565b141561117e5760405162461bcd60e51b815260206004820152601860248201527f45434453413a20696e76616c6964207369676e617475726500000000000000006044820152606401610463565b6002816004811115611192576111926119ab565b14156111e05760405162461bcd60e51b815260206004820152601f60248201527f45434453413a20696e76616c6964207369676e6174757265206c656e677468006044820152606401610463565b60038160048111156111f4576111f46119ab565b141561124d5760405162461bcd60e51b815260206004820152602260248201527f45434453413a20696e76616c6964207369676e6174757265202773272076616c604482015261756560f01b6064820152608401610463565b6004816004811115611261576112616119ab565b14156112ba5760405162461bcd60e51b815260206004820152602260248201527f45434453413a20696e76616c6964207369676e6174757265202776272076616c604482015261756560f01b6064820152608401610463565b50565b6000807f7fffffffffffffffffffffffffffffff5d576e7357a4501ddfe92f46681b20a08311156112f457506000905060036113a1565b8460ff16601b1415801561130c57508460ff16601c14155b1561131d57506000905060046113a1565b6040805160008082526020820180845289905260ff881692820192909252606081018690526080810185905260019060a0016020604051602081039080840390855afa158015611371573d6000803e3d6000fd5b5050604051601f1901519150506001600160a01b03811661139a576000600192509250506113a1565b9150600090505b94509492505050565b6000806001600160ff1b038316816113c760ff86901c601b6118da565b90506113d5878288856112bd565b935093505050935093915050565b600067ffffffffffffffff8311156113fd576113fd6119d7565b611410601f8401601f19166020016118a9565b905082815283838301111561142457600080fd5b828260208301376000602084830101529392505050565b600082601f83011261144c57600080fd5b61043d838335602085016113e3565b60006020828403121561146d57600080fd5b813561043d816119ed565b6000806000806080858703121561148e57600080fd5b8435611499816119ed565b93506020858101359350604086013567ffffffffffffffff808211156114be57600080fd5b6114ca89838a0161143b565b945060608801359150808211156114e057600080fd5b818801915088601f8301126114f457600080fd5b813581811115611506576115066119d7565b8060051b6115158582016118a9565b8281528581019085870183870188018e101561153057600080fd5b600093505b8484101561156f5780358681111561154c57600080fd5b61155a8f8a838b010161143b565b84525060019390930192918701918701611535565b50999c989b5096995050505050505050565b6000806040838503121561159457600080fd5b823561159f816119ed565b946020939093013593505050565b6000806000606084860312156115c257600080fd5b83356115cd816119ed565b95602085013595506040909401359392505050565b600080604083850312156115f557600080fd5b82359150602083013567ffffffffffffffff81111561161357600080fd5b61161f8582860161143b565b9150509250929050565b60006020828403121561163b57600080fd5b5035919050565b6000806000806080858703121561165857600080fd5b84359350602085013561166a816119ed565b925060408501359150606085013567ffffffffffffffff81111561168d57600080fd5b6116998782880161143b565b91505092959194509250565b600080604083850312156116b857600080fd5b82359150602083013567ffffffffffffffff8111156116d657600080fd5b8301601f810185136116e757600080fd5b61161f858235602084016113e3565b6000815180845261170e81602086016020860161194a565b601f01601f19169290920160200192915050565b60006bffffffffffffffffffffffff19808960601b168352876014840152866034840152808660601b16605484015250836068830152825161176b81608885016020870161194a565b91909101608801979650505050505050565b6000825161178f81846020870161194a565b9190910192915050565b60018060a01b038716815285602082015260c0604082015260006117c060c08301876116f6565b85606084015284608084015282810360a08401526117de81856116f6565b9998505050505050505050565b60006060820160018060a01b03808716845260206060818601528287548085526080870191508860005282600020945060005b8181101561183c57855485168352600195860195928401920161181e565b505080945050505050826040830152949350505050565b60208152600061043d60208301846116f6565b6020808252600890820152672737ba1029b2b63360c11b604082015260600190565b8281526040602082015260006118a160408301846116f6565b949350505050565b604051601f8201601f1916810167ffffffffffffffff811182821017156118d2576118d26119d7565b604052919050565b600082198211156118ed576118ed611995565b500190565b60008261190f57634e487b7160e01b600052601260045260246000fd5b500490565b600081600019048311821515161561192e5761192e611995565b500290565b60008282101561194557611945611995565b500390565b60005b8381101561196557818101518382015260200161194d565b83811115611974576000848401525b50505050565b600060001982141561198e5761198e611995565b5060010190565b634e487b7160e01b600052601160045260246000fd5b634e487b7160e01b600052602160045260246000fd5b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052604160045260246000fd5b6001600160a01b03811681146112ba57600080fdfea26469706673582212201ef265e2b4879dea12e8aebb3bfe57e41f206d5a2d647de95f9c0e1419a3d65d64736f6c63430008060033";

type MetaMultiSigWalletConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: MetaMultiSigWalletConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class MetaMultiSigWallet__factory extends ContractFactory {
  constructor(...args: MetaMultiSigWalletConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
    this.contractName = "MetaMultiSigWallet";
  }

  deploy(
    _chainId: BigNumberish,
    _owners: string[],
    _signaturesRequired: BigNumberish,
    _factory: string,
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): Promise<MetaMultiSigWallet> {
    return super.deploy(
      _chainId,
      _owners,
      _signaturesRequired,
      _factory,
      overrides || {}
    ) as Promise<MetaMultiSigWallet>;
  }
  getDeployTransaction(
    _chainId: BigNumberish,
    _owners: string[],
    _signaturesRequired: BigNumberish,
    _factory: string,
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      _chainId,
      _owners,
      _signaturesRequired,
      _factory,
      overrides || {}
    );
  }
  attach(address: string): MetaMultiSigWallet {
    return super.attach(address) as MetaMultiSigWallet;
  }
  connect(signer: Signer): MetaMultiSigWallet__factory {
    return super.connect(signer) as MetaMultiSigWallet__factory;
  }
  static readonly contractName: "MetaMultiSigWallet";
  public readonly contractName: "MetaMultiSigWallet";
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): MetaMultiSigWalletInterface {
    return new utils.Interface(_abi) as MetaMultiSigWalletInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): MetaMultiSigWallet {
    return new Contract(address, _abi, signerOrProvider) as MetaMultiSigWallet;
  }
}
