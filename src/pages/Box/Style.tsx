import { Layout } from "antd";
import styled from "styled-components";
import BoxBG from "@img/box-bg.png";

export default styled(Layout)`
  justify-content: center;
  align-items: center;
  position: relative;
  padding-top: 6.25rem;
  @media only screen and (max-width: 768px) {
    overflow-x: hidden;
  }
  .back {
    height: 61.875rem;
    background-image: url(${BoxBG});
    background-size: auto 100%;
    background-position: center;
    > video {
      height: 61.875rem;
    }
  }
  > img {
    position: absolute;
    top: 20rem;
    height: 16rem;
    @media only screen and (max-width: 768px) {
      height: unset;
      width: 90%;
      top: 24rem;
    }
  }
  .tips {
    position: absolute;
    top: 45.5rem;
    font-size: 0.875rem;
    line-height: 1.5rem;
    color: #ffffff;
    display: flex;
    justify-content: center;
    .label {
      opacity: 0.5;
    }
    .value {
      margin-left: 0.375rem;
    }
  }
  .button {
    position: absolute;
    top: 48.8125rem;
    width: 10.5rem;
  }
`;

export const ModalBody = styled.div`
  text-align: center;
  padding: 0.125rem 0 0.5625rem 0;
  .tip {
    padding: 1rem 0 1.875rem 0;
    font-size: 0.875rem;
    line-height: 1.5rem;
    color: #ffffff;
  }
  .button {
    display: inline-block;
    width: 10.5rem;
    > div {
      margin-top: 0.625rem;
    }
  }
`;
