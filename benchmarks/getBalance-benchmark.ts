import { HardhatRuntimeEnvironment } from "hardhat/types";
import { mean, std } from "mathjs";
import { getProviders } from "../providers"
const { Table } = require("console-table-printer");

export async function getBalanceBenchmark(nCalls: number, hre: HardhatRuntimeEnvironment) {
  const acct = (await hre.ethers.provider.listAccounts())[0];
  const providers = getProviders(hre)[hre.network.name]

  const rows = await Promise.all(Object.entries(providers).map(async ([name,provider]) => {
    console.log("Provider %s: %s", name, provider.connection.url);
    const times = []
    for (let i = 0; i < nCalls; i++) {
      const before = Date.now();
      await provider.getBalance(acct);
      const after = Date.now();
      times.push(after - before);
    }
    return {endpoint: name, mean: mean(times), std: std(times)};
  }));

  const table = new Table({
    title: `getBalance latency on ${hre.network.name} (${nCalls} calls)`,
  })
  for (let row of rows) {
    table.addRow(row)
  }
  table.printTable();

}
