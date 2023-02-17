import Web3 from "web3";
import { AbiItem } from "web3-utils";
import config from "@utils/web3/config";
import Token from "@abi/Token.sol/Token.json";
import Props from "@abi/Props.sol/Props.json";
import Cards from "@abi/Cards.sol/Cards.json";
import Store from "@abi/Store.sol/Store.json";
import Box from "@abi/Box.sol/Box.json";
import Mine from "@abi/Mine.sol/Mine.json";
import Market from "@abi/Market.sol/Market.json";

export interface Web3ObjectType {
  web3: Web3;
  ContractToken: any;
  ContractProps: any;
  ContractCards: any;
  ContractStore: any;
  ContractBox: any;
  ContractMarket: any;
  ContractMine: any;
}

export default class Web3Object {
  web3: Web3;
  ContractToken: any;
  ContractProps: any;
  ContractCards: any;
  ContractStore: any;
  ContractBox: any;
  ContractMarket: any;
  ContractMine: any;
  constructor(provider: any) {
    this.web3 = new Web3(provider);
    this.ContractToken = new this.web3.eth.Contract(
      Token.abi as AbiItem | AbiItem[],
      config.TokenAddress
    );
    this.ContractProps = new this.web3.eth.Contract(
      Props.abi as AbiItem | AbiItem[],
      config.PropsAddress
    );
    this.ContractCards = new this.web3.eth.Contract(
      Cards.abi as AbiItem | AbiItem[],
      config.CardsAddress
    );
    this.ContractStore = new this.web3.eth.Contract(
      Store.abi as AbiItem | AbiItem[],
      config.StoreAddress
    );
    this.ContractBox = new this.web3.eth.Contract(
      Box.abi as AbiItem | AbiItem[],
      config.BoxAddress
    );
    this.ContractMarket = new this.web3.eth.Contract(
      Market.abi as AbiItem | AbiItem[],
      config.MarketAddress
    );
    this.ContractMine = new this.web3.eth.Contract(
      Mine.abi as AbiItem | AbiItem[],
      config.MineAddress
    );
  }
}
