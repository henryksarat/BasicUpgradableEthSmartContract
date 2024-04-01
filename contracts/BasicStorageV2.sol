pragma solidity ^0.8.0;

import {OwnableUpgradeable} from "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import {Initializable} from "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

contract BasicStorageV2 is Initializable, OwnableUpgradeable {
    uint256 private _value;
    uint256 private _valueOpen;

    event ValueChanged(uint256 value);
    event OpenValueChanged(uint256 value);

    function initialize() public initializer {
        __Ownable_init(msg.sender); //sets owner to msg.sender
    }

    function store(uint256 value) onlyOwner public {
        _value = value;
        emit ValueChanged(value);
    }

    function storeOpenValue(uint256 value) public {
        _valueOpen = value;
        emit OpenValueChanged(value);
    }

    function retrieve() public view returns (uint256) {
        return _value;
    }

    function increment() onlyOwner public {
        _value = _value + 1;
        emit ValueChanged(_value);
    }

    function retrieveOpen() public view returns (uint256) {
        return _valueOpen;
    }
}