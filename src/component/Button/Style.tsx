import styled, { css } from "styled-components";
import BtnLDefault from "@img/button-large-default.png";
import BtnNDanger from "@img/button-normal-danger.png";
import BtnNDefault from "@img/button-normal-default.png";
import BtnSDefault from "@img/button-small-default.png";
import BtnSPrimary from "@img/button-small-primary.png";

export default styled.div<{
  disabled: boolean;
  width: string;
  size: "large" | "normal" | "small";
  type: "default" | "primary" | "danger";
}>`
  ${(props) => {
    if (props.size === "large" && props.type === "default") {
      return css`
        background-image: url(${BtnLDefault});
      `;
    } else if (props.size === "normal" && props.type === "danger") {
      return css`
        background-image: url(${BtnNDanger});
      `;
    } else if (props.size === "small" && props.type === "default") {
      return css`
        background-image: url(${BtnSDefault});
        &:hover {
          background-image: url(${BtnNDefault});
        }
      `;
    } else if (props.size === "small" && props.type === "primary") {
      return css`
        background-image: url(${BtnSPrimary});
      `;
    } else {
      return css`
        background-image: url(${BtnNDefault});
      `;
    }
  }}
  width: ${(props) => props.width};
  height: 40px;
  min-width: 6.75rem;
  font-size: 0.875rem;
  /* color: #ffffff; */
  color: rgba(255, 255, 255, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  background-size: 100% 100%;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  pointer-events: ${(props) => (props.disabled ? "none" : "auto")};
`;
