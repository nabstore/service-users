import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  max-width: 600px;
  border: 1px solid #dbdbdb;
  height: 753px;
  border-radius: 13px;
  padding: 50px;
`;

const Title = styled.h1`
  font-family: Open Sans;
  font-size: 48px;
  font-style: normal;
  font-weight: 600;
  line-height: 64px;
  letter-spacing: 0em;
  text-align: center;
  margin-bottom: 30px;
`;

const Input = styled.input`
  font-family: Open Sans;
  font-style: normal;
  font-size: 18px;
  border: 2px solid #b4b4b4;
  box-sizing: border-box;
  border-radius: 8px;
  height: 48px;
  margin: 10px 0 25px 0;
`;

const Label = styled.label`
  font-family: Open Sans;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: 24px;
  letter-spacing: 0em;
  text-align: left;
  margin-left: 10px;
`;

const Line = styled.hr`
  margin: 0 0 75px 0;
`;

const SignUpLink = styled(Link)`
  font-family: Open Sans;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: 24px;
  letter-spacing: 0em;
  text-align: center;
  color: #212223;
  width: 100%;
  text-align: center;
`;

export { Container, Title, Input, Label, Line, SignUpLink };
