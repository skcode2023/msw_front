import { Layout } from "antd";
import styled from "styled-components";

export default styled(Layout)`
  width: 100%;
  min-height: 100%;
  position: relative;
  .head {
    display: flex;
    justify-content: center;
    position: absolute;
    top: 1.125rem;
    left: 50%;
    transform: translateX(-50%);
    z-index: 900;
  }
  .footer {
    background-color: black;
    color: white;
  }
`;
