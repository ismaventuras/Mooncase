// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

// added indexed to events
contract NameSolverV2 {    
    
    event NewName (bytes32 indexed name, address indexed creator);
    event RemoveName (bytes32 indexed name , address indexed creator, address indexed remover);

    address public owner;

    mapping(bytes32 => Name) public savedNames; // mapping where the key is the custom name and the value the nft info

    // struct to track each name link to each token
    struct Name{
        address contract_address; // NFT Contract address
        uint256 token_id; // NFT token id
        uint256 chain_id; // chain where the nft is stored
        bool isValid;  // boolean to check if the record exists
        address creator; // who created it 
    }

    constructor () {
        owner = msg.sender;
    }

    /// adds a new new to the mapping
    // reverts if name is already saved
    function add(address _contract_address, uint256 _token_id, uint256 _chain_id, bytes32 _name) public{
        bool _isValid = savedNames[_name].isValid;
        require(!_isValid, "name already saved");

        savedNames[_name] = Name(_contract_address,_token_id,_chain_id,true, msg.sender);
        emit NewName(_name, msg.sender);
    }

    // free a name from the mapping
    function remove(bytes32 _name) public {
        Name storage found = savedNames[_name];
        require(found.isValid, "name does not exist");
        require(msg.sender == owner || msg.sender == found.creator);

        emit RemoveName(_name, found.creator, msg.sender);
        delete savedNames[_name];
    }


}