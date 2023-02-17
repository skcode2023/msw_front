import {
  Input as AntdInput,
  InputNumber,
  InputNumberProps,
  InputProps,
} from "antd";
import Style from "./Style";

export default function Input({
  backImg = "",
  type,
  InputProps = {},
  InputNumberProps = {},
}: {
  backImg?: string; //背景图片
  type?: "number"; //是否调用number
  InputProps?: InputProps; //antd Input组件属性
  InputNumberProps?: InputNumberProps; //antd InutNumber组件属性
}) {
  if (type === "number") {
    return (
      <Style backImg={backImg} type="number">
        <InputNumber
          size="large"
          bordered={false}
          controls={false}
          width="100%"
          min={0}
          {...InputNumberProps}
        />
      </Style>
    );
  } else {
    return (
      <Style backImg={backImg}>
        <AntdInput {...InputProps} size="large" bordered={false} width="100%" />
      </Style>
    );
  }
}
