import { useCallback, useEffect, useState } from "react";
import Style from "./Style";
import Card, { TemCard } from "@com/Card";
import Pagination from "@com/Pagination";
import Button from "@com/Button";
import useApi from "@utils/useApi";
import { useWeb3React } from "@web3-react/core";
import { useNavigate } from "react-router-dom";
import { useMemoizedFn } from "ahooks";
import { useWeb3Object } from "@utils/web3/useWeb3Object";
import { useTranslation } from "react-i18next";

export default function MyProps({ visible }: { visible: boolean }) {
  const { getMyProps } = useApi();
  const [list, setList] = useState<any>([
    {
      id: "Guild Card",
      amount: 0,
    },
    {
      id: "Box",
      amount: 0,
    },
  ]);
  const { account } = useWeb3React();
  const web3Object = useWeb3Object();
  const { t } = useTranslation();

  useEffect(() => {
    if (visible && account && web3Object) {
      getMyProps(account).then((res) => {
        setList(res);
      });
    }
  }, [getMyProps, visible, account, web3Object]);

  const [pageInfo, setPageInfo] = useState({ pageSize: 10, pageIndex: 1 });
  const [viewList, setViewList] = useState<NFTCard[]>([]);
  const navigate = useNavigate();

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

  //使用道具
  const useProps = useMemoizedFn((_e: any, item: NFTCard) => {
    if (item.id === "Box") {
      navigate("/box");
    } else {
      navigate("/store");
    }
  });

  return (
    <Style visible={visible}>
      <div className="tips">
        <div className="txt phoneTxt">
          {t("personal.mp", { count1: list[0].amount, count2: list[1].amount })}
        </div>
        {/* <div className="txt">
          You can select cards to accurately view the cards you want to use
        </div> */}
      </div>
      {viewList.length > 0 ? (
        <>
          <div className="list">
            {viewList.map((item: any) => {
              return (
                <Card
                  key={item.id}
                  data={item}
                  button={
                    <div className="card-button">
                      <Button
                        size="small"
                        callbackData={item}
                        onClick={useProps}
                      >
                        <span className="card-button-text">{t("use")}</span>
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
