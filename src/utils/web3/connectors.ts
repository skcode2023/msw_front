import { InjectedConnector } from "@web3-react/injected-connector";
import { NetworkConnector } from "@web3-react/network-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { BscConnector } from "@binance-chain/bsc-connector";
import config from "@utils/web3/config";

export const injected = new InjectedConnector({});

export const network = new NetworkConnector({
  urls: { [config.chainId]: config.rpc },
  defaultChainId: config.chainId,
});

export const walletconnect = new WalletConnectConnector({
  qrcode: true,
  rpc: { [config.chainId]: config.rpc },
  chainId: config.chainId,
});

export const bsc = new BscConnector({});
