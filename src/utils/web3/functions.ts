import { bsc, injected, network, walletconnect } from "@utils/web3/connectors";
import {
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected,
} from "@web3-react/injected-connector";
import { UserRejectedRequestError as UserRejectedRequestErrorWalletConnect } from "@web3-react/walletconnect-connector";
import {
  NoBscProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorBinanceConnect,
} from "@binance-chain/bsc-connector";
import { UnsupportedChainIdError } from "@web3-react/core";

/**连接器名字枚举 */
export enum ConnectorNames {
  Injected = "Injected",
  Network = "Network",
  WalletConnect = "WalletConnect",
  Bsc = "Bsc",
}

/**连接器通过名字整合 */
export const connectorsByName: { [connectorName in ConnectorNames]: any } = {
  [ConnectorNames.Injected]: injected,
  [ConnectorNames.Network]: network,
  [ConnectorNames.WalletConnect]: walletconnect,
  [ConnectorNames.Bsc]: bsc,
};

/**通过错误信息判断是什么错 */
export const getErrorMessage = (error: Error) => {
  if (error instanceof NoEthereumProviderError) {
    return "No Ethereum browser extension detected, install MetaMask on desktop or visit from a dApp browser on mobile.";
  } else if (error instanceof NoBscProviderError) {
    return "No Ethereum browser extension detected, install Binance on desktop or visit from a dApp browser on mobile.";
  } else if (error instanceof UnsupportedChainIdError) {
    return "Please use BSC network.";
  } else if (
    error instanceof UserRejectedRequestErrorInjected ||
    error instanceof UserRejectedRequestErrorWalletConnect ||
    error instanceof UserRejectedRequestErrorBinanceConnect
  ) {
    return "Please authorize this website to access your Ethereum account.";
  } else {
    console.error(error);
    return "An unknown error occurred. Check the console for more details.";
  }
};
