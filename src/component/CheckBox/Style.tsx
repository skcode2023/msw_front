import { Checkbox } from "antd";
import styled, { css } from "styled-components";
import CheckBox from "@img/checkbox-bg.png";
import CheckBox1 from "@img/checkbox-bg-active.png";

export default styled(Checkbox)<{ checked?: boolean }>`
  .ant-checkbox {
    &.ant-checkbox-checked {
      .ant-checkbox-inner {
        border: 1px solid rgba(104, 82, 82, 0.71);
        ${(props) => {
          if (props.checked) {
            return css`
              background-image: url(${CheckBox1});
              background-size: 100% 100%;
            `;
          }
        }}
      }
    }
    .ant-checkbox-inner {
      border: 1px solid rgba(104, 82, 82, 0.71);
      ${(props) => {
        if (!props.checked) {
          return css`
            background-image: url(${CheckBox});
            background-size: 100% 100%;
          `;
        }
      }}
    }
  }
`;
