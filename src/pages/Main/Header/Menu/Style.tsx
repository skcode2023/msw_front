import styled from "styled-components";
import MenuMiddleOff from "@img/menu-middle-off.png";
import MenuMiddleOn from "@img/menu-middle-on.png";

export default styled.div`
  display: flex;
  .menu-item {
    width: 13.75rem;
    height: 5.25rem;
    margin-bottom: 0.3125rem;
    margin-top: 1rem;
    text-align: center;
    background-image: url(${MenuMiddleOff});
    background-size: 100% 100%;
    cursor: pointer;
    .menu-txt {
      display: flex;
      justify-content: center;
      align-items: center;
      .icon {
        display: inline-flex;
        width: 0.75rem;
        height: 0.5rem;
        margin-left: 0.75rem;
      }
    }
    &.on {
      background-image: url(${MenuMiddleOn});
      position: relative;
      .menu-txt {
        background: linear-gradient(0deg, #ffffff 0%, #d3d3d3 100%);
        -webkit-background-clip: text;
      }
    }
  }
`;
