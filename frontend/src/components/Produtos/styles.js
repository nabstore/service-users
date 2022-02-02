import { Link } from "react-router-dom";
import styled from "styled-components";

const Card = styled.div`
  width: 18rem;
  margin: 10px;
  border: 1px solid #dbdbdb;
  border-radius: 13px;
  padding: 10px;
`;

const ViewDetailsLink = styled(Link)`
  color: #2b9bb4;
  font-family: Open Sans;
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 33px;
`;

const Title = styled.h1`
  font-size: 36px;
  font-weight: 800;
  color: #2f2f2f;
  font-family: Open Sans;
`;

const NoProdutosText = styled.h1`
  font-size: 24px;
  font-weight: 800;
  color: #2f2f2f;
  font-family: Open Sans;
  margin-top: 50px;
`;

const ProdutosContainer = styled.div`
  justify-content: space-around;
`;

const ChangePageButton = styled.button`
  width: 20%;
  height: 50px;
  border-radius: 8px;
  font-family: Open Sans;
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 133.68%;
  margin: 50px;
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

const AddProdutoButton = styled.button`
  height: 50px;
  width: 100%;
  border-radius: 8px;
  font-family: Open Sans;
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  margin: 0px 10px 10px 10px;
  color: #ffffff;
  background: #38c1df;
  border: none;
  opacity: 1;

  &:hover {
    cursor: pointer;
    opacity: 1;
    transition: 0.2s;
    box-shadow: 0 0 1em gray;
  }
`;

export {
  AddProdutoButton,
  Card,
  ViewDetailsLink,
  Title,
  ProdutosContainer,
  ChangePageButton,
  NoProdutosText,
};
