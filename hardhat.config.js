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
		hardhat: {
			mining: {
				auto: false,
				interval: 0,
				mempool: {
					order: "priority",
				},
			},
		},
		hardhatx: {
			url: "http://127.0.0.1:8545",
			accounts: [
				`0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d`,
			],
		},
		ganache: {
			url: "http://127.0.0.1:7545",
			accounts: [
				`0x89a8a17751db1eb5faf578d8bd0debfc0c0d45712a8ab0720ebc98d9ac4021b1`,
			],
		},
		mumbai: {
			url: "https://polygon-mumbai.g.alchemy.com/v2/vZF-bLS5x-6QJAXdpq-LNZ4S2_TZi2_P",
			accounts: [
				`0xc7e1504b88e4427aa61ca1e3d2bedd49c40b2c051a3288331366ed7100d72989`,
			],
			allowUnlimitedContractSize: true,
		},
	},
};
