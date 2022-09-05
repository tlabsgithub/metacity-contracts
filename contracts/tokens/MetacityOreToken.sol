// SPDX-License-Identifier: MIT
pragma solidity ^0.8.3;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MetacityOreToken is ERC20 {
    constructor() ERC20("Metacity Ore Token", "MEO") {
        _mint(_msgSender(), 1 * 10 ** 28);
    }
}
