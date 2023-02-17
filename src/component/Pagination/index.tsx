import Button from "@com/Button";
import Input from "@com/Input";
import { useEffect, useRef, useState } from "react";
import Style from "./Style";
import PInput from "@img/pagination-input.png";

export default function Pagination({
  total,
  pageSize,
  onChange,
}: {
  total: number;
  pageSize: number;
  onChange: (pageIndex: number, pageSize: number) => void;
}) {
  const [max, setMax] = useState<number>(1);
  const [pageIndex, setPageIndex] = useState<number>(1);
  const RootDom = useRef<HTMLElement | null>(null);

  useEffect(() => {
    RootDom.current = document.getElementById("root");
  }, []);

  useEffect(() => {
    setMax(Math.ceil(total / pageSize));
    setPageIndex(1);
  }, [total, pageSize]);

  /**点击上一页 */
  function clickPre() {
    if (pageIndex <= 1) {
      setPageIndex(1);
    } else {
      setPageIndex((current) => current - 1);
    }
  }
  /**点击下一页 */
  function clickNext() {
    if (pageIndex >= max) {
      setPageIndex(max);
    } else {
      setPageIndex((current) => current + 1);
    }
  }
  function changePageIndex(current: any) {
    if (current <= 1) {
      setPageIndex(1);
    } else if (current >= max) {
      setPageIndex(max);
    } else {
      setPageIndex(current);
    }
  }

  useEffect(() => {
    if (RootDom.current) {
      RootDom.current.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
    onChange(pageIndex, pageSize);
  }, [pageIndex, pageSize, onChange]);

  if (max === 1 || total === 0) {
    return null;
  } else {
    return (
      <Style>
        <div className="pagination-button">
          <Button onClick={clickPre} size="small">
            <svg viewBox="0 0 12 18">
              <path d="M 12 0 L 12 18 L 0 9 z" fill="rgba(255,255,255,0.5)" />
            </svg>
          </Button>
        </div>
        {!window.isPhone ? (
          <>
            <div className="pagination-input">
              <Input
                type="number"
                backImg={PInput}
                InputNumberProps={{
                  defaultValue: 1,
                  value: pageIndex,
                  onChange: changePageIndex,
                  precision: 0,
                }}
              />
            </div>
            <span className="pagination-total">
              {"of "}
              {max}
            </span>
          </>
        ) : (
          <span className="pagination-total">
            {pageIndex} / {max}
          </span>
        )}
        <div className="pagination-button">
          <Button onClick={clickNext} size="small">
            <svg viewBox="0 0 12 18">
              <path d="M 0 0 L 12 9 L 0 18 z" fill="rgba(255,255,255,0.5)" />
            </svg>
          </Button>
        </div>
      </Style>
    );
  }
}
