import { ethers, deployments } from "hardhat";

async function main() {
  //const deployment = await deployments.get("Reward");
  const contract = await ethers.getContractAt(
    "Reward",
    "0x63de1209f9470866da4ec357c78f22ec69aaa1a7"
  );

  /* const tx = await contract.setBaseTokenURI(
    "https://studoreward.xyz/api/reward/metadata/1"
  );
  await tx.wait(1); */

  console.log(`New baseURI: ${await contract.tokenURI(1)}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
