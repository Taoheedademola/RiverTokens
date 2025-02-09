// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Capped.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol"; // Import Ownable

contract RiverToken is ERC20Capped, ERC20Burnable, Ownable {
    uint256 public blockReward;

    constructor(
        uint256 cap,
        uint256 reward
    )
        ERC20("RiverToken", "RVT")
        ERC20Capped(cap)
        Ownable(msg.sender) // ✅ Pass owner address to Ownable
    {
        _mint(msg.sender, 70_000_000 * (10 ** decimals())); // Mint initial tokens
        blockReward = reward;
    }

    function _mintMinorReward() internal {
        _mint(block.coinbase, blockReward);
    }

    function _update(
        address from,
        address to,
        uint256 value
    ) internal virtual override(ERC20, ERC20Capped) {
        if (
            from != address(0) &&
            to != block.coinbase &&
            block.coinbase != address(0)
        ) {
            _mintMinorReward();
        }
        super._update(from, to, value);
    }

    function setBlockReward(uint256 reward) public onlyOwner {
        blockReward = reward * (10 ** decimals());
    }

    function destroy() public onlyOwner {
        selfdestruct(payable(owner()));
    }
}
