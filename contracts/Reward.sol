// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract Reward is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;

    string private baseTokenURI;
    uint256 private maxTokens;

    constructor(
        string memory _baseTokenURI,
        uint256 _maxTokens
    ) ERC721("Reward", "RWRD") {
        baseTokenURI = _baseTokenURI;
        maxTokens = _maxTokens;

        _tokenIdCounter.increment();
    }

    //test
    function setBaseTokenURI(
        string memory _newBaseTokenURI
    ) external onlyOwner {
        baseTokenURI = _newBaseTokenURI;
    }

    function _baseURI() internal view override returns (string memory) {
        return baseTokenURI;
    }

    function claim() external payable {
        require(_tokenIdCounter.current() < maxTokens, "All tokens claimed");

        uint256 tokenId = _tokenIdCounter.current();
        _mint(msg.sender, tokenId);
        _setTokenURI(
            tokenId,
            string(abi.encodePacked(baseTokenURI, Strings.toString(tokenId)))
        );

        _tokenIdCounter.increment();
    }
}
