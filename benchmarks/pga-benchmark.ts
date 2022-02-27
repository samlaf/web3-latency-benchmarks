import { HardhatRuntimeEnvironment } from "hardhat/types";
import { getProviders } from "../providers";
const { Table } = require("console-table-printer");

export async function pgaBenchmark(hre: HardhatRuntimeEnvironment) {
  const { ethers, network } = hre;
  const providers = getProviders(hre)[hre.network.name];

  if (!process.env.MNEMONIC) {
    throw new Error("Must set var MNEMONIC");
  }
  const signer = ethers.Wallet.fromMnemonic(process.env.MNEMONIC);
  const nonce = await ethers.provider.getTransactionCount(signer.address);

  const rows = [];
  for (
    let feePerGas = 20e9;
    feePerGas < 35e9;
    feePerGas = Math.ceil(feePerGas * 1.101)
  ) {
    const row: Record<string, number> = {fee: feePerGas}
    await Promise.all(
      Object.entries(providers).map(async ([name, provider], i) => {
        const signerProvider = signer.connect(provider);
        const before = Date.now();
        await signerProvider.sendTransaction({
          to: signer.address,
          value: 0,
          nonce: nonce + i,
          maxFeePerGas: feePerGas,
          maxPriorityFeePerGas: feePerGas
        });
        const after = Date.now();
        row[name] = after - before ;
      })
    );
    rows.push(row);
  }

  const table = new Table({
    title: `pga latency on ${hre.network.name}`,
  })
  for (let row of rows) {
    table.addRow(row)
  }
  table.printTable();
}
