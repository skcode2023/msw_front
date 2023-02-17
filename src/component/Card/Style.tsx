import styled from "styled-components";
import CardBg from "@img/card-bg.png";
import { MouseEventHandler } from "react";
import backB from "@img/nft-img-back-blue.png";
import backG from "@img/nft-img-back-green.png";

export default styled.div.attrs((props) => ({ key: props.id }))<{
  quality: "1" | "0";
  onClick: MouseEventHandler<HTMLDivElement> | undefined;
}>`
  width: 18.1875rem;
  padding: 0.8125rem;
  display: inline-block;
  background-image: url(${CardBg});
  background-size: 100% 100%;
  cursor: ${(props) => (props.onClick ? "pointer" : "default")};
  &:hover {
    filter: drop-shadow(0rem 0rem 0.3125rem #574444);
  }
  .card-img {
    text-align: center;
    width: 14.6875rem;
    height: 10.9375rem;
    margin: 0.875rem;
    background-image: url(${(props) =>
      props.quality === "1" ? backB : backG});
    background-size: 100% 100%;
    background-repeat: no-repeat;
    display: flex;
    justify-content: center;
    align-items: center;
    @media only screen and (max-width: 768px) {
      width: calc(100% - 1.75rem);
    }
    > img {
      width: 90%;
      height: 90%;
    }
  }
  .card-info {
    padding: 0.625rem;
    background: linear-gradient(
      180deg,
      rgba(3, 3, 3, 0.41),
      rgba(45, 37, 32, 0.48),
      rgba(177, 164, 155, 0.12)
    );
  }
  .card-action {
    padding: 0.3125rem 0.625rem 0.625rem 0.625rem;
    text-align: center;
    .card-action-button-top {
      height: 1rem;
    }
  }
  .card-id {
    font-size: 1.125rem;
    line-height: 1.3;
    font-weight: bold;
    padding-left: 0.5rem;
    margin-bottom: 0.625rem;
    border-left: 0.25rem solid #d40000;
    color: #ffffff;
  }
  .card-item {
    display: flex;
    justify-content: space-between;
    .card-item-label {
      font-size: 0.75rem;
      line-height: 1.5rem;
    }
    .card-item-value {
      font-size: 0.75rem;
      line-height: 1.5rem;
      color: #ffffff;
      &.price {
        font-size: 1.125rem;
        font-weight: bold;
        line-height: 1.5rem;
        color: #f7dd74;
      }
    }
  }
  .card-button {
    display: inline-block;
    width: 10.5rem;
  }
`;

export const Tem = styled.i`
  width: 17.5rem;
`;
