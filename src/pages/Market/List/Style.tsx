import styled from "styled-components";

export default styled.div`
  .list {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin-bottom: 2.5rem;
    @media only screen and (max-width: 768px) {
      justify-content: center;
    }
    > div {
      margin-bottom: 2.5rem;
      @media only screen and (max-width: 768px) {
        margin-bottom: 1.25rem;
      }
    }
  }
  .paging {
    text-align: center;
  }
`;
