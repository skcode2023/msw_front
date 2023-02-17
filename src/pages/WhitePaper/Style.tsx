import { Layout } from "antd";
import styled from "styled-components";

export default styled(Layout)`
  padding: 11.4375rem 0 3.75rem 0;
  margin: 0 auto;
  width: 75rem;
  color: white;
  .topic {
    font-size: 2rem;
  }
  .title {
    margin: 1.25rem 0 0.625rem 0;
    font-size: 1.5rem;
  }
  .tag {
    font-size: 1.125rem;
    margin: 0.625rem 0;
  }
  .red {
    color: red;
  }
  table {
    width: 60%;
    @media only screen and (max-width: 768px) {
      width: 100%;
    }
    tr > th {
      text-align: left;
    }
    th,
    td {
      padding: 0.3125rem;
    }
  }
`;
