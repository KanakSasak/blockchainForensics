// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

let PRIVATEKEY =
	"0xc7e1504b88e4427aa61ca1e3d2bedd49c40b2c051a3288331366ed7100d72989";
let API_KEY = "vZF-bLS5x-6QJAXdpq-LNZ4S2_TZi2_P";

async function main() {
	const currentTimestampInSeconds = Math.round(Date.now() / 1000);
	const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
	const unlockTime = currentTimestampInSeconds + ONE_YEAR_IN_SECS;

	// Provider
	const alchemyProvider = new ethers.providers.AlchemyProvider(
		(network = "maticmum"),
		API_KEY
	);

	// Signer
	const signer = new ethers.Wallet(PRIVATEKEY, alchemyProvider);

	const [owner, addr1] = await ethers.getSigners(); //must use first signer
	const [attacker2, addr2] = await ethers.getSigners(); //must use first signer
	[deployer, user, attacker] = await ethers.getSigners();

	const BankFactory = await hre.ethers.getContractFactory("VulnBank", signer);
	this.bankContract = await BankFactory.deploy();

	await this.bankContract.deposit({
		value: ethers.utils.parseEther("0.0006439"),
	});
	// await this.bankContract
	// 	.connect(owner)
	// 	.deposit({ value: ethers.utils.parseEther("1") });

	const AttackerFactory = await hre.ethers.getContractFactory(
		"Attacker",
		signer
	);
	this.attackerContract = await AttackerFactory.deploy(
		this.bankContract.address
	);

	console.log(
		`VulnBank deployed timestamp ${unlockTime} deployed to ${this.bankContract.address}`
	);

	console.log(
		`Attacker deployed timestamp ${unlockTime} deployed to ${this.attackerContract.address}`
	);
	console.log(`${owner.address}`);
	console.log(`${attacker2.address}`);
	// console.log("");
	// console.log("*** Before ***");
	// console.log(
	// 	`Bank's balance: ${ethers.utils
	// 		.formatEther(await ethers.provider.getBalance(this.bankContract.address))
	// 		.toString()}`
	// );
	// console.log(
	// 	`Attacker's balance: ${ethers.utils
	// 		.formatEther(await ethers.provider.getBalance(attacker2.address))
	// 		.toString()}`
	// );

	// await this.attackerContract.attack({
	// 	value: ethers.utils.parseEther("1"),
	// });

	// console.log("");
	// console.log("*** After ***");
	// console.log(
	// 	`Bank's balance: ${ethers.utils
	// 		.formatEther(await ethers.provider.getBalance(this.bankContract.address))
	// 		.toString()}`
	// );
	// console.log(
	// 	`Attackers's balance: ${ethers.utils
	// 		.formatEther(await ethers.provider.getBalance(attacker2.address))
	// 		.toString()}`
	// );
	// console.log("");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});
