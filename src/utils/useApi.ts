import { useAppDispatch, useAppSelector } from "@ar/hooks";
import { addSpining, delSpining } from "@ar/state";
import {
  setCard,
  setMarketBuyEventList,
  setMarketEventList,
  setMarketNftList,
  setMyNftList,
  setMyStakeNftList,
} from "@ar/web3Info";
import { useMemoizedFn } from "ahooks";
import { message } from "antd";
import axios from "axios";
import Decimal from "decimal.js";
import moment from "moment";
import { useTranslation } from "react-i18next";
import { readGetPastEventsBSC } from "./commonFunction";
import config from "./web3/config";
import { useWeb3Object } from "./web3/useWeb3Object";

//查询接口
export default function useApi() {
  const web3Object = useWeb3Object();
  const {
    tokenName,
    nativeTokenName,
    tokenDecimals,
    nativeTokenDecimals,
    metaDataBaseURI,
    marketNFTList,
    marketEventList,
    marketBuyEventList,
    myNftListForAddress,
    myNftList,
    Cards,
  } = useAppSelector((state) => state.web3Info);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  /**读取市场交易上架记录 */
  const getMarketAddEventList: (isForce?: boolean) => Promise<MarketEvent[]> =
    useMemoizedFn(async (isForce?: boolean) => {
      if (marketEventList.length > 0 && !isForce) {
        return marketEventList;
      }
      if (!web3Object) {
        return;
      }
      dispatch(addSpining());
      //定义解析事件数据的参数
      const topic0 = web3Object.web3.utils.sha3(
        "GoodsAdded(address,address,uint256,uint256,address,uint256)"
      );
      const data = await readGetPastEventsBSC(
        config.ajaxUrl,
        config.MarketAddress,
        topic0,
        config.apiKey
      )
        .then((res: any) => {
          return res.map((ele: any, index: number) => {
            //解析二进制
            let ParameterArray = ["uint256", "uint256", "address", "uint256"];
            const info = web3Object.web3.eth.abi.decodeParameters(
              ParameterArray,
              ele.data
            );
            return {
              sender: ele.topics[1], //卡片出售者
              cardAddress: ele.topics[2], //卡片所在合约地址
              nftId: info[0], //nftID
              amount: info[1], //交易数量
              unitAddress: info[2], //交易货币地址 TUT或BNB
              price: info[3], //价格 原始数据，未添加精度
              blockNumber: ele.blockNumber, //出售时块高度，用于获取上架时间
              timeStamp: ele.timeStamp, //出售时间戳
              marketEventIndex: index, //本次上架索引
            };
          });
        })
        .finally(() => {
          dispatch(delSpining());
        });
      dispatch(setMarketEventList(data));
      return data;
    });

  /**获取商城交易完成记录 */
  const getMarketBuyEventList: () => Promise<MarketBuyEvent[]> = useMemoizedFn(
    async () => {
      if (!web3Object) {
        return;
      }
      if (marketBuyEventList.length > 0) {
        return marketBuyEventList;
      }
      dispatch(addSpining());
      //定义解析事件数据的参数
      const topic0 = web3Object.web3.utils.sha3(
        "Purchased(address,address,uint256,uint256,uint256,uint256)"
      );
      const data = await readGetPastEventsBSC(
        config.ajaxUrl,
        config.MarketAddress,
        topic0,
        config.apiKey
      )
        .then((res: any) => {
          return res.map((ele: any) => {
            //解析二进制 0-上架索引 1-nftid 2-数量 3-价格
            let ParameterArray = ["uint256", "uint256", "uint256", "uint256"];
            const info = web3Object.web3.eth.abi.decodeParameters(
              ParameterArray,
              ele.data
            );
            return {
              buyer: ele.topics[1], //卡片购买者
              cardAddress: ele.topics[2], //卡片所在合约地址
              nftId: info[1], //nftID
              amount: info[2], //交易数量
              price: info[3], //价格 原始数据，未添加精度
              blockNumber: ele.blockNumber, //购买时块高度，用于获取上架时间
              timeStamp: ele.timeStamp, //购买时间戳
              marketEventIndex: info[0], //卡片上架索引
            };
          });
        })
        .catch((err: any) => {
          console.error("读取商城交易记录", err);
          return [];
        })
        .finally(() => {
          dispatch(delSpining());
        });
      dispatch(setMarketBuyEventList(data));
      return data;
    }
  );

  /**读取开盲盒记录 */
  const getOpenEventList = useMemoizedFn(async () => {
    if (!web3Object) {
      return;
    }
    dispatch(addSpining());
    //定义解析事件数据的参数
    const topic0 = web3Object.web3.utils.sha3("Opened(address,uint256)");
    const data = await readGetPastEventsBSC(
      config.ajaxUrl,
      config.BoxAddress,
      topic0,
      config.apiKey
    )
      .then((res: any) => {
        return res.map((ele: any) => {
          //解析二进制 0-上架索引 1-nftid 2-数量 3-价格
          let ParameterArray = ["uint256"];
          const info = web3Object.web3.eth.abi.decodeParameters(
            ParameterArray,
            ele.data
          );
          return {
            account: ele.topics[1].replace("000000000000000000000000", ""),
            nftId: info[0],
          };
        });
      })
      .catch((err: any) => {
        console.error("读取开盲盒", err);
        return [];
      })
      .finally(() => {
        dispatch(delSpining());
      });
    return data;
  });

  /**通过id读取nft合约中数据 */
  const getCardById: (cardId: string) => Promise<Card> = useMemoizedFn(
    async (cardId) => {
      if (!web3Object) {
        return Promise.reject();
      }
      if (Cards[cardId]) {
        return Cards[cardId];
      }
      const data = await web3Object.ContractCards.methods
        .characters(cardId)
        .call();
      data.nftId = cardId;
      const result = {
        quality: data.quality,
        level: data.level,
        nftId: cardId,
        score: data.score,
      };
      dispatch(setCard(result));
      return result;
    }
  );

  /**交易市场列表查询  isForce是否强制查询 不强制将从缓存获取*/
  const getMarketNftList = useMemoizedFn(async (isForce?: boolean) => {
    if (marketNFTList.length > 0 && !isForce) {
      return marketNFTList;
    }
    if (!web3Object) {
      message.warn(t("message.ne"));
      return [];
    }

    dispatch(addSpining());
    return await Promise.all([
      //获取有多少个正在交易的卡片
      web3Object.ContractCards.methods
        .balanceOf(config.MarketAddress)
        .call()
        .then((cardNumber: number) => {
          if (cardNumber <= 0) {
            return [];
          }
          //获取所有卡片的tokenid
          return web3Object.ContractCards.methods
            .ownedTokens(config.MarketAddress, 0, cardNumber)
            .call();
        })
        .then((cardIds: string[]) => {
          //通过id获取每个卡片详情
          return Promise.all(
            cardIds.map(async (cardId: string) => {
              return await getCardById(cardId);
            })
          );
        }),
      //读取交易事件列表
      getMarketAddEventList(isForce),
    ])
      .then(async (res: any) => {
        //cards-商城卡片详情  events-交易事件列表
        const [cards, events] = res as [Card[], MarketEvent[]];
        if (cards.length <= 0) {
          //如果没有卡片数据 清理缓存
          dispatch(setMarketNftList([]));
          return [];
        }
        const result = [];
        //额外处理 代币单位
        let _tokenName = tokenName;
        if (!_tokenName) {
          _tokenName = await web3Object.ContractToken.methods.symbol().call();
        }
        //组合数据 -card倒序排列
        for (let i = cards.length - 1; i >= 0; i--) {
          const item = {} as NFTCard;
          const card = cards[i];
          item.id = card.nftId;
          item.quality = card.quality;
          item.level = card.level;
          for (let j = 0; j < events.length; j++) {
            const event = events[j];
            if (card.nftId === event.nftId) {
              if (
                item.blockNumber &&
                Number(item.blockNumber) > Number(event.blockNumber)
              ) {
                //如果已记录时间大于交易时间，则跳过
                continue;
              }
              const currenTokenName =
                event.unitAddress === config.TokenAddress
                  ? _tokenName
                  : nativeTokenName;
              const currentTokenDecimal =
                event.unitAddress === config.TokenAddress
                  ? tokenDecimals
                  : nativeTokenDecimals;
              item.blockNumber = Number(event.blockNumber);
              item.amount = Number(event.amount);
              item.unit = currenTokenName;
              item.price = Decimal.div(
                event.price,
                Decimal.pow(10, currentTokenDecimal)
              ).toNumber();
              item.address = event.sender.replace(
                "000000000000000000000000",
                ""
              );
              item.time = moment(Number(event.timeStamp) * 1000).fromNow(true);
              item.timeStamp = event.timeStamp;
              item.isSale = true;
              item.marketEventIndex = event.marketEventIndex;
            }
          }
          result.push(item);
        }
        if (result.length > 0) {
          dispatch(setMarketNftList(result));
        }
        return result;
      })
      .finally(() => {
        dispatch(delSpining());
      });
  });

  /**获取我的nft列表 */
  const getMyNftList = useMemoizedFn(
    async (address: string, isForce?: boolean) => {
      if (myNftList.length > 0 && !isForce && address === myNftListForAddress) {
        return myNftList;
      }
      if (!web3Object) {
        message.warn(t("message.ne"));
        return [];
      }
      // dispatch(addSpining());
      const result = await web3Object.ContractCards.methods
        .balanceOf(address)
        .call()
        .then((cardNumber: number) => {
          if (Number(cardNumber) === 0) {
            return [];
          }
          //获取所有卡片的tokenid
          return web3Object.ContractCards.methods
            .ownedTokens(address, 0, cardNumber)
            .call();
        })
        .then((cardIds: string[]) => {
          //通过id获取每个卡片详情
          return Promise.all(
            cardIds.map(async (cardId: string) => {
              return await getCardById(cardId);
            })
          );
        })
        .then((cards: Card[]) => {
          const data = [];
          for (let i = 0; i < cards.length; i++) {
            const item = {} as NFTCard;
            const card = cards[i];
            item.id = card.nftId;
            item.quality = card.quality;
            item.level = card.level;
            data.push(item);
          }
          return data.reverse();
        })
        .finally(() => {
          // dispatch(delSpining());
        });
      dispatch(setMyNftList({ list: result, account: address }));
      return result;
    }
  );
 /**获取我的质押nft列表 */
  const getMyStakeNftList = useMemoizedFn(
    async (address: string, isForce?: boolean) => {

      if (!web3Object) {
        message.warn(t("message.ne"));
        return [];
      }
      // dispatch(addSpining());
      const result = await web3Object.ContractMine.methods
        .getUserTokens(address)
        .call()
        .then((cardIds: string[]) => {
          return Promise.all(
            cardIds.map(async (cardId: string) => {
              return await getCardById(cardId);
            })
          );
        })
        .then((cards: Card[]) => {
          const data = [];
          for (let i = 0; i < cards.length; i++) {
            const item = {} as NFTCard;
            const card = cards[i];
            item.id = card.nftId;
            item.quality = card.quality;
            item.level = card.level;
            data.push(item);
          }
          return data.reverse();
        })
        .finally(() => {
          // dispatch(delSpining());
        });

          // dispatch(delSpining());
      dispatch(setMyStakeNftList({ list: result, account: address }));

      return result;
    }
  );
  /**获取我的nft详情 */
  const getMyNftDetail = useMemoizedFn(
    async (address: string, nftId: string): Promise<NFTDetail> => {
      const myNftList = await getMyNftList(address);
      const nftInfo = myNftList.find((ele: NFTCard) => ele.id === nftId);

      //查询元数据
      const metadata = await getNftMetaDataByCardId(nftInfo.id);
      const result = { ...nftInfo, ...metadata };

      return result;
    }
  );

  /**获取道具列表 */
  const getMyProps = useMemoizedFn(async (address: string) => {
    if (!web3Object) {
      message.warn(t("message.ne"));
      return [];
    }
    dispatch(addSpining());
    const data = await Promise.all([
      web3Object.ContractProps.methods
        .balanceOf(address, config.CardTokenId)
        .call(),
      web3Object.ContractProps.methods
        .balanceOf(address, config.BOXTokenId)
        .call(),
    ])
      .then(([cardNum, boxNum]: [number, number]) => {
        return [
          {
            id: "Guild Card",
            amount: cardNum,
          },
          {
            id: "Box",
            amount: boxNum,
          },
        ];
      })
      .finally(() => {
        dispatch(delSpining());
      });
    return data;
  });

  /**查询市场nft详情 */
  const getMarketNftDetail = useMemoizedFn(
    async (nftId: string): Promise<NFTDetail> => {
      const MarketNftList = await getMarketNftList();
      const nftInfo = MarketNftList.find((ele: NFTCard) => ele.id === nftId);
      let result = { ...nftInfo } as NFTDetail;

      //查询元数据
      const metadata = await getNftMetaDataByCardId(result.id);
      result = { ...result, ...metadata };

      //查询交易记录
      const addList = await getMarketAddEventList(); //上架记录
      const buyList = (await getMarketBuyEventList()).filter(
        (item) => item.nftId === result.id
      ); //购买记录中筛选出对应的记录

      //交易记录，按时间倒序，最多五条
      result.transaction = buyList
        .reverse()
        .slice(0, 5)
        .map((item) => {
          //查询对应的上架记录
          const addInfo = addList.find(
            (ele) => ele.marketEventIndex === Number(item.marketEventIndex)
          );
          return {
            blockchain: config.chainName,
            token:
              addInfo?.unitAddress === config.TokenAddress
                ? tokenName
                : nativeTokenName,
            price: item.price,
            from: addInfo?.sender.replace("000000000000000000000000", "") || "",
            to: item.buyer.replace("000000000000000000000000", ""),
            date: moment(Number(item.timeStamp) * 1000).format(
              "YYYY-MM-DD HH:mm:ss"
            ),
          };
        });
      return result;
    }
  );

  /**通过tokenid获取元数据 */
  const getNftMetaDataByCardId = useMemoizedFn(
    async (CardTokenID: number | string) => {
      const init = {
        name: "",
        description: "",
        image: "",
        head: "--",
        body: "--",
        back: "--",
        fin: "--",
        tail: "--",
        flank: "--",
        crown: "--",
        joint: "--",
      };

      return await axios
        .get(
          metaDataBaseURI.replace(
            "{id}",
            Number(CardTokenID).toString(16).padStart(64, "0")
          )
        )
        .then((res) => {
          if (res.status === 200) {
            console.log(res)
            return {
              name: res.data.name,
              description: res.data.description,
              image: res.data.image,
              head:
                res.data.attributes.find(
                  (ele: any) => ele.trait_type === "head"
                ).value || "--",
              body:
                res.data.attributes.find(
                  (ele: any) => ele.trait_type === "body"
                ).value || "--",
              back:
                res.data.attributes.find(
                  (ele: any) => ele.trait_type === "back"
                ).value || "--",
              fin:
                res.data.attributes.find((ele: any) => ele.trait_type === "fin")
                  .value || "--",
              tail:
                res.data.attributes.find(
                  (ele: any) => ele.trait_type === "tail"
                ).value || "--",
              flank:
                res.data.attributes.find(
                  (ele: any) => ele.trait_type === "flank"
                ).value || "--",
              crown:
                res.data.attributes.find(
                  (ele: any) => ele.trait_type === "crown"
                ).value || "--",
              joint:
                res.data.attributes.find(
                  (ele: any) => ele.trait_type === "joint"
                ).value || "--",
            };
          } else {
            return init;
          }
        })
        .catch((err) => {
          console.error("获取元数据失败", err);
          return init;
        });
    }
  );

  return {
    getMarketNftList,
    getMyNftList,
    getMyNftDetail,
    getMyProps,
    getMarketNftDetail,
    getOpenEventList,
    getCardById,
    getMyStakeNftList
  };
}
