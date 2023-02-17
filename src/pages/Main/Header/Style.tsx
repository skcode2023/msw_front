import styled from "styled-components";
import Icon from "@img/home/title-icon.png";
import MenuLeftOff from "@img/menu-left-off.png";
import MenuLeftOn from "@img/menu-left-on.png";
import MenuRightOff from "@img/menu-right-off.png";
import MenuRightOn from "@img/menu-right-on.png";
import MenuMiddleOn from "@img/menu-middle-on.png";
import { Menu } from "antd";

export default styled.div`
  width: 86.9375rem;
  height: 6.5625rem;
  max-width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 2s ease-out;
  .left {
    width: 15.5rem;
    height: 6.25rem;
    margin-top: 0.3125rem;
    padding-top: 0.625rem;
    background-image: url(${MenuLeftOff});
    background-size: 100% 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    &:hover {
      background-image: url(${MenuLeftOn});
    }
    .icon {
      width: 3.3125rem;
      height: 1.75rem;
      margin-left: 3.3125rem;
      background-image: url(${Icon});
      background-size: 100% 100%;
    }
  }
  .middle {
  }
  .right {
    width: 16.4375rem;
    height: 6.4375rem;
    margin-bottom: 0.125rem;
    background-image: url(${MenuRightOff});
    background-size: 100% 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    &:hover {
      background-image: url(${MenuRightOn});
    }
  }
  .menu-txt {
    font-family: ArialMT;
    font-size: 0.875rem;
    line-height: 5.625rem;
    background: linear-gradient(
      0deg,
      #d6d6d6 0%,
      #4a4245 96.3623046875%,
      #838383 100%
    );
    -webkit-background-clip: text;
    color: transparent;
  }
  @media only screen and (max-width: 768px) {
    height: 3.25rem;
    padding: 0;
    width: 100%;
    .left {
      width: 7.5rem;
      height: 3.25rem;
      margin-top: 0;
      .icon {
        width: 3.125rem;
        height: 1.4375rem;
        margin-left: 2.5rem;
      }
    }
    .right {
      width: 8.75rem;
      height: 3.375rem;
      margin-bottom: 0.3125rem;
      > div {
        padding-right: 0.9375rem;
        padding-top: 0.375rem;
      }
      .login {
        margin-right: 0;
      }
      .txt-img {
        width: 1.25rem;
        height: 1.25rem;
      }
    }
    .middle {
      width: 7.1875rem;
      height: 2.75rem;
      margin-top: 0.125rem;
      line-height: 2.75rem;
      text-align: center;
      background-image: url(${MenuMiddleOn});
      background-size: 100% 100%;
      .menu {
        color: #8081a6;
        display: flex;
        justify-content: space-evenly;
        .icon {
          width: 12px;
          height: 8px;
        }
      }
    }
    .menu-txt {
      line-height: 2.75rem;
      font-size: 0.875rem;
    }
  }
`;

/**菜单下拉框 */
export const MenuBody = styled(Menu)`
  background-color: rgba(30, 17, 17, 0.8);
  text-align: center;
  border-right: none;
  .ant-dropdown-menu-item-active {
    background-color: #301c1c;
    color: white;
  }
  .ant-menu-item-selected {
    background-color: #301c1c !important;
    color: white;
  }
  .ant-dropdown-menu-title-content {
    font-family: ArialMT;
    font-size: 0.875rem;
    line-height: 1.875rem;
    background: linear-gradient(
      0deg,
      #d6d6d6 0%,
      #4a4245 96.3623046875%,
      #838383 100%
    );
    -webkit-background-clip: text;
    color: transparent;
  }
`;
