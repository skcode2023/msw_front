import { useAppDispatch } from "@ar/hooks";
import { addSpining, delSpining, setLoginVisible } from "@ar/state";
import Button from "@com/Button";
import Modal from "@com/Modal";
import config from "@utils/web3/config";
import { useWeb3Object } from "@utils/web3/useWeb3Object";
import { useWeb3React } from "@web3-react/core";
import { useBoolean, useMemoizedFn } from "ahooks";
import { message } from "antd";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Style, { ModalBody } from "./Style";
import BoxNftBlueImg from "@img/box-nft-blue-img.png";
import BoxNftGreenImg from "@img/box-nft-green-img.png";
import useApi from "@utils/useApi";
import { useTranslation } from "react-i18next";

export default function Box() {
  const [opening, { setFalse: setIngFalse, setTrue: setIngTrue }] =
    useBoolean(false);
  const [opened, { setFalse: setEdFalse, setTrue: setEdTrue }] =
    useBoolean(false);
  const { active, account } = useWeb3React();
  const web3Object = useWeb3Object();
  const [boxNum, setBoxNum] = useState(0); //盲盒数量
  const vedioRef = useRef<HTMLVideoElement>(null);
  const dispatch = useAppDispatch();
  const [toStore, setToStore] = useState(false); //提示盲盒不足，跳转store
  const navigate = useNavigate();
  const RootDom = useRef<HTMLElement | null>(null);
  const { getMyNftList, getOpenEventList, getCardById } = useApi();
  const [quality, setQuality] = useState("0"); //开启的nft的品质
  const { t } = useTranslation();

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
    if (!vedioRef.current) {
      return;
    }
    vedioRef.current.play();
  }, [vedioRef]);

  /**查询自身盲盒数量 */
  const queryBoxNum = useMemoizedFn(() => {
    if (!active || !web3Object || !account) {
      return;
    }
    dispatch(addSpining());
    web3Object.ContractProps.methods
      .balanceOf(account, config.BOXTokenId)
      .call()
      .then((num: number) => {
        setBoxNum(num);
        console.log(num)
      })
      .finally(() => {
        dispatch(delSpining());
      });
  });

  useEffect(() => {
    queryBoxNum();
  }, [active, web3Object, account, dispatch, queryBoxNum]);

  /**开盲盒 */
  async function openBox() {
    //判断是否登录
    if (!active || !web3Object || !account) {
      dispatch(setLoginVisible(true));
      return;
    }
    //判断盒子数量是否足够
    if (boxNum <= 0) {
      setToStore(true);
      return;
    }
    //访问合约
    dispatch(addSpining());
    //检查已开启盲盒数量是否超过设定
    const currentTotalNftNumber = await web3Object.ContractCards.methods
      .totalSupply()
      .call();
    if (Number(currentTotalNftNumber) >= config.maxNftNumber) {
      //当前已存在的nft数量超过设定
      message.error(t("box.tu"));
      dispatch(delSpining());
      return;
    }
    //检查是否授权
    const isApprove = await web3Object.ContractProps.methods
      .isApprovedForAll(account, config.BoxAddress)
      .call();
    if (!isApprove) {
      //如果没授权，则授权
      await web3Object.ContractProps.methods
        .setApprovalForAll(config.BoxAddress, true)
        .send({
          from: account,
        })
        .on("transactionHash", function (hash: any) {
          console.log("开盲盒合约授权", hash);
        })
        .on("receipt", async (receipt: any) => {
          console.log("开盲盒合约授权", receipt);
        })
        .on("error", function (error: any) {
          console.log("开盲盒合约授权", error);
          message.error(error.message);
        });
    }
    //开盲盒
    await web3Object.ContractBox.methods
      .open()
      .send({
        from: account,
      })
      .on("transactionHash", function (hash: any) {
        console.log("开盲盒", hash);
      })
      .on("receipt", async (receipt: any) => {
        console.log("开盲盒", receipt);
        getOpenEventList()
          .then((openList) => {
            const myOpenList = openList.filter(
              (item: { account: string; nftId: string }) =>
                item.account.toLocaleLowerCase() === account.toLocaleLowerCase()
            );
            if (myOpenList.length === 0) {
              return null;
            } else {
              return myOpenList[myOpenList.length - 1];
            }
          })
          .then((openData) => {
            if (openData.nftId) {
              return getCardById(openData.nftId);
            } else {
              console.error("读取nft数据失败", "openData", openData);
              return Promise.reject();
            }
          })
          .then((data) => {
            //设置获取的nft品质
            setQuality(data.quality);
            //播放动画
            if (!vedioRef.current) {
              return;
            }
            setIngTrue();
            vedioRef.current.src = require("../../assets/box-2.mp4");
            vedioRef.current.play();
            vedioRef.current.loop = false;
            vedioRef.current.onended = () => {
              setIngFalse();
              setEdTrue();
              navigate("/personal");
            };

            if (account && web3Object) {
              getMyNftList(account,true);
            }
          });
      })
      .on("error", function (error: any) {
        console.log("开盲盒", error);
        message.error(error.message);
      })
      .finally(() => {
        dispatch(delSpining());
      });
  }

  /**获取nft */
  function getNft() {
    if (!account) {
      return;
    }
    dispatch(addSpining());
    getMyNftList(account, true).finally(() => {
      dispatch(delSpining());
      if (!vedioRef.current) {
        return;
      }
      setEdFalse();
      vedioRef.current.src = require("../../assets/box-1.mp4");
      vedioRef.current.play();
      vedioRef.current.loop = true;
      queryBoxNum();
    });
  }

  return (
    <Style>
      <div className="back">
        <video
          ref={vedioRef}
          src={require("../../assets/box-1.mp4")}
          autoPlay
          loop
          preload="auto"
          controls={false}
          muted
        />
      </div>
      {!opening && !opened && (
        <>
          <div className="tips">
            <div className="label">{t("box.tip")}</div>
            <div className="value">{boxNum}</div>
          </div>
          <div className="button">
            <Button onClick={openBox}>{t("open")}</Button>
          </div>
        </>
      )}
      <img
        style={{
          opacity: opened && quality === "0" ? 1 : 0,
        }}
        src={BoxNftGreenImg}
        alt=""
      />
      <img
        style={{
          opacity: opened && quality === "1" ? 1 : 0,
        }}
        src={BoxNftBlueImg}
        alt=""
      />
      {opened && (
        <>
          <div className="tips">
            <div className="label">{t("box.con")}</div>
          </div>
          <div className="button">
            <Button onClick={getNft}>{t("box.gn")}</Button>
          </div>
        </>
      )}
      <Modal
        open={toStore}
        width={window.isPhone ? "90%" : "26.25rem"}
        onCancel={() => {
          setToStore(false);
        }}
      >
        <ModalBody>
          <div className="tip">{t("box.tn")}</div>
          <div className="button">
            <Button
              size="small"
              onClick={() => {
                navigate("/store");
              }}
            >
              {t("ok")}
            </Button>
            <Button
              size="small"
              onClick={() => {
                setToStore(false);
              }}
            >
              {t("cancel")}
            </Button>
          </div>
        </ModalBody>
      </Modal>
    </Style>
  );
}
