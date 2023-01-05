require("@nomiclabs/hardhat-waffle");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
	const accounts = await hre.ethers.getSigners();

	for (const account of accounts) {
		console.log(account.address);
	}
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
	solidity: "0.8.4",
	networks: {
		local: {
			//url: "https://polygon-mumbai.g.alchemy.com/v2/vZF-bLS5x-6QJAXdpq-LNZ4S2_TZi2_P",
			url: "http://127.0.0.1:8545",
			accounts: [
				`0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80`,
			],
		},
		local2: {
			//url: "https://polygon-mumbai.g.alchemy.com/v2/vZF-bLS5x-6QJAXdpq-LNZ4S2_TZi2_P",
			url: "http://127.0.0.1:7545",
			accounts: [
				`0x1debfcaa92eb6048313d4e4576bc847324554bb8fce3de4c2fb9b67d285b9f16`,
			],
		},
		mumbai: {
			url: "https://polygon-mumbai.g.alchemy.com/v2/vZF-bLS5x-6QJAXdpq-LNZ4S2_TZi2_P",
			accounts: [
				`0xc7e1504b88e4427aa61ca1e3d2bedd49c40b2c051a3288331366ed7100d72989`,
			],
		},
	},
};
