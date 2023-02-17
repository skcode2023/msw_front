import styled from "styled-components";

export default styled.div`
  height: 2.5rem;
  svg {
    height: 1.125rem;
  }
  .pagination-button {
    display: inline-block;
    width: 6.75rem;
    margin: 0 1.25rem;
  }
  .pagination-input {
    display: inline-block;
    width: 10.5rem;
  }
  .pagination-total {
    margin-left: 1.25rem;
    @media only screen and (max-width: 768px) {
      margin-left: 0rem;
    }
  }
`;
