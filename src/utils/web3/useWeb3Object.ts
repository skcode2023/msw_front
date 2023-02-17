import { useAppSelector } from "@ar/hooks";
import { useMemoizedFn } from "ahooks";
import { createContext, useContext } from "react";
import { Web3ObjectType } from "./web3Object";
import Web3 from "web3";
const web3 = new Web3();

export const Web3Context = createContext<Web3ObjectType | null>(null);

export function useWeb3Object() {
  const web3Object = useContext(Web3Context);
  return web3Object;
}

export function useWeb3Utils() {
  const { tokenDecimals, nativeTokenDecimals } = useAppSelector(
    (state) => state.web3Info
  ); //代币精度

  const decimalsToUnit = useMemoizedFn((decimals: number) => {
    switch (decimals) {
      case 6:
        return "mwei";
      default:
        return "ether";
    }
  });
  //传入合约的值
  const toWei = useMemoizedFn((price: number | string) => {
    return web3.utils.toWei(price.toString(), decimalsToUnit(tokenDecimals));
  });

  //从合约获取的值按照精度转为展示
  const fromWei = useMemoizedFn((price: number | string) => {
    return Number(
      web3.utils.fromWei(price.toString(), decimalsToUnit(tokenDecimals))
    );
  });

  //原生币转精度
  const toNativeWei = useMemoizedFn((price: number | string) => {
    return web3.utils.toWei(
      price.toString(),
      decimalsToUnit(nativeTokenDecimals)
    );
  });
  const fromNtiveWei = useMemoizedFn((price: number | string) => {
    return Number(
      web3.utils.fromWei(price.toString(), decimalsToUnit(nativeTokenDecimals))
    );
  });

  return {
    toWei,
    fromWei,
    toNativeWei,
    fromNtiveWei,
  };
}
