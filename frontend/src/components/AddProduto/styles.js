import styled from "styled-components";

const SubmitButton = styled.button`
  width: 100%;
  height: 50px;
  border-radius: 8px;
  font-family: Open Sans;
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 133.68%;
  margin-top: 30px;
  color: #38c1df;
  background: #ffffff;
  border: 2px solid #38c1df;

  &:hover {
    cursor: pointer;
    background-color: #38c1df;
    color: #ffffff;
    border: none;
    transition: 0.5s;
  }
`;

export { SubmitButton };
