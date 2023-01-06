// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

let BANK = "0x07CDfA7A454Ef05db08c9C11261A222392EDB696";
let API_KEY = "vZF-bLS5x-6QJAXdpq-LNZ4S2_TZi2_P";
let PRIVATEKEY =
	"0xc7e1504b88e4427aa61ca1e3d2bedd49c40b2c051a3288331366ed7100d72989";

async function main() {
	const balance = await hre.ethers.provider.getBalance(
		"0x07CDfA7A454Ef05db08c9C11261A222392EDB696"
	);
	console.log("Contract balance:", hre.ethers.utils.formatEther(balance));

	// Provider
	const alchemyProvider = new ethers.providers.AlchemyProvider(
		(network = "maticmum"),
		API_KEY
	);

	// Signer
	const signer = new ethers.Wallet(PRIVATEKEY, alchemyProvider);

	const contract = require("../artifacts/contracts/VulnBank.sol/VulnBank.json");

	// Contract
	const bankContract = new ethers.Contract(BANK, contract.abi, signer);

	await bankContract.deposit({
		value: ethers.utils.parseEther("1"),
	});
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});
