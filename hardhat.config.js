require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config(); // Load environment variables

module.exports = {
  solidity: "0.8.20",
  networks: {
    sepolia: {
      url: process.env.INFURA_SEPOLIA_URL || "",
      accounts: [process.env.PRIVATE_KEY],
    },
    mainnet: {
      url: process.env.INFURA_MAINNET_URL || "",
      accounts: [process.env.PRIVATE_KEY],
    },
  },
};
