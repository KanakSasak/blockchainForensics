// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

let BANK = "0xAd5d57aD9bB17d34Debb88566ab2F5dB879Cc46F";
let API_KEY = "vZF-bLS5x-6QJAXdpq-LNZ4S2_TZi2_P";
let PRIVATEKEY =
	"0xc7e1504b88e4427aa61ca1e3d2bedd49c40b2c051a3288331366ed7100d72989";

async function main() {
	const balance = await hre.ethers.provider.getBalance(BANK);
	console.log("Contract balance:", hre.ethers.utils.formatEther(balance));

	// Provider
	const alchemyProvider = new ethers.providers.AlchemyProvider(
		(network = "maticmum"),
		API_KEY
	);

	const provider = new ethers.providers.JsonRpcProvider(
		"http://127.0.0.1:8545/"
	);

	// These are Harhdat's deterministic accounts
	// NEVER SEND REAL FUNDS TO THESE ACCOUNTS!
	const account0 = new ethers.Wallet(
		"0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d",
		provider
	);

	// Signer
	const signer = new ethers.Wallet(PRIVATEKEY, alchemyProvider);
	const [signerLocal, addr1] = await ethers.getSigners(); //must use first signer

	const contract = require("../artifacts/contracts/VulnBank.sol/VulnBank.json");

	// Contract
	const bankContract = new ethers.Contract(BANK, contract.abi, account0);

	await bankContract.deposit({
		value: ethers.utils.parseEther("2"),
	});
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});
