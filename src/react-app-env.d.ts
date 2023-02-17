/// <reference types="react-scripts" />

interface Window {
  web3Object: any;
  ethereum: any;
  BinanceChain: any;
  isPhone: boolean;
  configType?: string; //当前使用的config标记
  consoleSign: boolean; //是否显示console提示
}

// nft市场filter
interface FilterPrice {
  unit: string;
  min?: 0;
  max?: 0;
}
interface FilterBody {
  search: string;
  state: "sale" | "all";
  price: FilterPrice;
  quality: "" | "all" | "0" | "1";
}

//nft市场sort
interface SortBody {
  price: "desc" | "asc" | "";
  time: "newest" | "oldest" | "";
}

//神兽信息 卡片
interface Card {
  nftId: string;
  quality: "0" | "1";
  level: string;
  score: string;
}

interface MarketEvent {
  marketEventIndex: number; //本次交易索引
  sender: string; //卡片出售者
  cardAddress: string; //卡片所在合约地址
  nftId: string; //nftID
  amount: string; //交易数量
  unitAddress: string; //交易货币地址 用于判断货币单位是TUT或BNB
  price: string; //价格 原始数据，未添加精度
  blockNumber: string; //出售时块高度，用于获取上架时间
  timeStamp: string; //出售时间戳
}

interface MarketBuyEvent {
  buyer: string; //卡片购买者
  cardAddress: string; //卡片所在合约地址
  nftId: string; //nftID
  amount: string; //交易数量
  price: string; //价格 原始数据，未添加精度
  blockNumber: string; //购买时块高度，用于获取上架时间
  timeStamp: string; //购买时间戳
  marketEventIndex: string; //卡片上架索引
}

//nft市场卡片信息
interface NFTCard {
  id: string;
  address?: string; //卡片出售者地址
  img: string;
  price: string | number;
  unit?: string;
  time: string;
  quality: "0" | "1";
  amount?: number;
  isSale: boolean;
  level?: string;
  looks?: string; //卡片图片拼接
  blockNumber: number; //卡片交易块高度，获取时间
  timeStamp: string; //卡片最后一次上架的时间戳
  marketEventIndex?: number; //卡片本地交易索引
}

//nft详情
interface NFTDetail extends NFTCard {
  description: string;
  name: string;
  head: string;
  body: string;
  back: string;
  fin: string;
  tail: string;
  flank: string;
  crown: string;
  joint: string;
  transaction: transactionItem[];
}
interface transactionItem {
  blockchain: string;
  token: string;
  price: number | string;
  from: string;
  to: string;
  date: string;
}
