import { ethers, deployments } from "hardhat";

async function main() {
  const deployment = await deployments.get("Reward");
  const contract = await ethers.getContractAt("Reward", deployment.address);

  const tx = await contract.setBaseURI(process.env.METADATA_URL);
  await tx.wait(1);

  console.log(`New baseURI: ${await contract.tokenURI(1)}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
