import Style, { ModalBody } from "./Style";
import MyNft from "./MyNft";
import useUrlState from "@ahooksjs/use-url-state";
import Detail from "./Detail";
import OnSell from "./OnSell";
import MyProps from "./MyProps";
import { useMemoizedFn } from "ahooks";
import Modal from "@com/Modal";
import { useState } from "react";
import CardImg from "@com/CardImg";
import Select from "@com/Select";
import { useAppDispatch, useAppSelector } from "@ar/hooks";
import Input from "@com/Input";
import Button from "@com/Button";
import SaleInput from "@img/sale-input.png";
import { message } from "antd";
import { useWeb3React } from "@web3-react/core";
import { useEffect } from "react";
import { useWeb3Object, useWeb3Utils } from "@utils/web3/useWeb3Object";
import { addSpining, delSpining, setLoginVisible } from "@ar/state";
import config from "@utils/web3/config";
import useApi from "@utils/useApi";
import OnSellOn from "@img/on_sell_on.png";
import MySellOn from "@img/my_sell_on.png";
import MyNftOn from "@img/my_nft_on.png";
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
export default function Personal() {
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location)
  const [tab, setTab] = useState("my-nft");
  const { tokenName, nativeTokenName, marketServiceCahrge } = useAppSelector(
    (state) => state.web3Info
  );
  const [saleVisible, setSaleVisibile] = useState(false); //卖nft弹窗
  const [currentNft, setCurrentNft] = useState<NFTCard>(); //希望售卖的nft信息
  const [saleType, setSaleType] = useState<string>(); //选择出售的代币单位
  const [salePrice, setSalePrice] = useState<number>(); //输入出售价格
  const { account } = useWeb3React();
  const web3Object = useWeb3Object();
  const dispatch = useAppDispatch();
  const { toWei } = useWeb3Utils();
  const { getMyNftList, getMarketNftList } = useApi();
  const { t } = useTranslation();

  /**切换类型 */
  function changeTab(key: string) {
    setTab(key);
  }

  useEffect(() => {
    if(!!location.state){
      changeTab(location.state.type);
    }
  }, [location.state]);
  //切换详情页
  const [{ nftid }, setNftid] = useUrlState<{ nftid?: string }>({
    nftid: undefined,
  });

  /**打开出售界面 */
  const openSale = useMemoizedFn((nftInfo: NFTCard) => {
    setSaleVisibile(true);
    setCurrentNft(nftInfo);
  });

  /**切换出售代币 */
  const changeSaleType = useMemoizedFn((value: string | number) => {
    setSaleType(value.toString());
  });

  const sell = useMemoizedFn(async () => {
    if (!account || !web3Object) {
      dispatch(setLoginVisible(true));
      return;
    }
    if (!salePrice) {
      return message.warn(t("message.pe"));
    }
    if (!currentNft) {
      return;
    }
    //售卖nft
    dispatch(addSpining());
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
          console.log("出售nft授权", hash);
        })
        .on("receipt", async (receipt: any) => {
          console.log("出售nft授权", receipt);
        })
        .on("error", function (error: any) {
          console.log("出售nft授权", error);
          message.error(error.message);
          dispatch(delSpining());
        });
    }
    //出售
    await web3Object.ContractMarket.methods
      .addGoods(
        config.CardsAddress,
        currentNft.id,
        1,
        saleType === tokenName
          ? config.TokenAddress
          : config.nativeTokenAddress,
        toWei(salePrice)
      )
      .send({
        from: account,
      })
      .on("transactionHash", function (hash: any) {
        console.log("出售nft", hash);
      })
      .on("receipt", async (receipt: any) => {
        console.log("出售nft", receipt);
        if (nftid) {
          navigate(-1);
        }

        getMyNftList(account, true);
        getMarketNftList(true);
        setSaleVisibile(false);
        setSalePrice(undefined);
        message.success(t("message.ss"));
      })
      .on("error", function (error: any) {
        console.log("出售nft", error);
        message.error(error.message);
      })
      .finally(() => {
        dispatch(delSpining());
      });
  });
  const changeTag = (e: any) => {
    if (e === "My Props") {
      changeTab("my-props");
    } else if (e === "My Nft") {
      changeTab("my-nft");
    } else {
      changeTab("on-sell");
    }
  };

  return (
    <Style nftid={nftid}>
      <div className="banner">
        {window.isPhone ? (
          <Select
            options={[
              {
                label: (
                  <span>
                    <img className="sort-img" src={MyNftOn} alt="" />
                    {t("personal.label.mn")}
                  </span>
                ),
                optionLabel: t("personal.label.mn"),
                value: "My Nft",
              },
              {
                label: (
                  <span>
                    <img className="sort-img" src={OnSellOn} alt="" />
                    {t("personal.label.os")}
                  </span>
                ),
                optionLabel: t("personal.label.os"),
                value: " On Sell",
              },
              {
                label: (
                  <span>
                    <img className="sort-img" src={MySellOn} alt="" />
                    {t("personal.label.mp")}
                  </span>
                ),
                optionLabel: t("personal.label.mp"),
                value: "My Props",
              },
            ]}
            onChange={changeTag}
          />
        ) : (
          <div className="tabs">
            <div
              className={"tabs-item" + (tab === "on-sell" ? " on" : " off")}
              onClick={() => {
                changeTab("on-sell");
              }}
            >
              <span className="on-sell-icon"></span>
              <span>{t("personal.label.os")}</span>
            </div>
            <div
              className={"tabs-item" + (tab === "my-props" ? " on" : " off")}
              onClick={() => {
                changeTab("my-props");
              }}
            >
              <span className="my-sell-icon"></span>
              <span>{t("personal.label.mp")}</span>
            </div>
            <div
              className={"tabs-item" + (tab === "my-nft" ? " on" : " off")}
              onClick={() => {
                changeTab("my-nft");
              }}
            >
              <span className="my-nft-icon"></span>
              <span>{t("personal.label.mn")}</span>
            </div>
          </div>
        )}
        {/* <div className="txt phoneTxt">
          Currently, there are 12 cards on sale.
        </div>
        <div className="txt">
          You can select cards to accurately view the cards you want to buy
        </div> */}
      </div>
      <div className="content">
        <OnSell visible={tab === "on-sell"} />
        <MyProps visible={tab === "my-props"} />
        <MyNft
          openSale={openSale}
          clickNft={setNftid}
          visible={tab === "my-nft"}
        />
      </div>
      {nftid && (
        <div className="detail">
          <Detail nftid={nftid} openSale={openSale} />
        </div>
      )}
      <Modal
        width={window.isPhone ? "90%" : "47.5rem"}
        open={saleVisible}
        destroyOnClose={true}
        onCancel={() => {
          setSaleVisibile(false);
          setSalePrice(undefined);
          setSaleType(nativeTokenName);
        }}
      >
        <ModalBody>
          <div className="sale-left">
            <div className="sale-left-img">
              <CardImg data={currentNft} />
            </div>
            <div className="sale-left-id">{currentNft?.id}</div>
          </div>
          <div className="sale-right">
            <div className="sale-right-title">{t("personal.sale.title")}</div>
            <div className="sale-right-body-title">
              {t("personal.sale.body")}
            </div>
            <div className="sale-right-body">
              <div className="sale-right-body-select mySelect">
                <Select
                  options={[
                    { label: nativeTokenName, value: nativeTokenName },
                    // { label: tokenName, value: tokenName },
                  ]}
                  onChange={changeSaleType}
                  theme="white"
                ></Select>
              </div>
              <div className="sale-right-body-input">
                <Input
                  backImg={SaleInput}
                  type="number"
                  InputNumberProps={{
                    placeholder: t("personal.sale.tip") || "Price enter",
                    onChange: (value) => {
                      setSalePrice(Number(value) || 0);
                    },
                    min: 0.000001,
                    max: 999999999.999999,
                  }}
                />
              </div>
            </div>
            <div className="sale-right-info">
              <div className="sale-right-info-label">{t("personal.ri")}</div>
              <div className="sale-right-info-value">0%</div>
            </div>
            <div className="sale-right-info">
              <div className="sale-right-info-label">{t("personal.sc")}</div>
              <div className="sale-right-info-value">
                {marketServiceCahrge}%
              </div>
            </div>
            <div className="sale-right-btn-wrap">
              <div className="sale-right-btn">
                <Button size="small" onClick={sell}>
                  {t("sell")}
                </Button>
              </div>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </Style>
  );
}
