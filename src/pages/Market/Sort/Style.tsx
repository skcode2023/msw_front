import styled from "styled-components";

export default styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  @media only screen and (max-width: 768px) {
    width: 100%;
    justify-content: space-between;
  }
  .sort-title {
    color: rgba(255, 255, 255, 0.5);
    margin-right: 0.875rem;
    margin-left: 1.875rem;
  }
  .sort-img {
    width: 1.125rem;
    height: 0.75rem;
    margin-left: 0.375rem;
  }
`;
