import styled from "styled-components";

export default styled.div<{ backImg: string; type?: "number" }>`
  width: ${(props) => (props.type ? "" : "100%")};
  height: 36px;
  line-height: 36px;
  background-image: url(${(props) => props.backImg});
  background-size: 100% 100%;
  @media only screen and (min-width: 1440px) {
    padding: 0 1rem;
  }
  input {
    text-align: ${(props) => (props.type ? "center" : "")};
    color: #140d0c;
  }
`;
