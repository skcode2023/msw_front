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
    .select-nft,.unselect-nft{
      cursor: ${(props) => (props.onClick ? "pointer" : "default")};
      &:hover {
        filter: drop-shadow(0rem 0rem 0.3125rem #574444);
      }
      background-image: url(${CardBg});
      background-size: 100% 100%;
      padding:0.5rem;
    }
  .select-nft{
      filter: drop-shadow(0rem 0rem 0.3225rem #fff);
  }
  .card-img {
    text-align: center;
    width: 13.6875rem;
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
  .card-action {
      padding: 0.3125rem 0.625rem 0.625rem;
      text-align: center;
  }
  .card-action .card-action-button-top {
      height: 1rem;
  }

  .card-button {
      display: inline-block;
      width: 10.5rem;
      background:none;
      border:none;
  }
  .card-button-text {
      margin-left: 1rem;
  }

  .ant-checkbox {
      -webkit-font-feature-settings: "tnum","tnum";
      font-feature-settings: "tnum","tnum";
      box-sizing: border-box;
      color: hsla(0,0%,100%,.5);
      cursor: pointer;
      font-size: 16px;
      font-variant: tabular-nums;
      line-height: 1.5715;
      line-height: 1;
      list-style: none;
      margin: 0;
      outline: none;
      padding: 0;
      position: relative;
      top: .2em;
      white-space: nowrap;
  }
  .ant-checkbox-wrapper {
      -webkit-font-feature-settings: "tnum","tnum";
      font-feature-settings: "tnum","tnum";
      align-items: baseline;
      box-sizing: border-box;
      color: hsla(0,0%,100%,.5);
      cursor: pointer;
      display: inline-flex;
      font-size: 16px;
      font-variant: tabular-nums;
      line-height: 1.5715;
      line-height: inherit;
      list-style: none;
      margin: 0;
      padding: 0;
  }
  .ant-checkbox-inner {
      background-color: #1e1111;
      border: 0 solid #d9d9d9;
      border-collapse: initial;
      border-radius: 2px;
      direction: ltr;
      display: block;
      height: 20px;
      left: 0;
      position: relative;
      top: 0;
      transition: all .3s;
      width: 20px;
      border: 1px solid rgba(104, 82, 82, 0.71);
      background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAArlJREFUSEvtlc1PE1EUxc989c33TGk7LSxwQVgpC0JiQjea6Ao3fOxM3Gii8hcBJrBAiBhjiwt0QUwwBgiJkBh0QZAFtRS0sYJEO9OWjnmvFRZO66LBxMSXzPKd37x7zz2Xwzkfjurf7euT+M7OW+C4awDsFpmH8P2X1Uzm4YP19TID3B8aur2by42+39npKZfLpBWAJEnexa6uzQsdHWPj6fRUDTA8PLu4vDziVk8IUWSoqgpNVSDLMmRCIEkSRFGEwPPgOHYl8Pi+j+Nvx9jZ2vauJ5OpiXT65i/AwtLKygCnKdB1DbZtwbYsmIYOTdWgyAShUIhBmgFOTqqo+lU8mXmMq8nk8/FU6sYp4NXq6oCgq+hIxJGIO3BiUbSFwzAtE5qqMgh9Cc/zDV/wo+gi8zGL6clpXOnvDwAY2hkgGjkF6Jp6Wqr/gH+9ROftIp4BHCQcBzFmUxuWaUKjLpJlSKLY1KbFoovdbBYzUzPBNqWD1h6PIR5zEGU2tWEaBnSd2lSGKIngm0xy0XWRyeYwN/0oGOArBAknBicaRSQSRti2YRhGPTZIfZJpXPw+a74PuK6LbG4fqbmnwYAKkeBEIohG29jf26YJXTegqgpIKARJEsE1mWTPdbG3/wkvni0EAzyBR6QtjAgVt0wYpgGdxoSi1LNIAM81jgq35OHgcx6vF5eCAd9RRdiyYJlGrfaaCoWmKktUGnYU0DhNvVIZ+S8FvF17Eww4KpdgGDoTpgGnKgqITECYuAhBqMd1gyaUKxV8PTzC7taHYEDBKzIhGs21mkvMmmfizfcB4LPuF/YOfgPMrm1sjOwVCsQ9qTCv0+UiCAJrKi0L3QO1j0oElakmrhIZGsd7l3t7zxbOvcHBO/v5/Ojm9vYlr1RqaWWSUMjr6e5+1x6LjU3Mz0/+naXfypL/092fUqF3KLjklZoAAAAASUVORK5CYII=);
      background-size: 100% 100%;
  }
  .ant-checkbox-input {
      bottom: 0;
      cursor: pointer;
      height: 100%;
      left: 0;
      opacity: 0;
      position: absolute;
      right: 0;
      top: 0;
      width: 100%;
      z-index: 1;
  }
  .ant-checkbox-checked .ant-checkbox-inner::after {
      opacity:0
    }
  .ant-checkbox.ant-checkbox-checked .ant-checkbox-inner {
      border: 1px solid rgba(104, 82, 82, 0.71);
      background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAhZJREFUSEvtlU1PE1EUhp+C1wEVP/BbdLpkw6z4Ce5GFlB2Jm40UflFgIluDNtbzIhGI/oLGmPGFRq1NcaFG2Pix3C1NS/ea8iEthrEhfEmJ23nZs5zzuk576mww6ci/5cnJ81AHF+gUjkLHNwm8z2dzmq71bp5rdFwG4CrMzMXm83m3FqeJ8a5aC+wD9gDDAERsMtbP3jbmMIkSW6q1fmFev3GD0CttnQvy2Y7zkVyKucygYaB3d4GAFm30/YXw8YU61NTdrFePx8AKw+tTeXwAHDEm2o14kHKwgAbL3Q53wBBOsCTWu3OgrXnfgIeWZvuB6pADJwCjgGjgJ4rM2XSK4OPwBrwBWhsBVD0Apz5D/h3S7SjXaQ5UBepRf9EFz0ut+mqtamGSm16GjgJHAUO/eYcPPdzkJcBDzxAzseA436aBQi69CuD9sIDnpUB971UyPmJTVMsuRBAotcP8Al4BRTAmzLgrrWp5CA4P+zLE7RIAGlRL6n4DLwG1oEPZcBta1Mpp4RO+hNqr+j1PEh2L4A06C3gFEgZcMvaVCUIjhV5cB6iH+yTgSJ/B3xVg5QB1to0RBmWjH4LGpZNiH4ryZZE6+hO/8F4CbCUZdls4VwkTVekwcKS0WevXRCcK+sRY4qJzQvnyvT0pZet1lwjzyecc5EchXLoe9m6LRxlMSTnSfJ0LI7nF5eXr/+dpd9vkW/n/jsqXRAoaJkHeQAAAABJRU5ErkJggg==);
      background-size: 100% 100%;
  }
`;

export const Tem = styled.i`
  width: 17.5rem;
`;
