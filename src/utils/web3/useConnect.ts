import { useWeb3React } from "@web3-react/core";
import { message } from "antd";
import { ConnectorNames, connectorsByName, getErrorMessage } from "./functions";
import config from "./config";
import { useTranslation } from "react-i18next";

export default function useConnect() {
  const { active, activate, deactivate } = useWeb3React();
  const { t } = useTranslation();

  async function connectMetaMask() {
    if (!(window.ethereum && window.ethereum.isMetaMask)) {
      //判断是否安装metamask
      message.error(t("message.pim"));
      return Promise.reject();
    }
    return await new Promise((resolve, reject) => {
      //切换链与添加链
      window.ethereum
        .request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: "0x" + Number(config.chainId).toString(16) }],
        })
        .then(() => setTimeout(resolve, 500))
        .catch((switchError: any) => {
          if (switchError.code === 4902)
            window.ethereum
              .request({
                method: "wallet_addEthereumChain",
                params: [
                  {
                    chainId: "0x" + Number(config.chainId).toString(16),
                    chainName: config.chainName,
                    rpcUrls: [config.rpc],
                  },
                ],
              })
              .then(() => setTimeout(resolve, 500))
              .catch((err: any) => reject(err));
          else reject(switchError);
        });
    }).then(async () => {
      //登录
      return await activate(connectorsByName[ConnectorNames.Injected])
        .then(() => {
          window.sessionStorage.setItem(
            "connectorName",
            ConnectorNames.Injected
          );
        })
        .catch((err) => {
          message.error(getErrorMessage(err));
        });
    });
  }

  async function connectWallet() {
    return await activate(connectorsByName[ConnectorNames.WalletConnect])
      .then(() => {
        window.sessionStorage.setItem(
          "connectorName",
          ConnectorNames.WalletConnect
        );
      })
      .catch((err) => {
        message.error(getErrorMessage(err));
      });
  }

  async function connectBinance() {
    if (!(window.BinanceChain && window.BinanceChain.chainId)) {
      //判断是否安装metamask
      message.error(t("message.pib"));
      return Promise.reject();
    }
    return new Promise((resolve, reject) => {
      if (
        window.BinanceChain.chainId ===
        "0x" + Number(config.chainId).toString(16)
      ) {
        setTimeout(resolve, 500);
      } else {
        window.BinanceChain.switchNetwork(config.chainIdName)
          .then(() => {
            setTimeout(resolve, 500);
          })
          .catch((err: any) => {
            if (err.code === 4902) {
              message.warn(`${t("message.pat")}:${config.chainId}`);
            }
            reject(err);
          });
      }
    }).then(async () => {
      return await activate(connectorsByName[ConnectorNames.Bsc])
        .then(() => {
          window.sessionStorage.setItem("connectorName", ConnectorNames.Bsc);
        })
        .catch((err) => {
          message.error(getErrorMessage(err));
        });
    });
  }

  //断开连接
  async function deConnect() {
    if (active) {
      deactivate();
      window.sessionStorage.setItem("connectorName", ConnectorNames.Network);
    }
  }

  return { connectMetaMask, connectWallet, connectBinance, deConnect };
}
