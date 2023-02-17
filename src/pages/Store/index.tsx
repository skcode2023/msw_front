import Button from "@com/Button";
import Input from "@com/Input";
import Modal from "@com/Modal";
import { useBoolean, useDebounceFn, useToggle } from "ahooks";
import { useEffect, useRef, useState } from "react";
import Style, { ModalBody } from "./Style";
import Decimal from "decimal.js";
import FilterSearch from "@img/filter-search.png";
import { useWeb3React } from "@web3-react/core";
import { useNavigate } from "react-router-dom";
import config from "@utils/web3/config";
import { useWeb3Object, useWeb3Utils } from "@utils/web3/useWeb3Object";
import { useAppDispatch, useAppSelector } from "@ar/hooks";
import { message } from "antd";
import { addSpining, delSpining, setLoginVisible } from "@ar/state";
import { useTranslation } from "react-i18next";
import useApi from "@utils/useApi";

export default function Store() {
  const [category, { setLeft: setGuild, setRight: setBox }] = useToggle(
    "Guild",
    "Box"
  );
  const navigate = useNavigate();
  const { getMyNftList } = useApi();
  const { t } = useTranslation();
  const [open, { setFalse, setTrue }] = useBoolean(false); //购买弹窗
  const [amount, setAmount] = useState(); //购买数量
  const [propsId, setPropsId] = useState(0); //购买的道具id
  const [supply, setSupply] = useState(100); //供应量
  const [unitPrice, setUnitPrice] = useState(0.0047); //单价
  const [totalPrice, setTotalPrice] = useState(0); //总价
  const { active, account } = useWeb3React();
  const web3Object = useWeb3Object();
  const { nativeTokenName } = useAppSelector((state) => state.web3Info); //代币名称和精度
  const [isCard, setIsCard] = useState(false); //是否持有会员卡
  const [isBuyed, setIsBuyed] = useState(0); //是否购买完成-每次购买完成自动+1
  const [storePrice, setStorePrice] = useState({
    box: {
      price: 0,
      supply: 0,
    },
    card: {
      price: 0,
      supply: 0,
    },
  }); //商店价格和数量
  const dispatch = useAppDispatch();
  const { toNativeWei, fromWei } = useWeb3Utils();
  const RootDom = useRef<HTMLElement | null>(null);

  useEffect(() => {
    RootDom.current = document.getElementById("root");
  }, []);

  useEffect(() => {
    if (RootDom.current) {
      RootDom.current.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }, []);

  useEffect(() => {
    let currentTotal = Decimal.mul(unitPrice, amount || 0).toNumber();
    console.log(currentTotal, amount, unitPrice)
    if (isCard && category === "Box") {
      currentTotal = Decimal.mul(currentTotal, 0.8).toNumber();
    }
    setTotalPrice(currentTotal);
  }, [unitPrice, amount, isCard, category]);

  function openBuyGuild() {
    //判断是否登录
    if (!(active && account && web3Object)) {
      dispatch(setLoginVisible(true));
      return;
    }
    setTrue();
    setGuild();
    setUnitPrice(storePrice.card.price);
    setSupply(storePrice.card.supply);
    setPropsId(config.CardTokenId);
  }
  function openBuyBox() {
    //判断是否登录
    if (!(active && account && web3Object)) {
      dispatch(setLoginVisible(true));
      return;
    }
    setTrue();
    setBox();
    setUnitPrice(storePrice.box.price);
    setSupply(storePrice.box.supply);
    setPropsId(config.BOXTokenId);
  }
  function changeAmount(current: any) {
    console.log(current)
    setAmount(current || 0);
  }
  /**购买道具 */
  async function buy() {


    if (!amount) {
      message.warn(t("message.pet"));
      return;
    }
    //判断是否登录
    if (!(active && account && web3Object)) {
      dispatch(setLoginVisible(true));
      setFalse();
      return;
    }
    //判断道具供应量
    if ((amount || 0) > supply) {
      message.warn(t("message.is"));
      return;
    }
    //开始链接链
    dispatch(addSpining());
    //原生币判断
    const Banlance = await web3Object.web3.eth
      .getBalance(account)
      .then((res) => {
        return web3Object.web3.utils.fromWei(res, "ether");
      });
    if (Number(Banlance) <= Number(totalPrice)) {
      //原生币不足
      dispatch(delSpining());
      return message.warn(t("message.it"));
    }

    //购买道具
    await web3Object.ContractStore.methods
      .purchase(propsId, amount)
      .send({
        from: account,
        value: toNativeWei(totalPrice),
      })
      .on("transactionHash", function (hash: any) {
        // console.log('获取随机数', hash)
        console.log("购买道具", propsId, hash);
      })
      .on("receipt", async (receipt: any) => {
        // console.log('获取随机数', receipt)
        console.log("购买道具", propsId, receipt);
        message.success(t("message.ps"));
        if (account && web3Object) {
          getMyNftList(account,true);
        }

        if(category === 'Box'){
          navigate('/box');
        }else{
          navigate('/personal',{state:{type:'my-props'}});
        }
      })
      .on("error", function (error: any) {
        console.log("购买道具", propsId, error);
        message.error(error.message);
      })
      .then(() => {
        setFalse();
      })
      .finally(() => {
        dispatch(delSpining());
        setIsBuyed(isBuyed + 1);
      });
  }

  /**读取当前用户是否有工会卡 */
  const { run: getIsCard } = useDebounceFn(
    () => {
      if (!web3Object) {
        return;
      }
      dispatch(addSpining());
      web3Object.ContractProps.methods
        .balanceOf(account, config.CardTokenId)
        .call()
        .then((cardNum: number) => {
          setIsCard(Number(cardNum) > 0);
        })
        .finally(() => {
          dispatch(delSpining());
        });
    },
    { wait: 300 }
  );

  useEffect(() => {
    //用户购买之后读取
    if (!active || !web3Object || !account) {
      return;
    }
    if (isCard) {
      //用户已有工会卡
      return;
    }
    getIsCard();
  }, [active, account, web3Object, dispatch, isCard, isBuyed, getIsCard]);
  useEffect(() => {
    //切换用户之后触发
    if (!active || !web3Object || !account) {
      return;
    }
    getIsCard();
  }, [active, account, web3Object, dispatch, getIsCard]);

  useEffect(() => {
    if (!web3Object) {
      return;
    }
    //读取盲盒和工会卡的剩余数量和价格
    dispatch(addSpining());
    Promise.all([
      web3Object.ContractStore.methods.propStores(config.BOXTokenId).call(),
      web3Object.ContractStore.methods.propStores(config.CardTokenId).call(),
    ])
      .then(([box, card]) => {
        setStorePrice({
          box: {
            price: fromWei(box.price),
            supply: box.supply,
          },
          card: {
            price: fromWei(card.price),
            supply: card.supply,
          },
        });
      })
      .finally(() => {
        dispatch(delSpining());
      });
  }, [web3Object, dispatch, fromWei, isBuyed]);

  return (
    <Style>
      <div className="title"></div>
      <div className="description">
        <div className="txt">{t("store.tips")}</div>
      </div>
      <div className="divider"></div>
      <div className="content">
        <div className="item">
          <div className="item-bg guild"></div>
          <div className="item-content">
            <div className="item-content-title">{t("store.title.card")}</div>
            <div className="item-content-description">
              {t("store.content.card")}
            </div>
            <div className="item-content-remain">
              {t("remaining")}:
              <span className="item-content-remain-number">
                {storePrice.card.supply}
              </span>
            </div>
          </div>
          <div className="item-footer">
            <div className="price">
              <div className="price-label">Price</div>
              <div className="price-value">{`${storePrice.card.price} ${nativeTokenName}`}</div>
            </div>
            <div className="button">
              <Button onClick={openBuyGuild}>{t("buy")}</Button>
            </div>
          </div>
        </div>
        <div className="item">
          <div className="item-bg box"></div>
          <div className="item-img box"></div>
          <div className="item-content">
            <div className="item-content-title">{t("store.title.box")}</div>
            <div className="item-content-description">
              {t("store.content.box")}
            </div>
            <div className="item-content-remain">
              {t("remaining")}:
              <span className="item-content-remain-number">
                {storePrice.box.supply}
              </span>
            </div>
          </div>
          <div className="item-footer">
            <div className="price">
              <div className="price-label">Price</div>
              <div className="price-value">{`${storePrice.box.price} ${nativeTokenName}`}</div>
            </div>
            <div className="button">
              <Button onClick={openBuyBox}>{t("buy")}</Button>
            </div>
          </div>
        </div>
      </div>
      <Modal
        width={window.isPhone ? "90%" : "26.25rem"}
        open={open}
        destroyOnClose={true}
        onCancel={() => {
          setFalse();
          setAmount(undefined);
        }}
      >
        <ModalBody>
          <div className="title">
            {t("buy")}{" "}
            {category === "Box" ? t("store.title.box") : t("store.title.card")}
          </div>
          <div className="amount">{t("amount")}</div>
          <div className="store-modal-input">
            <Input
              backImg={FilterSearch}
              type="number"
              InputNumberProps={{
                width: "100%",
                onChange: changeAmount,
                precision: 0,
                placeholder:
                  t("store.ph") || "Please enter the purchase quantity",
                min: 1,
                max: supply,
              }}
            />
          </div>
          <div className="price">
            <div className="price-label">{t("price")}:</div>
            <span className="price-value">
              {totalPrice} {nativeTokenName}
            </span>
          </div>
          {isCard && category === "Box" && (
            <div className="tips">{t("store.discount")}</div>
          )}
          <div className="button">
            <Button onClick={buy}>{t("buy")}</Button>
          </div>
        </ModalBody>
      </Modal>
    </Style>
  );
}
