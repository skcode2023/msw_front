import styled from "styled-components";

export default styled.div`
  height: 2.5rem;
  > div {
    margin-right: 2.5rem;
  }
  @media only screen and (max-width: 768px) {
    height: unset;
    width: 100vw;
    padding: 0 20px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-row-gap: 10px;
    grid-column-gap: 20px;
    > div {
      margin-right: 0;
      width: unset;
    }
  }
`;
