import { Layout } from "antd";
import styled, { css } from "styled-components";
import MarketBanner from "@img/market-banner.png";
import MarketTitle from "@img/market-title.png";
import MarketTitlePhone from "@img/market-title-phone.png";
import StoreBg from "@img/store-bg.png";
import FilterPhone from "@img/phone/filters-phone-main.png";
import FilterIcon from "@img/filter-icon.png";

export default styled(Layout)<{ nftid?: string }>`
  ${(props) => {
    if (props.nftid) {
      return css`
        background-image: url(${StoreBg});
        background-size: auto 66.5rem;
        background-position: center bottom;
      `;
    } else {
      return css`
        background-image: url(${MarketBanner});
        background-size: auto 39.1875rem;
        background-position: center top;
      `;
    }
  }}
  background-repeat: no-repeat;
  align-items: center;
  font-size: 0.875rem;
  min-height: 100vh;
  .market-title {
    display: inline-block;
    width: 46.3125rem;
    height: 5.75rem;
    background-image: url(${MarketTitle});
    background-size: 100% 100%;
    margin-top: 12.125rem;
    display: ${(props) => (props.nftid ? "none" : "block")};
    @media only screen and (max-width: 768px) {
      width: 18.3125rem;
      height: 2.25rem;
      background-image: url(${MarketTitlePhone});
      margin-top: 6.875rem;
    }
  }
  .market-tips {
    font-size: 1.125rem;
    font-weight: bold;
    color: rgba(255, 255, 255, 0.5);
    margin: 1.625rem 0 3.3125rem 0;
    @media only screen and (max-width: 768px) {
      margin: 1.25rem 0;
    }
  }
  .market-content {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: flex-start;
    @media only screen and (max-width: 768px) {
      display: block;
      margin-top: 0rem;
    }
    .filters-phone {
      width: 100%;
      padding: 0 1.25rem;
      display: flex;
      justify-content: center;
      align-items: center;
      .filters-phone-main {
        /* width: 17.5rem; */
        width: 100%;
        height: 3.125rem;
        line-height: 2.5rem;
        background-image: url(${FilterPhone});
        background-size: 100% 100%;
        background-repeat: no-repeat;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 0.875rem;
        font-family: Arial;
        color: #140d0c;
        font-weight: 400;
        position: relative;
        .icon1 {
          width: 1rem;
          height: 0.875rem;
          margin-right: 0.5625rem;
          background-image: url(${FilterIcon});
          background-size: 100% 100%;
        }
        .down {
          width: 0.8125rem;
          height: 0.5rem;
          position: absolute;
          right: 1.6875rem;
          top: 50%;
          margin-top: -0.25rem;
        }
      }
    }
    .right {
      flex-grow: 1;
      margin: 0.8125rem 0rem 4.125rem 0.9375rem;
      width: var(--content-width);
      @media only screen and (max-width: 768px) {
        width: 100%;
        margin: 0.8125rem 0rem 4.125rem 0rem;
      }
      .right-top {
        display: flex;
        justify-content: space-between;
        .tags {
          height: 2.5rem;
        }
        .sort {
          float: right;
          @media only screen and (max-width: 768px) {
            width: 100%;
            padding: 0 1.5625rem;
          }
        }
        @media only screen and (max-width: 768px) {
          width: 100%;
          flex-direction: column;
          .tags {
            height: unset;
            margin-bottom: 0.625rem;
          }
        }
      }
      .content {
        padding-top: 2.1875rem;
      }
    }
  }
  .detail {
    width: var(--content-width);
    padding-top: 8.75rem;
    @media only screen and (max-width: 768px) {
      padding-top: 6.25rem;
    }
  }
`;
