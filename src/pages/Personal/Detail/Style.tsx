import styled from "styled-components";
import Back from "@img/back.png";

export default styled.div`
  padding-bottom: 6.25rem;
  .title {
    margin-top: 2.5rem;
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
  .detail-content {
    margin-top: 2.5rem;
    display: grid;
    grid-column-gap: 2.5rem;
    grid-row-gap: 1.25rem;
    grid-template-columns: 25fr 33fr;
    grid-template-areas:
      "a ."
      "a ."
      "a ."
      "a b"
      ". b";
    @media only screen and (max-width: 768px) {
      display: flex;
      flex-wrap: wrap;
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
        background-color: black;
      }
    }
    .img-right-title {
      font-size: 0.875rem;
      line-height: 1.75rem;
    }
    .button {
      width: 10.5rem;
    }
    .metadata {
      grid-area: b;
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
      .card-item {
        display: flex;
        justify-content: space-between;
        .item-label {
          line-height: 2.25rem;
        }
        .item-value {
          line-height: 2.25rem;
          color: rgba(255, 255, 255, 0.5);
        }
      }
    }
  }
`;
