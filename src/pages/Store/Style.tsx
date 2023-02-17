import { Layout } from "antd";
import styled from "styled-components";
import StoreBG from "@img/store-bg.png";
import StoreTitle from "@img/store-title.png";
import StoreTitlePhone from "@img/phone/store-title-phone.png";
import StoreDivider from "@img/store-divider.png";
import StoreDividerPhone from "@img/phone/store-divider-phone.png";
import StoreGuildBG from "@img/store-guild-bg.png";
import StoreGuildIMG from "@img/store-guild-img.png";
import StoreBoxBG from "@img/store-box-bg.png";
import StoreBoxIMG from "@img/store-box-img.png";
import StoreItemBg from "@img/store-item-bg.png";

export default styled(Layout)`
  align-items: center;
  background-image: url(${StoreBG});
  background-size: cover;
  background-position: center;
  .title {
    width: 29.25rem;
    height: 6.9375rem;
    margin-top: 11.125rem;
    background-image: url(${StoreTitle});
    background-size: 100% 100%;
    @media only screen and (max-width: 768px) {
      width: 19.5rem;
      height: 4.5625rem;
      background-image: url(${StoreTitlePhone});
      margin-top: 6.875rem;
    }
  }
  .description {
    font-size: 0.875rem;
    line-height: 1.5rem;
    text-align: center;
    color: #ffffff;
    margin-top: 1.6875rem;
    opacity: 0.6;
  }
  .divider {
    width: 56.375rem;
    height: 1.8125rem;
    background-image: url(${StoreDivider});
    background-size: 100% 100%;
    margin-top: 1.5rem;
    max-width: 100%;
    @media only screen and (max-width: 768px) {
      width: 22.3125rem;
      height: 1.4375rem;
      background-image: url(${StoreDividerPhone});
    }
  }
  .content {
    margin: 8rem 0 5.6875rem 0;
    display: flex;
    justify-content: center;
    @media only screen and (max-width: 768px) {
      flex-wrap: wrap;
    }
    .item {
      width: 20rem;
      /* background: linear-gradient(0deg, #12090a, #281b18, #1b1110); */
      background-image: url(${StoreItemBg});
      background-size: 100% 100%;
      background-repeat: no-repeat;
      border-radius: 0.625rem;
      /* border: 0.0625rem solid #574444; */
      margin: 0 5.25rem;
      position: relative;
      @media only screen and (max-width: 768px) {
        margin: 0;
      }
      &:last-child {
        @media only screen and (max-width: 768px) {
          margin-top: 7.5rem;
        }
      }
      .item-bg {
        width: 22.375rem;
        height: 13.375rem;
        background-size: 100% 100%;
        position: absolute;
        top: -4rem;
        left: -1.1875rem;
        &.guild {
          background-image: url(${StoreGuildBG});
        }
        &.box {
          background-image: url(${StoreBoxBG});
        }
      }
      .item-img {
        width: 13.875rem;
        height: 16.5rem;
        background-size: 100% 100%;
        position: absolute;
        top: -5.875rem;
        left: 3.875rem;
        &.guild {
          background-image: url(${StoreGuildIMG});
        }
        &.box {
          background-image: url(${StoreBoxIMG});
        }
      }
      .item-content {
        margin-top: 11rem;
        padding: 0 1.25rem;
        margin-bottom: 10rem;
        .item-content-title {
          font-size: 1.5rem;
          line-height: 1.5;
          font-weight: bold;
          color: #ffffff;
        }
        .item-content-description {
          margin-top: 1em;
          font-size: 0.875rem;
          line-height: 1.375rem;
        }
        .item-content-remain {
          margin-top: 1em;
          line-height: 1.5rem;
          .item-content-remain-number {
            margin-left: 0.6875rem;
            color: #ffffff;
          }
        }
      }
      .item-footer {
        height: 8.0625rem;
        background-color: black;
        border-radius: 0.625rem;
        position: absolute;
        left: 0.75rem;
        right: 0.75rem;
        bottom: 0.75rem;
        padding: 1rem 1.25rem 1.25rem 1.25rem;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        .price {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          .price-label {
            font-size: 0.75rem;
            color: #ffffff;
          }
          .price-value {
            font-size: 1.125rem;
            color: #f7dd74;
            font-weight: bold;
          }
        }
        .button {
          width: 10.5rem;
        }
      }
    }
  }
`;

export const ModalBody = styled.div`
  .title {
    font-size: 1.5rem;
    color: #ffffff;
    font-weight: bold;
    margin: 0 1.25rem;
    padding-bottom: 1.125rem;
    text-align: center;
    border-bottom: 0.0625rem solid #362828;
  }
  .amount {
    margin-top: 1.5625rem;
    margin-left: 1.25rem;
    font-size: 0.875rem;
    line-height: 1.5;
  }
  .store-modal-input {
    padding: 1.25rem 1.25rem 2.25rem 1.25rem;
    .ant-input-number {
      width: 100%;
      color: #140d0c;
    }
    input {
      text-align: left;
    }
  }
  .price {
    height: 4rem;
    background: linear-gradient(
      180deg,
      rgba(3, 3, 3, 0.41),
      rgba(45, 37, 32, 0.48),
      rgba(177, 164, 155, 0.12)
    );
    text-align: center;
    color: #ffffff;
    display: flex;
    justify-content: center;
    align-items: center;
    .price-label {
      margin-right: 0.625rem;
    }
    .price-value {
      color: #f7dd74;
      font-weight: bold;
      font-size: 1.125rem;
    }
  }
  .tips {
    text-align: center;
    margin-top: 0.9375rem;
    font-size: 0.875rem;
  }
  .button {
    width: 10.5rem;
    margin: 1.875rem 0 0 0;
    margin-left: 50%;
    transform: translateX(-50%);
  }
`;
