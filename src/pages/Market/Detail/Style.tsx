import styled from "styled-components";
import Back from "@img/back.png";

export default styled.div`
  padding-bottom: 5.75rem;
  .title {
    margin-top: 2.5rem;
    margin-bottom: 2.5rem;
    display: flex;
    align-items: center;
    .back {
      width: 2rem;
      height: 2rem;
      background-image: url(${Back});
      background-size: 100% 100%;
      margin-right: 1rem;
      cursor: pointer;
    }
    .title-txt {
      height: 2rem;
      line-height: 2rem;
      font-size: 1.5rem;
      color: #ffffff;
      font-weight: bold;
    }
  }
  .content {
    display: grid;
    @media only screen and (max-width: 768px) {
      display: flex;
      flex-wrap: wrap;
    }
    grid-template-columns: 25fr 33fr;
    grid-column-gap: 2.5rem;
    grid-row-gap: 1.25rem;
    grid-template-areas:
      "a ."
      "a ."
      "a ."
      ". ."
      "g g"
      "h h";
    .img-right-title {
      font-size: 0.875rem;
      line-height: 1.75rem;
    }
    .img {
      grid-area: a;
      background: linear-gradient(180deg, #12090a, #281b18, #1b1110);
      border: 0.0625rem solid #574444;
      border-radius: 0.625rem;
      min-height: 31.25rem;
      @media only screen and (max-width: 768px) {
        width: 100%;
        min-height: 18.75rem;
      }
      > img {
        width: 90%;
        height: 90%;
        margin-left: 5%;
        margin-top: 5%;
        object-fit: contain;
        background-color: black;
      }
    }
    .metadata {
      grid-area: g;
    }
    .transaction {
      grid-area: h;
    }
  }
  .card {
    background: #110909;
    border: 0.0625rem solid #574444;
    border-radius: 0.625rem;
    @media only screen and (max-width: 768px) {
      width: 100%;
    }
    .card-title {
      height: 3.75rem;
      font-size: 1.125rem;
      line-height: 3.75rem;
      background: #190e0e;
      border: 0.0625rem solid #574444;
      border-radius: 0.625rem 0.625rem 0rem 0rem;
      padding-left: 1.25rem;
      color: #ffffff;
      font-weight: bold;
    }
    .card-body {
      padding: 1.25rem;
      .price {
        font-size: 1.5rem;
        line-height: 4rem;
        color: #ba0505;
        font-weight: bold;
      }
      .tip {
        line-height: 1.5rem;
        margin-top: 1.25rem;
      }
      .button {
        width: 10.5rem;
        margin-top: 2.8125rem;
        margin-bottom: 1.5625rem;
      }
      .price-info {
        padding-top: 0.75rem;
        padding-bottom: 0.75rem;
        display: flex;
        text-align: center;
        font-size: 0.875rem;
        line-height: 1.5rem;
        .price-info-value {
          color: #ffffff;
        }
      }
      .card-item {
        display: flex;
        justify-content: space-between;
        .item-label {
          line-height: 2.25rem;
        }
        .item-value {
          line-height: 2.25rem;
        }
      }
      .metadata {
        font-size: 0.875rem;
        line-height: 2.25rem;
      }
      .tran-title {
        color: #ffffff;
        line-height: 2.25rem;
      }
      .tran-body {
        line-height: 2.25rem;
        .ant-col {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
  }
`;
