const dev_config = {
  type: "dev",
  chainId: 97, //链id
  chainIdName: "bsc-testnet", //币安钱包链名称-用于币安钱包连接
  rpc: "https://data-seed-prebsc-1-s1.binance.org:8545", //链地址
  chainName: "BSC", //链名称
  scanRpc: "https://testnet.bscscan.com/address/", //区块链浏览器地址
  TokenName: "BNB", //所在链原生币名称
  tokenDecimals: 18, //所在链原生币精度
  nativeTokenAddress: "0x0000000000000000000000000000000000000000", //原生币地址

  TokenAddress:"0x8F8B0FE59C3C90904d389923d597a74D09Ba0ba3",
  PropsAddress:"0x8168927cEA72d6ab73579d2bCaCd4d4e7450B464",
  CardsAddress:"0xE48A5288642309b916cc0dbD304Fb82C7bd1eBB5",
  StoreAddress:"0x5095E9f50C84eD50EBeb1BAA4005cB093725F9b9",
  BoxAddress:"0x85f446DcA00228ef049D722E0B178C9F3D637F93",
  MarketAddress:"0xB67b4227d6316a11A980E7Ab1395B5e4452d7F95",
  MineAddress:"0x271bCE0cD4775C5B68F0f58D17Bd1EEB62401f59",
  BOXTokenId: 1, //盲盒id
  CardTokenId: 2, //工会卡id

  ajaxUrl: "https://api-testnet.bscscan.com/api", //bsc测试链事件请求地址
  apiKey: "JJJ37IHZKYU6AX25IQ27CN6UZY1HZYFW5H", //bsc测试链事件请求需要的apikey

  maxNftNumber: 2000, //card合约生成的最大nft数量
};


// TokenAddress: "0x172ACA9307D3546b7b4E9986a428469DdaEcfc47",
// PropsAddress: "0xe249650b41c033b298E6ad2C10dCEcb155841Fee",
// CardsAddress: "0x742df8aBeA1D32a1620Ea1B526B28c195739f115",
// StoreAddress: "0x2E28894CAC623A93D5463588869dE8b0bb38BbB1",
// BoxAddress: "0xD5F84304116EabB0bDBd74Df93D59925c871893A",
// MarketAddress: "0x7192F17969DB1dFF46FE48fC61783F6eeB870618",


//正式链
const prd_config = {
  type: "prd",
  chainId: 56, //链id
  chainIdName: "bsc", //币安钱包链名称-用于币安钱包连接
  rpc: "https://bsc-dataseed1.ninicoin.io", //链地址
  chainName: "BSC", //链名称
  scanRpc: "https://bscscan.com/address/", //区块链浏览器地址
  TokenName: "BNB", //所在链原生币名称
  tokenDecimals: 18, //所在链原生币精度
  nativeTokenAddress: "0x0000000000000000000000000000000000000000", //原生币地址

  TokenAddress: "0xA62f7a97722f47907161d913948A3543c6F48FcE",
  PropsAddress: "0x0d015FCDbE62070814cf3b3261A7611AE72b40D5",
  CardsAddress: "0x571f7ca7A1D155257C41240A3cE5C6698C3DEDc4",
  StoreAddress: "0x34921227D15f49fa821E32E299c166ECAd9940C5",
  BoxAddress: "0x839b37035c90E847d2778aab0a608593DD2B3402",
  MarketAddress: "0x851BF6727DdF9EB2989258647c2B0d22Df74C11C",

  MineAddress: "0x571f7ca7A1D155257C41240A3cE5C6698C3DEDc4",
  BOXTokenId: 1, //盲盒id
  CardTokenId: 2, //工会卡id

  ajaxUrl: "https://api.bscscan.com/api", //bsc测试链事件请求地址
  apiKey: "KDFT5SYSNNFUBPEZI1113JE2NIAAKV7CW7", //bsc测试链事件请求需要的apikey

  maxNftNumber: 2000, //card合约生成的最大nft数量
};

const { REACT_APP_ENV } = process.env;
const config = REACT_APP_ENV === "prd" ? prd_config : dev_config;
window.configType = config.type; //全局添加配置标记，方便查看
export default config;



// TokenAddress: "0xF8b1f2cc08df2aacc43C547AA465e27ACB2856e2",
// PropsAddress: "0x5BBDD2bD1D5cF91A4E52de3a99e71069c271953B",
// CardsAddress: "0xEe7D0219c15CbD18e39B981a096D6dca4d4d7670",
// StoreAddress: "0x55625877D989431724554bb126fFFAf8516Dbe04",
// BoxAddress: "0xd2bc0B5742B5312db10fd7145CAd51383c57EA14",
// MarketAddress: "0xe1Acdc7786FdDdd6f5A59C1E0dF53785CA592859",
