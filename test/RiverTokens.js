const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("RiverToken Contract", function () {
  let RiverToken, riverToken, owner, addr1, addr2;
  const tokenCap = ethers.parseUnits("80000000", 18); // Ensure correct units
  const tokenBlockReward = ethers.parseUnits("50", 18);

  beforeEach(async function () {
    RiverToken = await ethers.getContractFactory("RiverToken");
    [owner, addr1, addr2] = await ethers.getSigners();

    riverToken = await RiverToken.deploy(tokenCap, tokenBlockReward);
    await riverToken.waitForDeployment(); // Ensures contract is fully deployed
  });

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      expect(await riverToken.owner()).to.equal(owner.address);
    });

    it("Should assign the total supply of tokens to the owner", async function () {
      const ownerBalance = await riverToken.balanceOf(owner.address);
      expect(await riverToken.totalSupply()).to.equal(ownerBalance);
    });

    it("Should set the max capped supply to the argument provided during deployment", async function () {
      const cap = await riverToken.cap();
      expect(cap).to.equal(tokenCap);
    });

    it("Should set the blockReward to the argument provided during deployment", async function () {
      const blockReward = await riverToken.blockReward();
      expect(blockReward).to.equal(tokenBlockReward);
    });
  });

  describe("Transactions", function () {
    it("Should transfer tokens between accounts", async function () {
      await riverToken.transfer(addr1.address, 50);
      const addr1Balance = await riverToken.balanceOf(addr1.address);
      expect(addr1Balance).to.equal(50);

      await riverToken.connect(addr1).transfer(addr2.address, 50);
      const addr2Balance = await riverToken.balanceOf(addr2.address);
      expect(addr2Balance).to.equal(50);
    });

    it("Should fail if sender doesn't have enough tokens", async function () {
      await expect(riverToken.connect(addr1).transfer(owner.address, 1)).to.be
        .reverted;
    });

    it("Should update balances after transfers", async function () {
      const initialOwnerBalance = await riverToken.balanceOf(owner.address);

      await riverToken.transfer(addr1.address, 100);
      await riverToken.transfer(addr2.address, 50);

      const expectedFinalBalance = initialOwnerBalance - 150n;
      const finalOwnerBalance = await riverToken.balanceOf(owner.address);
      expect(finalOwnerBalance).to.equal(expectedFinalBalance);

      expect(await riverToken.balanceOf(addr1.address)).to.equal(100);
      expect(await riverToken.balanceOf(addr2.address)).to.equal(50);
    });
  });
});
