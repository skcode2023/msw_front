import { useAppSelector } from "@ar/hooks";
import Button from "@com/Button";
import CardImg from "@com/CardImg";
import { formatAddress } from "@utils/commonFunction";
import useApi from "@utils/useApi";
import config from "@utils/web3/config";
import { useWeb3Object, useWeb3Utils } from "@utils/web3/useWeb3Object";
import { useMemoizedFn } from "ahooks";
import { Col, message, Row } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Style from "./Style";

export default function Detail({
  nftid,
  buyNft,
}: {
  nftid: string;
  buyNft: (nftInfo: NFTCard) => void;
}) {
  const navigate = useNavigate();
  const { marketServiceCahrge } = useAppSelector((state) => state.web3Info);
  const { getMarketNftDetail } = useApi();
  const [nftInfo, setNftInfo] = useState<NFTDetail>();
  const web3Object = useWeb3Object();
  const { fromWei } = useWeb3Utils();
  const { t } = useTranslation();

  useEffect(() => {
    //初始化自动滚动到顶部
    document.getElementById("root")?.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  useEffect(() => {
    if (web3Object) {
      getMarketNftDetail(nftid).then((res) => {
        setNftInfo(res);
      });
    }
  }, [web3Object, getMarketNftDetail, nftid]);

  //购买nft
  const buy = useMemoizedFn(async () => {
    if (nftInfo) {
      buyNft(nftInfo);
    } else {
      message.error(t("message.ne"));
    }
  });

  function back() {
    navigate(-1);
  }

  return (
    <Style>
      <div className="title">
        <div className="back" onClick={back}></div>
        <div className="title-txt">{t("header.market")}</div>
      </div>
      <div className="content">
        <div className="img">
          <CardImg data={nftInfo} />
        </div>
        <div className="img-right-title">
          {t("detail.ct")}: {nftInfo?.name || `#${nftInfo?.id}`}
        </div>
        <div className="card">
          <div className="card-title">{t("price")}</div>
          <div className="card-body">
            <div className="price">
              {nftInfo?.price} {nftInfo?.unit}
            </div>
            <div className="tip">
              {t("detail.note")}:
              <br />
              {t("detail.buy.tip")}
            </div>
            <div className="button">
              <Button size="small" onClick={buy}>
                {t("buy")}
              </Button>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-body">
            <Row className="price-info">
              <Col className="price-info-value" span={12}>
                {marketServiceCahrge}%
              </Col>
              <Col className="price-info-value" span={12}>
                {nftInfo &&
                  moment(Number(nftInfo.timeStamp) * 1000).format(
                    "YYYY-MM-DD HH:mm:ss"
                  )}
              </Col>
              <Col className="price-info-label" span={12}>
                {t("Transaction tax")}
              </Col>
              <Col className="price-info-label" span={12}>
                {t("Last time")}
              </Col>
            </Row>
          </div>
        </div>
        <div className="card">
          <div className="card-title">{t("detail.properties")}</div>
          <div className="card-body">
            <div className="card-item">
              <div className="item-label">{t("contract address")}:</div>
              <div className="item-value">
                {formatAddress(config.CardsAddress, 6, 4)}
              </div>
            </div>
            <div className="card-item">
              <div className="item-label">{t("token standard")}:</div>
              <div className="item-value">ERC721</div>
            </div>
            <div className="card-item">
              <div className="item-label">{t("blockchain")}：</div>
              <div className="item-value">{config.chainName}</div>
            </div>
            <div className="card-item">
              <div className="item-label">{t("sell token")}：</div>
              <div className="item-value">{nftInfo?.unit}</div>
            </div>
          </div>
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
            <Row className="metadata">
              <Col span={6}>{t("head")}</Col>
              <Col span={6}>{nftInfo?.head}</Col>
              <Col span={6}>{t("body")}</Col>
              <Col span={6}>{nftInfo?.body}</Col>
              <Col span={6}>{t("back")}</Col>
              <Col span={6}>{nftInfo?.back}</Col>
              <Col span={6}>{t("fin")}</Col>
              <Col span={6}>{nftInfo?.fin}</Col>
              <Col span={6}>{t("tail")}</Col>
              <Col span={6}>{nftInfo?.tail}</Col>
              <Col span={6}>{t("flank")}</Col>
              <Col span={6}>{nftInfo?.flank}</Col>
              <Col span={6}>{t("crown")}</Col>
              <Col span={6}>{nftInfo?.crown}</Col>
              <Col span={6}>{t("joint")}</Col>
              <Col span={6}>{nftInfo?.joint}</Col>
              <Col span={6}>{t("quality")}</Col>
              <Col span={6}>{nftInfo?.quality === "1" ? "blue" : "green"}</Col>
              <Col span={6}>{t("level")}</Col>
              <Col span={6}>{nftInfo?.level}</Col>
            </Row>
          </div>
        </div>
        <div className="card transaction">
          <div className="card-title">{t("detail.nt")}</div>
          <div className="card-body">
            <Row className="tran-title">
              <Col span={4}>{t("Blockchain")}</Col>
              <Col span={4}>{t("token")}</Col>
              <Col span={4}>{t("price")}</Col>
              <Col span={4}>{t("from")}</Col>
              <Col span={4}>{t("to")}</Col>
              <Col span={4}>{t("date")}</Col>
            </Row>
            {nftInfo?.transaction &&
              nftInfo.transaction.map((ele: transactionItem) => {
                return (
                  <Row key={ele.date} className="tran-body">
                    <Col span={4}>{ele.blockchain}</Col>
                    <Col span={4}>{ele.token}</Col>
                    <Col span={4}>{fromWei(ele.price)}</Col>
                    <Col span={4}>{formatAddress(ele.from, 6, 6)}</Col>
                    <Col span={4}>{formatAddress(ele.to, 6, 6)}</Col>
                    <Col span={4}>{ele.date}</Col>
                  </Row>
                );
              })}
          </div>
        </div>
      </div>
    </Style>
  );
}
