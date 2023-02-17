import { useEffect, useState } from "react";
import Style from "./Style";
import Card, { TemCard } from "@com/Card";
import Pagination from "@com/Pagination";
import Button from "@com/Button";
import useApi from "@utils/useApi";
import { useWeb3Object } from "@utils/web3/useWeb3Object";
import { useWeb3React } from "@web3-react/core";
import { useMemoizedFn } from "ahooks";
import { useAppDispatch } from "@ar/hooks";
import { addSpining, delSpining } from "@ar/state";
import { message } from "antd";
import { useTranslation } from "react-i18next";

export default function OnSell({ visible }: { visible: boolean }) {
  const { getMarketNftList, getMyNftList } = useApi();
  const [list, setList] = useState<NFTCard[]>([]);
  const web3Object = useWeb3Object();
  const { account } = useWeb3React();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  /**查询市场数据 */
  const init = useMemoizedFn((isForce?: boolean) => {
    getMarketNftList(isForce).then((res) => {
      setList(
        res
          .filter(
            (ele) =>
              ele.address?.toLocaleLowerCase() === account?.toLocaleLowerCase()
          )
          .map((ele) => {
            return { ...ele, amount: undefined };
          })
      );
    });
  });

  useEffect(() => {
    if (web3Object && visible && account) {
      init();
    }
  }, [getMarketNftList, web3Object, visible, account, init]);

  const [pageInfo, setPageInfo] = useState({ pageSize: 10, pageIndex: 1 });
  const [viewList, setViewList] = useState<NFTCard[]>([]);

  useEffect(() => {
    const start = (pageInfo.pageIndex - 1) * pageInfo.pageSize;
    const end = pageInfo.pageIndex * pageInfo.pageSize;
    setViewList(list.slice(start, end));
  }, [list, pageInfo]);

  const changePage = useMemoizedFn((pageIndex: number, pageSize: number) => {
    setPageInfo({
      pageSize: pageSize,
      pageIndex: pageIndex,
    });
  });

  //取消售卖
  const cancel = useMemoizedFn((_e: any, item: NFTCard) => {
    if (!web3Object || !account) {
      return;
    }
    dispatch(addSpining());
    web3Object.ContractMarket.methods
      .removeGoods(item.marketEventIndex)
      .send({
        from: account,
      })
      .on("transactionHash", function (hash: any) {
        console.log("取消售卖", hash);
      })
      .on("receipt", async (receipt: any) => {
        console.log("取消售卖", receipt);
        //取消成功
        init(true);
        getMyNftList(account, true);
        message.success(t("message.sc"));
      })
      .on("error", function (error: any) {
        console.log("取消售卖", error);
        message.error(error.message);
      })
      .finally(() => {
        dispatch(delSpining());
      });
  });

  return (
    <Style visible={visible}>
      <div className="tips">
        <div className="txt phoneTxt">
          {t("personal.os", { count: viewList.length })}
        </div>
        {/* <div className="txt">
          You can select cards to accurately view the cards you want to cancel
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
                  button={
                    <div className="card-button">
                      <Button size="small" callbackData={item} onClick={cancel}>
                        <span className="card-button-text">{t("cancel")}</span>
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
