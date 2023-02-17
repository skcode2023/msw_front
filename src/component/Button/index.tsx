import { useMemoizedFn } from "ahooks";
import Style from "./Style";

/**
 * 按钮
 * - children：按钮内文字
 * - onClick：点击触发
 * - width：按钮宽度
 * - size：large-280px normal-168px small-108px 默认normal
 * - type：default-紫色按钮 primary-蓝色按钮 danger-红色按钮
 * - disabled：true不可点击
 */
export default function Button({
  children,
  onClick,
  width = "100%",
  size = "normal",
  type = "default",
  disabled = false,
  callbackData,
}: {
  children: JSX.Element | string | null;
  onClick: Function;
  width?: string;
  size?: "large" | "normal" | "small";
  type?: "default" | "primary" | "danger";
  disabled?: boolean;
  callbackData?: any;
}) {
  const click = useMemoizedFn((e: any) => {
    onClick(e, callbackData);
  });

  return (
    <Style
      className="animation-button"
      onClick={click}
      width={width}
      disabled={disabled}
      size={size}
      type={type}
    >
      {children}
    </Style>
  );
}
