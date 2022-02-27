import { JsonRpcProvider } from "@ethersproject/providers";
import { HardhatRuntimeEnvironment } from "hardhat/types";

export function getProviders({
  ethers,
}: HardhatRuntimeEnvironment): Record<string, Record<string, JsonRpcProvider>> {
  return {
    polygon: {
      metamask: new ethers.providers.JsonRpcProvider(
        "https://polygon-rpc.com/"
      ),
      infura: new ethers.providers.JsonRpcProvider(
        "https://polygon-mainnet.infura.io/v3/KEY"
      ),
      alchemy: new ethers.providers.JsonRpcProvider(
        "https://polygon-mainnet.g.alchemy.com/v2/KEY"
      ),
      moralis: new ethers.providers.JsonRpcProvider(
        "https://speedy-nodes-nyc.moralis.io/KEY/polygon/mainnet"
      ),
      aws: new ethers.providers.JsonRpcProvider("http://AWS_PRIVATE_IP:8545"),
      // localhost: new ethers.providers.JsonRpcProvider("http://localhost:8545"),
      // ipc: new ethers.providers.IpcProvider(process.env.IPC_PATH),
    },
    ethereum: {
      metamask: new ethers.providers.JsonRpcProvider(
        "https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161"
      ),
      infura: new ethers.providers.JsonRpcProvider(
        "https://mainnet.infura.io/v3/KEY"
      ),
      alchemy: new ethers.providers.JsonRpcProvider(
        "https://eth-mainnet.alchemyapi.io/v2/KEY"
      ),
    },
  };
}
