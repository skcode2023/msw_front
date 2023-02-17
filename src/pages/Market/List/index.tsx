import Button from "@com/Button";
import Card, { TemCard } from "@com/Card";
import Pagination from "@com/Pagination";
import { useWeb3React } from "@web3-react/core";
import { useMemoizedFn } from "ahooks";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Style from "./Style";

export default function List({
  list,
  clickCard,
  buyNft,
}: {
  list: NFTCard[];
  clickCard: (
    s: React.SetStateAction<
      Partial<{
        nftid?: any;
      }>
    >
  ) => void;
  buyNft: (nftInfo: NFTCard) => void;
}) {
  const [pageInfo, setPageInfo] = useState({ pageSize: 10, pageIndex: 1 });
  const [viewList, setViewList] = useState<NFTCard[]>([]);
  const { account } = useWeb3React();
  const { t } = useTranslation();

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

  const onClick = useMemoizedFn((item: NFTCard) => {
    clickCard({ nftid: item.id });
  });

  return (
    <Style>
      {viewList.length > 0 ? (
        <>
          <div className="list">
            {viewList.map((item) => {
              //判断是否是自己发布的
              const isMy =
                account?.toLocaleLowerCase() ===
                item.address?.toLocaleLowerCase();
              return (
                <Card
                  key={item.id}
                  data={item}
                  onClick={onClick}
                  button={
                    <div className="card-button">
                      <Button
                        size="small"
                        onClick={(e: any) => {
                          buyNft(item);
                          e.stopPropagation();
                        }}
                        type={isMy ? "danger" : undefined}
                      >
                        <span className="card-button-text">{t("buy")}</span>
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
