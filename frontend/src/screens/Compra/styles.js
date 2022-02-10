import styled from "styled-components";

const Title = styled.h1`
  font-size: 36px;
  font-weight: 800;
  color: #2f2f2f;
  font-family: Open Sans;
`;

const Card = styled.div`
  width: 100%;
  margin: 10px;
  border: 1px solid #dbdbdb;
  border-radius: 13px;
  padding: 25px;
`;

const Info = styled.h2`
  font-family: Open Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 24px;
  letter-spacing: -0.04em;
  color: #7e7e7e;
`;

const Value = styled.span`
  font-family: Open Sans;
  font-style: normal;
  font-weight: 900;
  font-size: 24px;
  letter-spacing: -0.04em;
  color: #2f2f2f;
`;

export {
    Card,
    Info,
    Value,
    Title
};
