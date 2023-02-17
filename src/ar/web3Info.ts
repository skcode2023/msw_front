import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import config from "@utils/web3/config";

interface initialStateType {
  tokenName: string; //代币名称
  tokenDecimals: number; //代币精度
  nativeTokenName: string; //原生币名称
  nativeTokenDecimals: number; //原生币精度
  metaDataBaseURI: string; //获取元数据基础地址 https://mountainseaworld.on.fleek.co/nft/json/{id}.json
  marketServiceCahrge: number; //市场交易税
  marketNFTList: NFTCard[]; //商城列表数据
  marketEventList: MarketEvent[]; //商城上架列表
  marketBuyEventList: MarketBuyEvent[]; //商城购买记录
  myNftListForAddress: string; //我的nft列表对应的账户地址
  myNftList: NFTCard[]; //我的NFT列表
  myStakeNftListForAddress:string;
  myStakeNftList: NFTCard[];
  Cards: { [key: string]: Card }; //nft数据内容
}

//初始值
const initialState: initialStateType = {
  tokenName: "",
  tokenDecimals: 18,
  nativeTokenName: config.TokenName,
  nativeTokenDecimals: config.tokenDecimals,
  metaDataBaseURI: "",
  marketServiceCahrge: 0,
  marketNFTList: [],
  marketEventList: [],
  marketBuyEventList: [],
  myNftListForAddress: "",
  myNftList: [],
  myStakeNftListForAddress: "",
  myStakeNftList: [],
  Cards: {},
};

export const web3Info = createSlice({
  name: "web3Info",
  initialState: initialState,
  reducers: {
    setTokenInfo: (
      state,
      action: PayloadAction<{
        tokenName: string;
        tokenDecimals: number;
      }>
    ) => {
      state.tokenName = action.payload.tokenName;
      state.tokenDecimals = action.payload.tokenDecimals;
    },
    setMetaDataBaseURL: (state, action: PayloadAction<string>) => {
      state.metaDataBaseURI = action.payload;
      console.log(action.payload)
    },
    setMarketNftList: (state, action: PayloadAction<NFTCard[]>) => {
      state.marketNFTList = action.payload;
    },
    setMarketEventList: (state, action: PayloadAction<MarketEvent[]>) => {
      state.marketEventList = action.payload;
    },
    setMarketBuyEventList: (state, action: PayloadAction<MarketBuyEvent[]>) => {
      state.marketBuyEventList = action.payload;
    },
    setMyNftList: (
      state,
      action: PayloadAction<{ list: NFTCard[]; account: string }>
    ) => {
      state.myNftList = action.payload.list;
      state.myNftListForAddress = action.payload.account;
    },
    setMyStakeNftList: (
      state,
      action: PayloadAction<{ list: NFTCard[]; account: string }>
    ) => {
      state.myStakeNftList = action.payload.list;
      state.myStakeNftListForAddress = action.payload.account;
    },
    setMarketServiceCharge: (state, action: PayloadAction<number>) => {
      state.marketServiceCahrge = action.payload;
    },
    setCard: (state, action: PayloadAction<Card>) => {
      state.Cards[action.payload.nftId] = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setTokenInfo,
  setMetaDataBaseURL,
  setMarketNftList,
  setMarketEventList,
  setMarketBuyEventList,
  setMyNftList,
  setMarketServiceCharge,
  setCard,
  setMyStakeNftList
} = web3Info.actions;

export default web3Info.reducer;
