import { useBoolean, useMemoizedFn } from "ahooks";
import { useEffect, useState } from "react";
import Style from "./Style";

/**
 * 下拉框组件
 * - options：选项
 *  - label：选项名
 *  - optionLabel：如果出现该选项，则在下拉菜单中替代label展示
 *  - value：选项值
 * - onChange：选择之后返回
 * - theme：浅色下拉框
 */
export default function Select({
  options,
  onChange,
  theme,
}: {
  options: {
    label: string | JSX.Element | null;
    optionLabel?: string | JSX.Element | null;
    value: string | number;
  }[];
  onChange: (value: string | number) => void;
  theme?: "white";
}) {
  const [current, setCurrent] = useState(options[0]); //当前值
  const [isOn, { setTrue, setFalse }] = useBoolean(false); //当前是否处于选择状态

  useEffect(() => {
    document.addEventListener("click", setFalse);
    return () => {
      document.removeEventListener("click", setFalse);
    };
  }, [setFalse]);

  useEffect(() => {
    onChange(current.value);
  }, [current, onChange]);

  const toggle = useMemoizedFn(() => {
    if (isOn) {
      setFalse();
    } else {
      setTimeout(() => {
        setTrue();
      }, 100);
    }
  });

  return (
    <Style isOn={isOn} theme={theme}>
      <div className="select-content" onClick={toggle}>
        <div className="select-value">{current.label}</div>
        <div className="select-icon">
          <svg viewBox="0 0 12 8">
            <path
              d="M 0 0 L 12 0 L 6 8 z"
              fill={theme === "white" ? "#13090A" : "#ffffff"}
            />
          </svg>
        </div>
      </div>
      <div className="select-options">
        {options.map((ele) => {
          return (
            <div
              className="select-option"
              key={ele.value}
              onClick={() => {
                setCurrent(ele);
                setFalse();
              }}
            >
              {ele.optionLabel || ele.label}
            </div>
          );
        })}
      </div>
    </Style>
  );
}
