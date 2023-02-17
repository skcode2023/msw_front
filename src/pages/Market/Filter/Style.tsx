import styled from "styled-components";
import FilterIcon from "@img/filter-icon.png";
import FilterBg from "@img/filter-bg.png";
import TUT from "@img/icon-tut.jpg";
import BNB from "@img/icon-bnb.jpg";

export default styled.div`
  width: 20rem;
  height: 100%;
  background-image: url(${FilterBg});
  background-size: 100% 100%;
  padding: 2.5rem 1.25rem;
  overflow-y: scroll;
  @media only screen and (max-width: 768px) {
    padding: 0 0.625rem;
    background-image: none;
  }
  &::-webkit-scrollbar {
    display: none;
  }
  .title {
    margin-top: 1.875rem;
    margin-bottom: 1.5625rem;
    display: flex;
    align-items: center;
    @media only screen and (max-width: 768px) {
      margin-top: 0.9375rem;
    }
    .icon {
      width: 1.5rem;
      height: 1.375rem;
      margin-right: 0.5625rem;
      background-image: url(${FilterIcon});
      background-size: 100% 100%;
    }
    .txt {
      font-size: 1.5rem;
      color: #ffffff;
      font-weight: bold;
    }
  }
  .filter-item {
    border-top: 0.0625rem solid #362828;
    padding: 1.25rem 0.9375rem 1.25rem 0.9375rem;
    .filter-item-title {
      color: #ffffff;
      font-size: 1.125rem;
      font-weight: bold;
      line-height: 3rem;
    }
    .filter-item-select {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .filter-item-select-title {
        line-height: 3rem;
        .filter-item-select-icon {
          display: inline-block;
          width: 1.375rem;
          height: 1.375rem;
          margin-right: 0.6875rem;
          background-size: 100% 100%;
          vertical-align: middle;
          &.bnb {
            background-image: url(${BNB});
          }
          &.tut {
            background-image: url(${TUT});
          }
        }
      }
    }
  }
  .filter-item-no-divider {
    padding-bottom: 1.875rem;
    .filter-item-distance {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.875rem;
      .filter-item-distance-number {
        max-width: 45%;
        width: 7rem;
        .ant-input-number {
          width: 100%;
        }
        > div {
          padding: 0;
        }
      }
    }
  }
`;
