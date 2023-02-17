import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React, Web3ReactProvider } from "@web3-react/core";
import { useMemoizedFn } from "ahooks";
import { useEffect, useState } from "react";
import { message } from "antd";
import Web3Object, { Web3ObjectType } from "./web3Object";
import config from "./config";
import { ConnectorNames, connectorsByName } from "./functions";
import { Web3Context } from "./useWeb3Object";
import { useTranslation } from "react-i18next";

export default function MyWeb3ReactProvider({
  children,
}: {
  children: JSX.Element;
}) {
  const getLibrary = useMemoizedFn((provider: any): Web3Provider => {
    const library = new Web3Provider(provider);
    library.pollingInterval = 12000;
    return library;
  });
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Provider>{children}</Provider>
    </Web3ReactProvider>
  );
}

/**重连和注册合约 */
function Provider({ children }: { children: JSX.Element }) {
  const { active, activate, library, chainId } = useWeb3React();
  // const context = useWeb3React();
  
  const { t } = useTranslation();

  //metamask链接
  const connectInject = useMemoizedFn(() => {
    const connector = connectorsByName[ConnectorNames.Injected];
    connector.isAuthorized().then((isAuthorized: boolean) => {
      if (isAuthorized) {
        activate(connector, undefined, true).catch(() => {
          connectNetWord();
        });
      } else {
        connectNetWord();
      }
    });
  });
  //imtoken连接
  const connectWallet = useMemoizedFn(() => {
    const connector = connectorsByName[ConnectorNames.WalletConnect];
    console.log(connector);
    activate(connector, undefined, true).catch(() => {
      connectNetWord();
    });
  });
  //币安连接
  const connectBinance = useMemoizedFn(() => {
    const connector = connectorsByName[ConnectorNames.Bsc];
    connector.isAuthorized().then((isAuthorized: boolean) => {
      if (isAuthorized) {
        activate(connector, undefined, true).catch(() => {
          connectNetWord();
        });
      } else {
        connectNetWord();
      }
    });
  });
  //默认连接
  const connectNetWord = useMemoizedFn(() => {
    const connector = connectorsByName[ConnectorNames.Network];
    activate(connector)
      .then(() => {
        window.sessionStorage.setItem("connectorName", ConnectorNames.Network);
      })
      .catch(() => {
        message.error(t("message.ne"));
      });
  });

  useEffect(() => {
    //初始化链接，默认链接network
    if (window.isPhone) {
      //手机端
      if (window.ethereum && window.ethereum.isMetaMask) {
        //如果是metamask打开
        window.ethereum
          .request({
            method: "eth_requestAccounts",
          })
          .finally(() => {
            connectInject();
            window.sessionStorage.setItem(
              "connectorName",
              ConnectorNames.Injected
            );
          });
      } else {
        //使用imtoken或其他浏览器打开
        // connectWallet();
        connectNetWord();
      }
    } else {
      //pc端
      const connectorName = window.sessionStorage.getItem("connectorName");
      switch (connectorName) {
        case ConnectorNames.Injected:
          connectInject();
          break;
        case ConnectorNames.WalletConnect:
          connectWallet();
          break;
        case ConnectorNames.Bsc:
          connectBinance();
          break;
        default:
          connectNetWord();
          break;
      }
    }
  }, [connectInject, connectWallet, connectBinance, connectNetWord]);

  const [web3Object, setWeb3Object] = useState<Web3ObjectType | null>(null);
  useEffect(() => {
    if (!active) {
      return;
    }
    if (chainId !== config.chainId) {
      message.warn(`${t("message.psw")} ${config.chainName}`);
      return;
    }
    if (library) {
      setWeb3Object(new Web3Object(library?.provider || config.rpc));
    } else {
      setWeb3Object(new Web3Object(config.rpc));
    }
  }, [library, chainId, active, t]);

  useEffect(() => {
    window.web3Object = web3Object;
  }, [web3Object]);

  return (
    <Web3Context.Provider value={web3Object}>{children}</Web3Context.Provider>
  );
}
