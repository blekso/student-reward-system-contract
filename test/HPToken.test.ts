import { ethers, deployments } from "hardhat";
import { utils } from "ethers";
import { expect } from "chai";

import { HPTokenMock__factory } from "../typechain/factories/HPTokenMock__factory";
import { HPTokenMock } from "../typechain/HPTokenMock";

const TEST_BASE_URI = "https://backendv2.cryptoposta.marrowlabs.com/v4/stamp/";

function getRandomInt(max: number): number {
  return Math.floor(Math.random() * max);
}

function generateAccessControlError(address: string, role: string) {
  return `AccessControl: account ${address} is missing role ${role}`;
}

describe("CryptoPosta NFT tests", () => {

  const testSetup = deployments.createFixture(async () => {
    await deployments.fixture();
    const [deployer, testAccount, testMinter] = await ethers.getSigners();

    const HPTokenFactory = await ethers.getContractFactory(
      "HPTokenMock"
    ) as HPTokenMock__factory;
  
    const HPToken = await HPTokenFactory.deploy(
      TEST_BASE_URI,
      [testMinter.address]
    ) as HPTokenMock;

    return {
      HPToken,
      deployer,
      testAccount,
      testMinter
    }
  });

  describe('Constructor', () => {
    it('Should properly setup contract', async () => {
      const { HPToken, deployer, testMinter } = await testSetup();

      expect(await HPToken.hasRole(await HPToken.DEFAULT_ADMIN_ROLE(), deployer.address)).to.be.true;
      expect(await HPToken.hasRole(await HPToken.MINTER_ROLE(), deployer.address)).to.be.true;
      expect(await HPToken.hasRole(await HPToken.MINTER_ROLE(), testMinter.address)).to.be.true;
    });
  });

  describe('SetBaseURI', () => {
    const testURI = 'TestURI';

    it('Should fail when caller not admin', async () => {
      const { HPToken, testAccount } = await testSetup();

      await expect(HPToken.connect(testAccount).setBaseURI(testURI)).to.be.revertedWith(
        generateAccessControlError(
          testAccount.address.toLocaleLowerCase(),
          await HPToken.DEFAULT_ADMIN_ROLE()
        )
      );
    });

    it('Should change base URI when caller admin', async () => {
      const { HPToken, deployer } = await testSetup();

      await HPToken.connect(deployer).setBaseURI(testURI);
      // FIXME add check or read
    });
  });

  describe('MintMultiple', () => {
    it('Should fail when sender not minter');
    it('Should mint proper tokens to proper accounts');
  });

  describe('Claim', () => {
    const testTokenId = 1000;

    it('Should fail when signer is not minter', async () => {
      const { HPToken, testAccount } = await testSetup();
      const signature = await testAccount.signMessage(utils.arrayify(
        utils.solidityKeccak256(
          ["uint256[]", "address"], [[testTokenId], testAccount.address]
        )
      ));

      await expect(HPToken.claim(
        [testTokenId], testAccount.address, signature))
        .to.revertedWith('Signer not minter');
    });

    it('Should fail when invalid receiver passed', async () => {
      const { HPToken, testMinter, testAccount } = await testSetup();
      const signature = await testMinter.signMessage(utils.arrayify(
        utils.solidityKeccak256(
          ["uint256[]", "address"], [[testTokenId], testMinter.address]
        )
      ));

      await expect(HPToken.connect(testMinter).claim(
        [testTokenId], testAccount.address, signature))
        .to.be.revertedWith('Signer not minter');
    });

    it('Should fail when token ID bellow minimum identifier', async () => {
      const { HPToken, testMinter, testAccount } = await testSetup();
      const invalidTokenID = (await HPToken.MIN_CLAIM_TOKEN_ID()).toNumber() - 1;
      const signature = await testMinter.signMessage(utils.arrayify(
        utils.solidityKeccak256(
          ["uint256[]", "address"], [[invalidTokenID], testAccount.address]
        )
      ));

      await expect(HPToken.connect(testMinter).claim(
        [invalidTokenID], testAccount.address, signature)
      ).to.be.revertedWith('Invalid claim token ID');
    });

    it('Should fail when token ID above maximum identifier', async () => {
      const { HPToken, testMinter, testAccount } = await testSetup();
      const invalidTokenID = (await HPToken.MAX_CLAIM_TOKEN_ID()).toNumber() + 1;
      const signature = await testMinter.signMessage(utils.arrayify(
        utils.solidityKeccak256(
          ["uint256[]", "address"], [[invalidTokenID], testAccount.address]
        )
      ));

      await expect(HPToken.connect(testMinter).claim(
        [invalidTokenID], testAccount.address, signature)
      ).to.be.revertedWith('Invalid claim token ID');
    });

    it('Should mint defined token when signer has minter role', async () => {
      const { HPToken, testMinter, testAccount } = await testSetup();

      const previousSupply = await HPToken.totalSupply();
      const signature = await testMinter.signMessage(utils.arrayify(
        utils.solidityKeccak256(
          ["uint256[]", "address"], [[testTokenId], testAccount.address]
        )
      ));

      await HPToken.connect(testMinter).claim([testTokenId], testAccount.address, signature);

      expect(await HPToken.ownerOf(testTokenId)).to.be.eq(testAccount.address);
      expect(await HPToken.totalSupply()).to.be.eq(previousSupply.toNumber() + 1);
    });
  });

  describe('IsMinter', () => {
    it('Should return proper value when account does not have minter role');
    it('Should return proper value when account has minter role');
  });

  describe('TokenURI', () => {
    it("Should successfully return the proper token URI based on token ID", async function () {
      const { HPToken } = await testSetup();
      const randomTokenId = getRandomInt(1000);
      const tokenURI = await HPToken.tokenURI(randomTokenId);

      expect(tokenURI).to.be.equal(`${TEST_BASE_URI}${randomTokenId}`);
    });
  });
});
