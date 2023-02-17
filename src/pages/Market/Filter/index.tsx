import Input from "@com/Input";
import Style from "./Style";
import FilterSearch from "@img/filter-search.png";
import FilterNumber from "@img/filter-number.png";
import { SearchOutlined } from "@ant-design/icons";
import { useSetState } from "ahooks";
import { useCallback, useEffect, useState } from "react";
import Button from "@com/Button";
import { SetState } from "ahooks/lib/useSetState";
// import { useAppSelector } from "@ar/hooks";
import CheckBox from "@com/CheckBox";
import { message } from "antd";
import { useTranslation } from "react-i18next";

/**
 * - onChange：筛选变化
 */
export default function Filter({
  filter,
  setFilter,
  onClick,
}: {
  filter: FilterBody;
  setFilter: SetState<FilterBody>;
  onClick?: () => void;
}) {
  // const { tokenName, nativeTokenName } = useAppSelector(
  //   (state) => state.web3Info
  // );
  const { t } = useTranslation();

  const click = useCallback(() => {
    if (onClick) {
      onClick();
    }
  }, [onClick]);

  //修改 nft state
  // function changeState(checked: boolean, value: "sale" | "all") {
  //   if (checked) {
  //     setFilter({
  //       state: value,
  //     });
  //   }
  // }
  //修改quality
  function changeQuality(checked: boolean, value: "0" | "1") {
    if (checked) {
      //正选
      if (filter.quality !== "") {
        //全选
        setFilter({
          quality: "all",
        });
      } else {
        setFilter({
          quality: value,
        });
      }
    } else {
      //反选
      if (filter.quality === "all") {
        //反选一个
        setFilter({
          quality: value === "0" ? "1" : "0",
        });
      } else {
        setFilter({
          quality: "",
        });
      }
    }
  }

  // #region 修改search
  const [search, setSearch] = useState("");
  function changeSearchVlue(e: any) {
    setSearch(e.target.value);
    setFilter({
      search: e.target.value,
    });
  }
  function changeSearch() {
    console.log(search);
    setFilter({
      search: search,
    });
  }
  // #endregion

  // #region 修改price
  const [price, setPrice] = useSetState<FilterPrice>({
    unit: "",
  });
  // //选择价格单位
  // function changePriceUnit(checked: boolean, value: string) {
  //   if (checked) {
  //     //正选
  //     setPrice({
  //       unit: value,
  //     });
  //   } else {
  //     setPrice({
  //       unit: "",
  //     });
  //   }
  // }
  //修改最低价格
  function changePriceMin(value: any) {
    setPrice({
      min: value ? value : undefined,
    });
  }
  //修改最高价格
  function changePriceMax(value: any) {
    setPrice({
      max: value ? value : undefined,
    });
  }
  //确定价格筛选
  function changePrice() {
    if (price.min && price.max && price.min > price.max) {
      return message.warn(t("message.tm"));
    }
    click();
    setFilter({
      price: price,
    });
  }
  //清理tag时同步price
  useEffect(() => {
    if (!filter.price.min && !filter.price.max && filter.price.unit === "") {
      setPrice({
        unit: "",
        min: undefined,
        max: undefined,
      });
    }
  }, [filter, setPrice]);
  // #endregion

  return (
    <Style>
      <Input
        backImg={FilterSearch}
        InputProps={{
          prefix: <SearchOutlined style={{ color: "#140D0C" }} />,
          placeholder: t("market.filters.placeholder") || "please enter nftid",
          onChange: changeSearchVlue,
          onPressEnter: changeSearch,
          value: filter.search || undefined,
        }}
      />
      <div className="title">
        <div className="icon"></div>
        <div className="txt">{t("market.filters")}</div>
      </div>
      <div className="filter-item">
        <div className="filter-item-title">{t("market.filters.price")}</div>
        {/* <div className="filter-item-select">
          <div className="filter-item-select-title">
            <div className="filter-item-select-icon bnb"></div>
            {nativeTokenName}
          </div>
          <CheckBox
            checked={price.unit === nativeTokenName}
            onChange={(e: any) => {
              changePriceUnit(e.target.checked, nativeTokenName);
            }}
          />
        </div> */}
        {/* <div className="filter-item-select">
          <div className="filter-item-select-title">
            <div className="filter-item-select-icon tut"></div>
            {tokenName}
          </div>
          <CheckBox
            checked={price.unit === tokenName}
            onChange={(e: any) => {
              changePriceUnit(e.target.checked, tokenName);
            }}
          />
        </div> */}
      </div>
      <div className="filter-item-no-divider">
        <div className="filter-item-distance">
          <div className="filter-item-distance-number">
            <Input
              type="number"
              backImg={FilterNumber}
              InputNumberProps={{
                size: "small",
                placeholder: "MIN",
                onChange: changePriceMin,
                precision: 6,
                min: 0.000001,
                max: 999999999.999999,
                value: price.min,
              }}
            />
          </div>
          <div className="filter-item-distance-txt">to</div>
          <div className="filter-item-distance-number">
            <Input
              type="number"
              backImg={FilterNumber}
              InputNumberProps={{
                size: "small",
                placeholder: "MAX",
                onChange: changePriceMax,
                precision: 6,
                min: 0.000001,
                max: 999999999.999999,
                value: price.max,
              }}
            />
          </div>
        </div>
        <div className="filter-item-button">
          <Button size="large" onClick={changePrice}>
            Apply
          </Button>
        </div>
      </div>
      <div className="filter-item">
        <div className="filter-item-title">{t("market.filters.quality")}</div>
        <div className="filter-item-select">
          <div className="filter-item-select-title">Green</div>
          <CheckBox
            checked={filter.quality === "0" || filter.quality === "all"}
            onChange={(e: any) => {
              changeQuality(e.target.checked, "0");
            }}
          />
        </div>
        <div className="filter-item-select">
          <div className="filter-item-select-title">Blue</div>
          <CheckBox
            checked={filter.quality === "1" || filter.quality === "all"}
            onChange={(e: any) => {
              changeQuality(e.target.checked, "1");
            }}
          />
        </div>
      </div>
    </Style>
  );
}
