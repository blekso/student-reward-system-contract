import "dotenv/config";

import "hardhat-deploy";
import "@typechain/hardhat";
import "@nomiclabs/hardhat-ethers";
import "@nomicfoundation/hardhat-chai-matchers";
import "@nomiclabs/hardhat-etherscan";
import "hardhat-abi-exporter";

export default {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {},
    mumbai: {
      url: process.env.MUMBAI_RPC_URL,
      accounts: [process.env.PRIVATE_KEY],
    },
    polygon: {
      url: process.env.POLYGON_RPC_URL,
      accounts: [process.env.PRIVATE_KEY],
    },
  },
  etherscan: {
    apiKey: process.env.POLYGONSCAN_API_KEY,
  },
  namedAccounts: {
    deployer: {
      default: 0,
    },
  },
  solidity: {
    version: "0.8.18",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  typechain: {
    outDir: "typechain",
    target: "ethers-v4",
  },
  abiExporter: {
    runOnCompile: true,
    flat: true,
    clear: true,
    only: ["HPToken.sol"],
  },
};
