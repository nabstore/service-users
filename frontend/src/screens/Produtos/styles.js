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

export {
  Card,
  ViewDetailsLink,
  ProdutosContainer,
  NoProdutosText,
};
