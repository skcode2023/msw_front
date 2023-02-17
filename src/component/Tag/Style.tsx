import styled from "styled-components";
import TagBg from "@img/tag-bg.png";
import TagClose from "@img/tag-close.png";

export default styled.div`
  display: inline-flex;
  width: 10.5rem;
  height: 2.5rem;
  padding: 0rem 1.125rem;
  background-image: url(${TagBg});
  background-size: 100% 100%;
  align-items: center;
  .tag-content {
    flex-grow: 1;
    padding: 0 0.25rem;
    overflow-x: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .tag-close {
    width: 1.0625rem;
    height: 1.125rem;
    background-image: url(${TagClose});
    background-size: 100% 100%;
    cursor: pointer;
  }
`;
