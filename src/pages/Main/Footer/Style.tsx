import styled from "styled-components";

export default styled.div`
  border-top: 0.0625rem solid #362828;
  .main {
    max-width: 75rem;
    margin: 0 auto;
    padding: 1.25rem 0 2.5rem 0;
    .icon {
      cursor: pointer;
      text-align: center;
      @media only screen and (max-width: 768px) {
        margin-bottom: 1.25rem;
      }
    }
    .title {
      font-size: 1.125rem;
      font-weight: bold;
      color: #d6d6d6;
      margin-bottom: 1.25rem;
      @media only screen and (max-width: 768px) {
        margin-left: 5rem;
        &.sec {
          margin-top: 1.25rem;
        }
      }
    }
    .link {
      @media only screen and (max-width: 768px) {
        margin-top: 1.875rem;
      }
    }
    .content {
      font-size: 0.875rem;
      color: rgba(255, 255, 255, 0.5);
      margin-top: 0.625rem;
      cursor: pointer;
      @media only screen and (max-width: 768px) {
        margin-left: 5rem;
      }
      &:hover {
        color: white;
      }
      img {
        width: 1.25rem;
        margin-right: 0.625rem;
      }
      a {
        color: rgba(255, 255, 255, 0.5);
        &:hover {
          color: white;
        }
      }
    }
  }
`;
