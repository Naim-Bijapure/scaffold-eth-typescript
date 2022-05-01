// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "./MetaMultiSigWallet.sol";

contract MultiSigFactory {
  MetaMultiSigWallet[] public multiSigs;
  mapping(address => bool) existsMultiSig;

  event Create(uint256 indexed contractId, address indexed contractAddress, address creator, address[] owners, uint256 signaturesRequired);

  event Owners(address indexed contractAddress, address[] owners, uint256 indexed signaturesRequired);

  event DebugLog(address owner, string properTy, uint256 value, bool boolCheck, address addressCheck, bytes32 _hash);

  constructor() {}

  modifier onlyRegistered() {
    require(existsMultiSig[msg.sender], "caller not registered to use logger");
    _;
  }

  function emitOwners(
    address _contractAddress,
    address[] memory _owners,
    uint256 _signaturesRequired
  ) external onlyRegistered {
    emit Owners(_contractAddress, _owners, _signaturesRequired);
  }

  function create(
    uint256 _chainId,
    address[] memory _owners,
    uint256 _signaturesRequired
  ) public payable {
    uint256 id = numberOfMultiSigs();

    MetaMultiSigWallet multiSig = (new MetaMultiSigWallet){ value: msg.value }(_chainId, _owners, _signaturesRequired, address(this));
    multiSigs.push(multiSig);
    existsMultiSig[address(multiSig)] = true;

    emit Create(id, address(multiSig), msg.sender, _owners, _signaturesRequired);
    emit Owners(address(multiSig), _owners, _signaturesRequired);
  }

  function numberOfMultiSigs() public view returns (uint256) {
    return multiSigs.length;
  }

  function getMultiSig(uint256 _index)
    public
    view
    returns (
      address multiSigAddress,
      uint256 signaturesRequired,
      uint256 balance
    )
  {
    MetaMultiSigWallet multiSig = multiSigs[_index];
    return (address(multiSig), multiSig.signaturesRequired(), address(multiSig).balance);
  }

  function emitDebugLog(
    address owner,
    string memory properTy,
    uint256 value,
    bool boolCheck,
    address addressCheck,
    bytes32 _hash
  ) public {
    emit DebugLog(owner, properTy, value, boolCheck, addressCheck, _hash);
  }
}