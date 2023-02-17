import { useCallback, useEffect, useState } from "react";
import Style from "./Style";
import Card, { TemCard } from "@com/Card";
import Pagination from "@com/Pagination";
import Button from "@com/Button";
import useApi from "@utils/useApi";
import { useWeb3React } from "@web3-react/core";
import { useWeb3Object } from "@utils/web3/useWeb3Object";
import { useMemoizedFn } from "ahooks";
import { useAppSelector } from "@ar/hooks";
import { useTranslation } from "react-i18next";
import { state } from "@ar/state";

export default function MyNft({
  visible,
  clickNft,
  openSale,
}: {
  visible: boolean;
  clickNft: (
    s: React.SetStateAction<
      Partial<{
        nftid?: any;
      }>
    >
  ) => void;
  openSale: (nftInfo: NFTCard) => void; //点击打开售卖窗口
}) {
  const { getMyNftList } = useApi();
  const list = useAppSelector((state) => state.web3Info.myNftList);
  const { account } = useWeb3React();
  const web3Object = useWeb3Object();
  const { t } = useTranslation();

  useEffect(() => {
    if (account && web3Object) {
      getMyNftList(account);
    }
  }, [getMyNftList, account, web3Object,list]);

  const [pageInfo, setPageInfo] = useState({ pageSize: 10, pageIndex: 1 });
  const [viewList, setViewList] = useState<NFTCard[]>([]);

  useEffect(() => {
    const start = (pageInfo.pageIndex - 1) * pageInfo.pageSize;
    const end = pageInfo.pageIndex * pageInfo.pageSize;
    setViewList(list.slice(start, end));
  }, [list, pageInfo]);

  const changePage = useCallback(
    (pageIndex: number, pageSize: number) => {
      setPageInfo({
        pageSize: pageSize,
        pageIndex: pageIndex,
      });
    },
    [setPageInfo]
  );

  //点击sell按钮
  const sell = useMemoizedFn((item: NFTCard) => {
    clickNft({ nftid: item.id });
  });

  return (
    <Style visible={visible}>
      <div className="tips">
        <div className="txt phoneTxt">
          {t("personal.mn", { count: viewList.length })}
        </div>
        {/* <div className="txt">
          You can select cards to accurately view the cards you want to sell
        </div> */}
      </div>
      {viewList.length > 0 ? (
        <>
          <div className="list">
            {viewList.map((item) => {
              return (
                <Card
                  key={item.id}
                  data={item}
                  onClick={() => {
                    sell(item);
                  }}
                  button={
                    <div className="card-button">
                      <Button
                        size="small"
                        onClick={(e: any) => {
                          openSale(item);
                          e.stopPropagation();
                        }}
                        type={item.isSale ? "danger" : undefined}
                        disabled={item.isSale}
                      >
                        <span className="card-button-text">{t("sell")}</span>
                      </Button>
                    </div>
                  }
                />
              );
            })}
            <TemCard />
            <TemCard />
            <TemCard />
            <TemCard />
          </div>
          <div className="paging">
            <Pagination
              total={list.length}
              pageSize={12}
              onChange={changePage}
            />
          </div>
        </>
      ) : (
        <div className="no-data">
          <div className="no-data-title">{t("nd")}</div>
          <div className="no-data-tips">{t("nd.tip")}</div>
        </div>
      )}
    </Style>
  );
}
