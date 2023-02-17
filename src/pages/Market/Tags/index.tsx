import Tag from "@com/Tag";
import { useMemoizedFn } from "ahooks";
import { SetState } from "ahooks/lib/useSetState";
import { useEffect, useState } from "react";
import Style from "./Style";

const quality = {
  "": "",
  "0": "green",
  "1": "blue",
};

export default function Tags({
  filter,
  setFilter,
}: {
  filter: FilterBody;
  setFilter: SetState<FilterBody>;
}) {
  const [tags, setTags] = useState<JSX.Element[]>([]);

  const closePrice = useMemoizedFn(() => {
    setFilter({
      price: { unit: "" },
    });
  });
  const closeQuality = useMemoizedFn(() => {
    setFilter({
      quality: "all",
    });
  });
  const closeSearch = useMemoizedFn(() => {
    setFilter({
      search: "",
    });
  });

  useEffect(() => {
    const result: JSX.Element[] = [];
    if (filter.price.min || filter.price.max || filter.price.unit) {
      const unit = filter.price.unit || "price";
      const min =
        filter.price.min === undefined ? "min" : Number(filter.price.min);
      const max =
        filter.price.max === undefined ? "max" : Number(filter.price.max);
      result.push(
        <Tag key="price" onClose={closePrice}>{`${unit}:${min}-${max}`}</Tag>
      );
    }
    if (filter.quality !== "all") {
      result.push(
        <Tag key="quality" onClose={closeQuality}>{`Quality:${
          quality[filter.quality]
        }`}</Tag>
      );
    }
    if (filter.search) {
      result.push(
        <Tag key="search" onClose={closeSearch}>{`NFT:${filter.search}`}</Tag>
      );
    }
    setTags(result);
  }, [filter, closePrice, closeQuality, closeSearch]);

  return <Style>{tags}</Style>;
}
