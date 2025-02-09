// const hre = require("hardhat");
// const { ethers } = require("hardhat"); // Explicitly import ethers

// async function main() {
//   const [deployer] = await ethers.getSigners(); // Use ethers.getSigners() instead of hre.ethers

//   console.log("Deploying contracts with the account:", deployer.address);

//   const RiverToken = await ethers.getContractFactory("RiverToken");

//   // Convert token amounts using ethers.parseUnits (Ethers v6 syntax)
//   const tokenCap = ethers.parseUnits("80000000", 18); // 80 million tokens with 18 decimals
//   const blockReward = ethers.parseUnits("50", 18); // 50 tokens per block with 18 decimals

//   try {
//     console.log("Starting deployment...");

//     // Deploy the contract
//     const riverToken = await RiverToken.deploy(tokenCap, blockReward);

//     // Wait until deployment is confirmed
//     await riverToken.waitForDeployment(); // Use waitForDeployment() instead of deployed() in Ethers v6

//     console.log("River Token deployed at:", await riverToken.getAddress()); // Use getAddress() in Ethers v6
//   } catch (error) {
//     console.error("Deployment error:", error);
//     process.exitCode = 1;
//   }
// }

// main().catch((error) => {
//   console.error("Main execution error:", error);
//   process.exitCode = 1;
// });

const hre = require("hardhat");
const { ethers } = hre; // Import ethers correctly from Hardhat Runtime Environment

async function main() {
  const [deployer] = await ethers.getSigners(); // Get deployer's wallet info

  console.log("Deploying contracts with the account:", deployer.address);

  const RiverToken = await ethers.getContractFactory("RiverToken");

  // Convert token amounts using ethers.parseUnits
  const tokenCap = ethers.parseUnits("80000000", 18); // 80M tokens with 18 decimals
  const blockReward = ethers.parseUnits("50", 18); // 50 tokens per block

  try {
    console.log("Starting deployment...");

    // Deploy the contract
    const riverToken = await RiverToken.deploy(tokenCap, blockReward);

    // Wait for deployment confirmation
    await riverToken.waitForDeployment();

    console.log("River Token deployed at:", await riverToken.getAddress());
  } catch (error) {
    console.error("Deployment error:", error);
    process.exitCode = 1;
  }
}

main().catch((error) => {
  console.error("Main execution error:", error);
  process.exitCode = 1;
});
