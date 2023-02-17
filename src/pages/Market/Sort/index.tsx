import Select from "@com/Select";
import Style from "./Style";
import SortAsc from "@img/sort-ascending.png";
import SortDesc from "@img/sort-descending.png";
import { SetState } from "ahooks/lib/useSetState";
import { useEffect } from "react";
import { useMemoizedFn } from "ahooks";
import { useTranslation } from "react-i18next";

/**筛选组件 */
export default function Sort({ setSort }: { setSort: SetState<SortBody> }) {
  const { t } = useTranslation();

  const changePrice = useMemoizedFn((value: string | number) => {
    setSort({
      price: value as "desc" | "asc",
      time: "",
    });
  });
  const changeTime = useMemoizedFn((value: string | number) => {
    setSort({
      time: value as "newest" | "oldest",
      price: "",
    });
  });

  useEffect(() => {
    setSort({
      time: "newest",
      price: "",
    });
  }, [setSort]);

  return (
    <Style>
      {!window.isPhone && <div className="sort-title">{t("time")}:</div>}
      <Select
        options={[
          {
            label: (
              <span>
                {t("market.filters.newest")}
                <img className="sort-img" src={SortDesc} alt="" />
              </span>
            ),
            optionLabel: t("market.filters.newest"),
            value: "newest",
          },
          {
            label: (
              <span>
                {t("market.filters.oldest")}
                <img className="sort-img" src={SortAsc} alt="" />
              </span>
            ),
            optionLabel: t("market.filters.oldest"),
            value: "oldest",
          },
        ]}
        onChange={changeTime}
      />
      {!window.isPhone && <div className="sort-title">{t("price")}:</div>}
      <Select
        options={[
          {
            label: (
              <span>
                {t("market.filters.desc")}
                <img className="sort-img" src={SortDesc} alt="" />
              </span>
            ),
            optionLabel: t("market.filters.desc"),
            value: "desc",
          },
          {
            label: (
              <span>
                {t("market.filters.asc")}
                <img className="sort-img" src={SortAsc} alt="" />
              </span>
            ),
            optionLabel: t("market.filters.asc"),
            value: "asc",
          },
        ]}
        onChange={changePrice}
      />
    </Style>
  );
}
