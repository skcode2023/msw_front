import { formatAddress } from "@utils/commonFunction";
import { useCallback } from "react";
import Style, { Tem } from "./Style";
import CardImg from "@com/CardImg";
import CheckBox from "@com/CheckBox";
import { useTranslation } from "react-i18next";
import { useState } from "react";

export function TemCard() {
  return <Tem />;
}

/**
 * - data：卡片数据
 * - onClick：卡片点击事件
 * - button：扩展按钮
 * - buttonText：按钮文字
 * - buttonOnClick：按钮触发函数
 * - buttonDisabled：按钮是否可以触发
 */
export default function CardStake({
  data,
  onClick
}: {
  data: NFTCard;
  onClick?: (data: NFTCard) => void;
}) {
  const { t } = useTranslation();
  const [checkAll, setCheckAll] = useState(false);
  const click = useCallback(() => {
    if (onClick) {

      onClick(data);

    }

  }, [onClick, data]);
function changeSelect(){
  setCheckAll(!checkAll)
}
  return (
    <Style
      id={data.id}
      quality={data.quality}
      onClick={onClick ? click : undefined}
    >
      <div className={checkAll ? "select-nft": "unselect-nft"} onClick={changeSelect}>
        <div className="card-img">
          <CardImg data={data} />
        </div>
        <div className="card-info">
          <div className="card-id">{formatAddress(data.id, 8)}</div>
          {data.address && (
            <div className="card-item">
              <div className="card-item-label">{t("address")}</div>
              <div className="card-item-value address">
                {formatAddress(data.address, 6, 4)}
              </div>
            </div>
          )}
          {data.time && (
            <div className="card-item">
              <div className="card-item-label">{t("time")}</div>
              <div className="card-item-value">{data.time}</div>
            </div>
          )}
          {data.amount && (
            <div className="card-item">
              <div className="card-item-label">{t("amount")}</div>
              <div className="card-item-value">{data.amount}</div>
            </div>
          )}
        </div>
        <div className="card-action">
          <div className="card-action-button-top"></div>
          <button className="card-button">
            <CheckBox checked={checkAll} ></CheckBox>
            <span className="card-button-text">SELECT</span>
          </button>
        </div>
      </div>
    </Style>
  );
}
