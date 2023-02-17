import { Layout } from "antd";
import styled from "styled-components";
import TabOn from "@img/tab_on.png";
import TabOff from "@img/tab_off.png";
import OnSellOn from "@img/on_sell_on.png";
import OnSellOff from "@img/on_sell_off.png";
import MySellOn from "@img/my_sell_on.png";
import MySellOff from "@img/my_sell_off.png";
import MyNftOn from "@img/my_nft_on.png";
import MyNftOff from "@img/my_nft_off.png";
import StoreBg from "@img/store-bg.png";

export default styled(Layout)<{ nftid: string }>`
  align-items: center;
  padding-top: 8.8125rem;
  background-image: url(${StoreBg});
  background-size: auto 66.5rem;
  background-position: center bottom;
  background-repeat: no-repeat;
  min-height: 100vh;
  @media only screen and (max-width: 768px) {
    padding-top: 6.25rem;
  }
  .banner {
    width: 100%;
    display: ${(props) => (props.nftid ? "none" : "flex")};
    flex-direction: column;
    align-items: center;
    .select-content {
      @media only screen and (max-width: 768px) {
        width: 18.25rem;
        height: 3.25rem;
        img {
          margin-right: 0.625rem;
        }
        .select-icon {
          margin-right: 2.25rem;
        }
      }
    }
    .select-options {
      @media only screen and (max-width: 768px) {
        width: 17rem;
        .select-option {
          line-height: 3rem;
        }
      }
    }
    .tabs {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 0.75rem;
      margin-bottom: 2.375rem;
      .tabs-item {
        background-size: 100% 100%;
        margin: 0rem 1.25rem;
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #ffffff;
        .on-sell-icon {
          width: 1rem;
          height: 1.25rem;
          background-size: 100% 100%;
          background-image: url(${OnSellOff});
          margin-right: 0.9375rem;
        }
        .my-sell-icon {
          width: 1.125rem;
          height: 1.125rem;
          background-size: 100% 100%;
          background-image: url(${MySellOff});
          margin-right: 0.8125rem;
        }
        .my-nft-icon {
          width: 0.875rem;
          height: 1.25rem;
          background-size: 100% 100%;
          background-image: url(${MyNftOff});
          margin-right: 1rem;
        }
        &.on {
          width: 10.6875rem;
          height: 2.6875rem;
          background-image: url(${TabOn});
          .on-sell-icon {
            background-image: url(${OnSellOn});
          }
          .my-sell-icon {
            background-image: url(${MySellOn});
          }
          .my-nft-icon {
            background-image: url(${MyNftOn});
          }
        }
        &.off {
          width: 10.5rem;
          height: 2.5rem;
          background-image: url(${TabOff});
          color: rgba(255, 255, 255, 0.5);
        }
      }
    }
  }
  .content {
    width: var(--content-width);
    padding: 0 0 3rem 0;
    display: ${(props) => (props.nftid ? "none" : "block")};
    .tips {
      margin: 2.5rem 0;
      text-align: center;
      @media only screen and (max-width: 768px) {
        margin: 1.25rem 0;
      }
      .phoneTxt {
        @media only screen and (max-width: 768px) {
          margin-top: 2rem;
        }
      }
      .txt {
        line-height: 1.5rem;
        color: rgba(255, 255, 255, 0.6);
        @media only screen and (max-width: 768px) {
          padding: 0 0.4375rem;
          text-align: center;
        }
      }
    }
  }
  .detail {
    width: var(--content-width);
  }
`;

export const ModalBody = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 2.5rem;
  @media only screen and (max-width: 768px) {
    flex-wrap: wrap;
    padding: 0 1.25rem;
  }
  .sale-left {
    margin-right: 2.5rem;
    @media only screen and (max-width: 768px) {
      margin-right: 0;
    }
    .sale-left-img {
      @media only screen and (max-width: 768px) {
        width: 100%;
        height: 13.125rem;
      }
      width: 17.5rem;
      height: 17.5rem;
      border-radius: 0.625rem;
      border: 1px solid #574444;
      > img {
        width: 100%;
        height: 100%;
        border-radius: 0.625rem;
        background-color: black;
      }
    }
    .sale-left-id {
      text-align: center;
      color: #ffffff;
      font-size: 0.625rem;
      margin-top: 0.875rem;
    }
  }
  .sale-right {
    @media only screen and (max-width: 768px) {
      width: 100%;
    }
    width: 23.75rem;
    .sale-right-title {
      font-size: 1.5rem;
      line-height: 1.5rem;
      padding-bottom: 1.5rem;
      border-bottom: 1px solid #362828;
      text-align: center;
      color: #ffffff;
    }
    .sale-right-body-title {
      color: #ffffff;
      margin-top: 2.0625rem;
      font-size: 0.875rem;
    }
    .sale-right-body {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 0.8125rem;
      margin-bottom: 1.5rem;
      .sale-right-body-select {
        width: 7.625rem;
        &.mySelect .select-content {
          @media only screen and (max-width: 768px) {
            height: 2.375rem;
          }
        }
        &.mySelect .select-options {
          width: 7.1875rem;
        }
      }
      .sale-right-body-input {
        flex-grow: 1;
        .ant-input-number {
          width: 100%;
          input {
            text-align: left;
          }
        }
      }
    }
    .sale-right-info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      line-height: 1.5rem;
      font-size: 0.875rem;
    }
    .sale-right-btn-wrap {
      margin-top: 2.5rem;
      text-align: center;
      .sale-right-btn {
        display: inline-block;
        width: 10.5rem;
      }
    }
  }
`;
