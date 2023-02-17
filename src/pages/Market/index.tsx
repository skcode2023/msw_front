import { useDebounceFn, useMemoizedFn, useSetState } from "ahooks";
import { useEffect, useState } from "react";
import Detail from "./Detail";
import Filter from "./Filter";
import List from "./List";
import Sort from "./Sort";
import Style from "./Style";
import Tags from "./Tags";
import useUrlState from "@ahooksjs/use-url-state";
import useApi from "@utils/useApi";
import Decimal from "decimal.js";
import { useWeb3Object, useWeb3Utils } from "@utils/web3/useWeb3Object";
import { Drawer, message } from "antd";
import DOWN from "@img/phone/down.png";
import { useAppDispatch, useAppSelector } from "@ar/hooks";
import { useLocation, useNavigate } from "react-router-dom";
import { useWeb3React } from "@web3-react/core";
import { addSpining, delSpining, setLoginVisible } from "@ar/state";
import config from "@utils/web3/config";
import { useTranslation } from "react-i18next";

export default function Market() {
  const {
    marketNFTList: list,
    tokenName,
    nativeTokenName,
  } = useAppSelector((state) => state.web3Info); //原始数据
  const [open, setOpen] = useState(false);
  const [currenList, setCurrentList] = useState<NFTCard[]>([]); //筛选排序之后的数据
  const { getMarketNftList, getMyNftList } = useApi();
  const web3Object = useWeb3Object();
  const location = useLocation();
  const { account } = useWeb3React();
  const dispatch = useAppDispatch();
  const { fromWei, toWei, toNativeWei } = useWeb3Utils();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { run: refreshList } = useDebounceFn(
    () => {
      getMarketNftList(true);
    },
    {
      wait: 500,
    }
  );

  useEffect(() => {
    if (web3Object) {
      refreshList();
    }
  }, [refreshList, web3Object]);

  useEffect(() => {
    if (
      web3Object &&
      location.pathname === "/market" &&
      location.search === ""
    ) {
      refreshList();
    }
  }, [location, refreshList, web3Object]);

  //筛选
  const [filter, setFilter] = useSetState<FilterBody>({
    search: "",
    state: "sale",
    price: {
      unit: "",
    },
    quality: "all",
  });
  //排序
  const [sort, setSort] = useSetState<SortBody>({
    price: "",
    time: "newest",
  });

  //重新修改列表
  useEffect(() => {
    const filterFunc = (ele: NFTCard) => {
      if (filter.search && !~ele.id.indexOf(filter.search)) {
        //如果存在search搜索
        return false;
      }
      if (filter.state === "sale" && !ele.isSale) {
        //选择售卖的ntf
        return false;
      }
      if (filter.price.unit && filter.price.unit !== ele.unit) {
        //价格单位对不上
        return false;
      }
      if (filter.price.min && ele.price < filter.price.min) {
        //价格超过最小值
        return false;
      }
      if (filter.price.max && ele.price > filter.price.max) {
        //价格超过最大值
        return false;
      }
      if (filter.quality !== "all" && filter.quality !== ele.quality) {
        //质量筛选
        return false;
      }
      return true;
    };
    let sortFunc: any = () => 0;
    if (sort.time === "newest") {
      sortFunc = (a: NFTCard, b: NFTCard) => {
        return b.blockNumber - a.blockNumber;
      };
    } else if (sort.time === "oldest") {
      sortFunc = (a: NFTCard, b: NFTCard) => {
        return a.blockNumber - b.blockNumber;
      };
    } else if (sort.price === "asc") {
      sortFunc = (a: NFTCard, b: NFTCard) => {
        return Decimal.sub(a.price, b.price);
      };
    } else if (sort.price === "desc") {
      sortFunc = (a: NFTCard, b: NFTCard) => {
        return Decimal.sub(b.price, a.price);
      };
    }
    setCurrentList(
      list
        .filter(filterFunc)
        .sort(sortFunc)
        .map((ele: NFTCard) => {
          return { ...ele, amount: undefined };
        })
    );
  }, [sort, filter, list]);

  const [{ nftid }, setNftid] = useUrlState<{ nftid?: string }>({
    nftid: undefined,
  });

  //购买nft
  const buyNft = useMemoizedFn(async (nftInfo: NFTCard) => {
    //判断是否登录
    if (!account || !web3Object) {
      dispatch(setLoginVisible(true));
      return;
    }
    //判断是否有nft
    if (!nftInfo) {
      return message.error(t("message.ne"));
    }
    //判断购买的nft不是自己上架的
    if (nftInfo.address?.toLocaleLowerCase() === account.toLocaleLowerCase()) {
      return message.warn(t("message.db"));
    }
    //开始买
    dispatch(addSpining());
    //判断用户钱包是否足够
    if (nftInfo.unit === tokenName) {
      //代币判断
      const TokenBanlance = await web3Object.ContractToken.methods
        .balanceOf(account)
        .call()
        .then((res: string) => {
          return fromWei(res);
        });
      if (TokenBanlance < nftInfo.price) {
        //代币余额不足
        dispatch(delSpining());
        return message.warn(t("message.it"));
      }
    } else if (nftInfo.unit === nativeTokenName) {
      //原生币判断
      const Banlance = await web3Object.web3.eth
        .getBalance(account)
        .then((res) => {
          return web3Object.web3.utils.fromWei(res, "ether");
        });
      if (Banlance < nftInfo.price) {
        //原生币余额不足
        dispatch(delSpining());
        return message.warn(t("message.it"));
      }
    } else {
      dispatch(delSpining());
      return message.error(t("message.pr"));
    }
    //授权
    const isApprove = await web3Object.ContractCards.methods
      .isApprovedForAll(account, config.MarketAddress)
      .call();
    if (!isApprove) {
      //如果没授权
      await web3Object.ContractCards.methods
        .setApprovalForAll(config.MarketAddress, true)
        .send({
          from: account,
        })
        .on("transactionHash", function (hash: any) {
          console.log("购买nft授权", hash);
        })
        .on("receipt", async (receipt: any) => {
          console.log("购买nft授权", receipt);
        })
        .on("error", function (error: any) {
          console.log("购买nft授权", error);
          message.error(error.message);
          dispatch(delSpining());
        });
    }

    //用户代币授权
    if (nftInfo.unit === tokenName) {
      //获取用户授权金额-market商城
      const allowance = await web3Object.ContractToken.methods
        .allowance(account, config.MarketAddress)
        .call()
        .then((res: string) => {
          return fromWei(res);
        });

      if (allowance < nftInfo.price) {
        //授权金额不足，需要授权-store商城
        await web3Object.ContractToken.methods
          .approve(config.MarketAddress, toWei(nftInfo.price))
          .send({
            from: account,
          })
          .on("transactionHash", function (hash: any) {
            console.log("授权金额", hash);
          })
          .on("receipt", async (receipt: any) => {
            console.log("授权金额", receipt);
          })
          .on("error", function (error: any) {
            console.error("授权金额", error);
            message.error(error.message);
            dispatch(delSpining());
          });
      }
    }
    //购买
    await web3Object.ContractMarket.methods
      .purchase(nftInfo.marketEventIndex)
      .send({
        from: account,
        value:
          nftInfo.unit === nativeTokenName
            ? toNativeWei(nftInfo.price)
            : undefined,
      })
      .on("transactionHash", function (hash: any) {
        console.log("购买nft", hash);
      })
      .on("receipt", async (receipt: any) => {
        console.log("购买nft", receipt);
        message.success(t("message.ps"));
        getMarketNftList(true).then(() => {
          if (nftid) {
            //如果在详情页，则返回
            navigate(-1);
          }
        });
        getMyNftList(account, true);
      })
      .on("error", function (error: any) {
        console.log("购买nft", error);
        message.error(error.message);
      })
      .finally(() => {
        dispatch(delSpining());
      });
  });

  return (
    <Style nftid={nftid}>
      {!nftid && (
        <>
          <div className="market-title"></div>
          <div className="market-tips">
            {t("market.tip", { count: currenList.length })}
          </div>
          <div className="market-content">
            {window.isPhone && (
              <>
                <div
                  className="filters-phone"
                  onClick={() => {
                    setOpen(true);
                  }}
                >
                  <div className="filters-phone-main">
                    <div className="icon1"></div>
                    {t("market.filters.filters")}
                    <img src={DOWN} alt="" className="down" />
                  </div>
                </div>
                <div className="search"></div>
                <Drawer
                  height={550}
                  title={t("market.filters.filters")}
                  placement={"bottom"}
                  closable={false}
                  onClose={() => setOpen(false)}
                  open={open}
                  key={"bottom"}
                >
                  <Filter
                    filter={filter}
                    setFilter={setFilter}
                    onClick={() => {
                      setOpen(false);
                    }}
                  />
                </Drawer>
              </>
            )}
            {!window.isPhone && (
              <div className="left">
                <Filter filter={filter} setFilter={setFilter} />
              </div>
            )}
            <div className="right">
              <div className="right-top">
                <div className="tags">
                  <Tags filter={filter} setFilter={setFilter} />
                </div>
                <div className="sort">
                  <Sort setSort={setSort} />
                </div>
              </div>
              <div className="content">
                <List list={currenList} clickCard={setNftid} buyNft={buyNft} />
              </div>
            </div>
          </div>
        </>
      )}
      {nftid && (
        <div className="detail">
          <Detail nftid={nftid} buyNft={buyNft} />
        </div>
      )}
    </Style>
  );
}
