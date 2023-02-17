import { useAppDispatch } from "@ar/hooks";
import { addSpining, delSpining } from "@ar/state";
import Button from "@com/Button";
import { formatAddress } from "@utils/commonFunction";
import useApi from "@utils/useApi";
import config from "@utils/web3/config";
import { useWeb3Object } from "@utils/web3/useWeb3Object";
import { useWeb3React } from "@web3-react/core";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Style from "./Style";
import CardImg from "@com/CardImg";
import { useTranslation } from "react-i18next";

export default function Detail({
  nftid,
  openSale,
}: {
  nftid: string;
  openSale: (nftInfo: NFTCard) => void; //点击打开售卖窗口
}) {
  const navigate = useNavigate();
  const { getMyNftDetail } = useApi();
  const dispatch = useAppDispatch();
  const { account } = useWeb3React();
  const web3Object = useWeb3Object();
  const { t } = useTranslation();

  useEffect(() => {
    //初始化自动滚动到顶部
    document.getElementById("root")?.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  function back() {
    navigate(-1);
  }

  const [nftInfo, setNftInfo] = useState<NFTDetail>();
  useEffect(() => {
    if (!account || !nftid || !web3Object) {
      return;
    }
    dispatch(addSpining());
    getMyNftDetail(account, nftid)
      .then((res: NFTDetail) => {
        setNftInfo(res);
      })
      .finally(() => {
        dispatch(delSpining());
      });
  }, [nftid, account, web3Object, dispatch, getMyNftDetail]);

  //卖
  function sell() {
    if (nftInfo) {
      openSale(nftInfo);
    }
  }

  return (
    <Style>
      <div className="title">
        <div className="back" onClick={back}></div>
        <div className="title-txt">{t("detail.title1")}</div>
      </div>
      <div className="detail-content">
        <div className="img">
          <CardImg data={nftInfo} />
        </div>
        <div className="img-right-title">
          {t("detail.ct")}: {nftInfo?.name || `#${nftInfo?.id}`}
        </div>
        <div className="button">
          <Button size="small" onClick={sell}>
            {t("sell")}
          </Button>
        </div>
        <div className="card">
          <div className="card-title">{t("detail.description")}</div>
          <div className="card-body">
            {t("detail.note")}: {nftInfo?.description}
          </div>
        </div>
        <div className="card metadata">
          <div className="card-title">{t("detail.matadata")}</div>
          <div className="card-body">
            <div className="card-item">
              <div className="item-label">{t("head")}</div>
              <div className="item-value">{nftInfo?.head}</div>
            </div>
            <div className="card-item">
              <div className="item-label">{t("body")}</div>
              <div className="item-value">{nftInfo?.body}</div>
            </div>
            <div className="card-item">
              <div className="item-label">{t("back")}</div>
              <div className="item-value">{nftInfo?.back}</div>
            </div>
            <div className="card-item">
              <div className="item-label">{t("fin")}</div>
              <div className="item-value">{nftInfo?.fin}</div>
            </div>
            <div className="card-item">
              <div className="item-label">{t("tail")}</div>
              <div className="item-value">{nftInfo?.tail}</div>
            </div>
            <div className="card-item">
              <div className="item-label">{t("flank")}</div>
              <div className="item-value">{nftInfo?.flank}</div>
            </div>
            <div className="card-item">
              <div className="item-label">{t("crown")}</div>
              <div className="item-value">{nftInfo?.crown}</div>
            </div>
            <div className="card-item">
              <div className="item-label">{t("joint")}</div>
              <div className="item-value">{nftInfo?.joint}</div>
            </div>
            <div className="card-item">
              <div className="item-label">{t("quality")}</div>
              <div className="item-value">
                {nftInfo?.quality === "0" ? "green" : "blue"}
              </div>
            </div>
            <div className="card-item">
              <div className="item-label">{t("level")}</div>
              <div className="item-value">{nftInfo?.level}</div>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-title">{t("detail.properties")}</div>
          <div className="card-body">
            <div className="card-item">
              <div className="item-label">{t("contract address")}:</div>
              <a
                className="item-value"
                target="_blank"
                href={config.scanRpc + config.CardsAddress}
                rel="noreferrer"
              >
                {formatAddress(config.CardsAddress, 10)}
              </a>
            </div>
            <div className="card-item">
              <div className="item-label">{t("token standard")}:</div>
              <div className="item-value">ERC721</div>
            </div>
            <div className="card-item">
              <div className="item-label">{t("blockchain：")}</div>
              <div className="item-value">{config.chainName}</div>
            </div>
          </div>
        </div>
      </div>
    </Style>
  );
}
