import styled from "styled-components";

const Title = styled.h1`
  font-size: 36px;
  font-weight: 800;
  color: #2f2f2f;
  font-family: Open Sans;
`;

const Card = styled.div`
  width: 80%;
  margin: 10px;
  border: 1px solid #dbdbdb;
  border-radius: 13px;
  padding: 10px;
`;

const ProdutoTitle = styled.h1`
  font-family: Open Sans;
  font-style: normal;
  font-weight: 800;
  font-size: 36px;
  color: #3a3a3a;
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

const Total = styled.span`
  font-family: Open Sans;
  font-style: normal;
  font-weight: 900;
  font-size: 36px;
  letter-spacing: -0.04em;
  color: #2f2f2f;
`;

const DeleteButton = styled.button`
  height: 50px;
  border-radius: 8px;
  font-family: Open Sans;
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 24px;
  margin: 0px 10px;
  color: #d95b5b;
  background: #ffffff;
  border: 2px solid #d95b5b;

  &:hover {
    cursor: pointer;
    background-color: #d95b5b;
    color: #ffffff;
    transition: 0.5s;
  }
`;

const ClearCartButton = styled.button`
  height: 50px;
  width: 40%;
  border-radius: 8px;
  font-family: Open Sans;
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 24px;
  margin: 0px 10px;
  color: #d95b5b;
  background: #ffffff;
  border: 2px solid #d95b5b;

  &:hover {
    cursor: pointer;
    background-color: #d95b5b;
    color: #ffffff;
    transition: 0.5s;
  }
`;

const AddAoCarrinhoButton = styled.button`
width: 100%;
height: 50px;
border-radius: 8px;
font-family: Open Sans;
font-style: normal;
font-weight: 600;
font-size: 18px;
line-height: 133.68%;
margin: 0px 10px;
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

export {
  AddAoCarrinhoButton,
  ClearCartButton,
  Title,
  Card,
  ProdutoTitle,
  Info,
  DeleteButton,
  Value,
  Total,
};
