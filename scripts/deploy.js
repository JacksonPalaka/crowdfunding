// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function getBalances(address) {
  const balancebigInt = await hre.ethers.provider.getBalance(address);
  return hre.ethers.utils.formatEther(balancebigInt);
}

async function consoleBalance(addresses) {
  let counter = 0;
  for (const address of addresses) {
    console.log(`Address ${counter} balance:`, await getBalances(address));
    counter++;
  }
}

async function consoleMemos(memos) {
  for (const memo of memos) {
    const timestamp = memo.timestamp;
    const name = memo.name;
    const address = memo.from;
    const message = memo.message;

    console.log(`At ${timestamp},name: ${name}, from ${address},message:${message}`)
  }
}

async function main() {
  const [owner, from1, from2, from3] = await hre.ethers.getSigners();
  const chai = await hre.ethers.getContractFactory('chai');
  const contract = await chai.deploy();

  await contract.deployed();
  console.log("Address of contract", contract.address);

  const address = [owner.address, from1.address, from2.address, from3.address];
  console.log("Before buying chai");
  await consoleBalance(address);

  const amount = { value: hre.ethers.utils.parseEther("1") };
  await contract.connect(from1).buyChai("from1", "very nice course", amount)
  await contract.connect(from2).buyChai("from2", "very nice information", amount)
  await contract.connect(from3).buyChai("from3", "very nice content", amount)

  console.log("After buying chai");
  await consoleBalance(address);

  const memos = await contract.getMemos();
  consoleMemos(memos);
}
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
