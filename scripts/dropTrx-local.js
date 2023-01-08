// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const helpers = require("@nomicfoundation/hardhat-network-helpers");

async function main() {
	const txHash =
		"0x6d1bfcfd97bf6faab70dec4d680dad2dfd9bc699f3200c2d9f399207a1dd7e85";
	await helpers.dropTransaction(txHash);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});
