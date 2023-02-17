import styled from "styled-components";
import TagBg from "@img/tag-bg.png";
import WhiteBg from "@img/select-white.png";

export default styled.div<{ isOn: boolean; theme?: "white" }>`
  height: 2.5rem;
  line-height: 2.5rem;
  color: rgba(255, 255, 255, 0.5);
  display: flex;
  justify-content: center;
  position: relative;
  /* @media only screen and (max-width: 768px) {
    height: 3.25rem;
  } */
  .select-content {
    width: 9.6875rem;
    height: 2.5rem;
    background-image: url(${(props) =>
      props.theme === "white" ? WhiteBg : TagBg});
    background-size: 100% 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    .select-value {
      width: 100%;
      color: ${(props) => (props.theme === "white" ? "#13090A" : "#fff")};
      text-align: center;
    }
    .select-icon {
      margin-right: 1.3125rem;
      width: 0.75rem;
      opacity: ${(props) => (props.isOn ? 1 : 0.6)};
      > svg {
        vertical-align: middle;
      }
    }
  }
  .select-options {
    position: absolute;
    top: 2.5rem;
    right: 0.3125rem;
    @media only screen and (max-width: 768px) {
      right: 0.7125rem;
      top: 3rem;
    }
    width: 8.75rem;
    background-color: rgba(30, 17, 17, 0.8);
    transform-origin: top;
    transform: ${(props) => (props.isOn ? "scaleY(1)" : "scaleY(0)")};
    transition: transform 0.3s ease-out;
    z-index: 10;
    .select-option {
      text-align: center;
      cursor: pointer;
      &:hover {
        background-color: #301c1c;
        color: white;
      }
    }
  }
`;
