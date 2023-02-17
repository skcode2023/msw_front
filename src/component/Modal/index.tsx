import { ModalProps } from "antd";
import Style from "./Style";

export default function Modal(props: ModalProps) {
  return (
    <Style {...props} footer={null} maskClosable={window.isPhone} centered>
      {props.children}
    </Style>
  );
}
