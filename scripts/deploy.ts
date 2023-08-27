import { deployments, getNamedAccounts } from "hardhat";

async function main() {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  const tx = await deploy("Reward", {
    from: deployer,
    args: ["https://studoreward.xyz/api/reward/metadata/cinestar/", 100],
  });

  console.log(`Deployed to: ${tx.address}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
