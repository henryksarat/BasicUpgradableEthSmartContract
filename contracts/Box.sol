pragma solidity ^0.8.0;

// Import Ownable from the OpenZeppelin Contracts library
import "@openzeppelin/contracts/access/Ownable.sol";
import {OwnableUpgradeable} from "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import {Initializable} from "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

contract Box is Initializable, OwnableUpgradeable {
    uint256 private _value;
    uint256 private _valueOpen;

    // Emitted when the stored value changes
    event ValueChanged(uint256 value);
    

    function initialize() public initializer {
        __Ownable_init(msg.sender); //sets owner to msg.sender
    }

    // Stores a new value in the contract
    function store(uint256 value) onlyOwner public {
        _value = value;
        emit ValueChanged(value);
    }

    // Stores a new value in the contract
    function storeOpenValue(uint256 value) public {
        _valueOpen = value;
        emit ValueChanged(value);
    }

    // Reads the last stored value
    function retrieve() public view returns (uint256) {
        return _value;
    }

    // Reads the last stored value
    function retrieveOpen() public view returns (uint256) {
        return _valueOpen;
    }
}