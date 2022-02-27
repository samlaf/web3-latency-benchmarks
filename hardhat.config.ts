import * as dotenv from "dotenv";

import { HardhatUserConfig, task, types } from "hardhat/config";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import "solidity-coverage";
import { getBalanceBenchmark, pgaBenchmark } from "./benchmarks";

dotenv.config();

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

task(
  "getBalanceBenchmark",
  "Benchmark the getBalance call on many different nodes"
)
  .addOptionalPositionalParam(
    "nCalls",
    "number of calls to make to each node",
    25,
    types.int
  )
  .setAction(async ({ nCalls }, hre) => {
    await getBalanceBenchmark(nCalls, hre);
  });

task(
  "pgaBenchmark",
  "Benchmark a sequence of pga txs with increase gasFees on many different nodes"
).setAction(async (_, hre) => {
  await pgaBenchmark(hre);
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

const config: HardhatUserConfig = {
  solidity: "0.8.4",
  networks: {
    ropsten: {
      url: process.env.INFURA_ROPSTEN_URL,
      accounts: {
        mnemonic: process.env.MNEMONIC,
      },
    },
    ethereum: {
      chainId: 1,
      url: process.env.INFURA_ETHEREUM_URL,
      accounts: {
        mnemonic: process.env.MNEMONIC,
      },
    },
    polygon: {
      chainId: 137,
      url: process.env.INFURA_POLYGON_URL,
      accounts: {
        mnemonic: process.env.MNEMONIC,
      },
    },
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
};

export default config;
