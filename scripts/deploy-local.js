// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

let PRIVATEKEY =
	"0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d";
let API_KEY = "vZF-bLS5x-6QJAXdpq-LNZ4S2_TZi2_P";

let PRIVATEKEYATTACK =
	"0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a";

async function main() {
	const currentTimestampInSeconds = Math.round(Date.now() / 1000);
	const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
	const unlockTime = currentTimestampInSeconds + ONE_YEAR_IN_SECS;

	// Provider
	const alchemyProvider = new ethers.providers.AlchemyProvider(
		(network = "maticmum"),
		API_KEY
	);

	const provider = new ethers.providers.JsonRpcProvider(
		"http://127.0.0.1:8545/"
	);

	const providergahache = new ethers.providers.JsonRpcProvider(
		"http://127.0.0.1:7545/"
	);

	// Signer
	const signer = new ethers.Wallet(PRIVATEKEY, alchemyProvider);
	const signerattack = new ethers.Wallet(PRIVATEKEYATTACK, alchemyProvider);

	// These are Harhdat's deterministic accounts
	// NEVER SEND REAL FUNDS TO THESE ACCOUNTS!
	const account0 = new ethers.Wallet(
		"0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d",
		provider
	);
	const account1 = new ethers.Wallet(
		"0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a",
		provider
	);
	// const account19 = new ethers.Wallet(
	// 	"0xdf57089febbacf7ba0bc227dafbffa9fc08a93fdc68e1e42411a14efcf23656e",
	// 	provider
	// );

	const [owner, addr1] = await ethers.getSigners(); //must use first signer
	const [attacker, addr2] = await ethers.getSigners(); //must use first signer

	const BankFactory = await hre.ethers.getContractFactory("VulnBank", account0);
	this.bankContract = await BankFactory.deploy();

	await this.bankContract.deposit({
		value: ethers.utils.parseEther("1"),
	});
	// await this.bankContract
	// 	.connect(owner)
	// 	.deposit({ value: ethers.utils.parseEther("1") });

	const AttackerFactory = await hre.ethers.getContractFactory(
		"Attacker",
		account1
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
	// console.log(`${signer.address}`);
	// console.log(`${signerattack.address}`);
	console.log(`${account0.address}`);
	console.log(`${account1.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});
