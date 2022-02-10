import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import {
  Card,
  ViewDetailsLink,
  Title,
  ProdutosContainer,
  ChangePageButton,
  AddProdutoButton,
  NoProdutosText,
} from "./styles";
import api from "../../services/api";
import { NO_IMAGE_URL } from "../../utils/images";
import LoadingIcons from "react-loading-icons";
import AddProduto from "../AddProduto/AddProduto";
import { tipoUsuario } from "../../utils/tipoUsuarioEnum";

const Produtos = () => {
  const [produtos, setProdutos] = useState(null);
  const [compras, setCompras] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [page, setPage] = useState(1);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    api
      .fetchProdutos()
      .then((resp) => setProdutos(resp))
      .catch((err) => console.error("Erro ao carregar produtos"));
  }, []);

  useEffect(() => {
    api
      .fetchCompras()
      .then((resp) => setCompras(resp))
      .catch((err) => console.error("Erro ao carregar compras"));
  }, []);

  const handleNextPage = () => {
    api
      .fetchProdutos(page + 1)
      .then((resp) => {
        setProdutos(resp);
        setPage(page + 1);
      })
      .catch((err) => console.error("Erro ao carregar produtos"));
  };

  const handlePreviousPage = () => {
    api
      .fetchProdutos(page - 1)
      .then((resp) => {
        setProdutos(resp);
        setPage(page - 1);
      })
      .catch((err) => console.error("Erro ao carregar produtos"));
  };

  const ProdutosList = () => {
    if (!produtos) {
      return <LoadingIcons.Oval className="mt-5" stroke="#2f2f2f" />;
    }

    if (produtos.length === 0) {
      return <NoProdutosText>Nenhum produto listado.</NoProdutosText>;
    }

    return produtos.map((produto) => (
      <Card className="card" key={produto.id}>
        <img
          src={api.getImageUrl(produto.id)}
          className="card-img-top"
          onError={(e) => (e.target.src = NO_IMAGE_URL)}
          alt={produto.nome}
        />
        <div className="card-body">
          <h5 className="card-title">{produto.nome}</h5>
          <p className="card-text">
            {produto.descricao?.length > 75
              ? `${produto.descricao.slice(0, 75)}...`
              : produto.descricao}
          </p>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item d-flex justify-content-center">
            <ViewDetailsLink to={`/produto/${produto.id}`}>
              Ver detalhes
            </ViewDetailsLink>
          </li>
        </ul>
      </Card>
    ));
  };

  const UltimasCompras = () => {
    if (!compras || compras.length === 0) {
      return <></>;
    }

    const dadosDaEntrega = (compra) => {
      if (compra.deliveredAt) {
        return `Entrega realizada em ${new Date(
          compra.deliveredAt
        ).toLocaleDateString()}.`;
      }

      return (
        <span style={{ color: "green", fontWeight: 500 }}>
          Chega dia{" "}
          {new Date(compra.estimatedDeliveryDate).toLocaleDateString()}.
        </span>
      );
    };

    return (
      <div className="d-flex flex-column justify-content-center mb-4">
        <div className="d-flex flex-row align-items-center">
          <Title className="float-start">Últimas Compras</Title>
          <ViewDetailsLink className="ms-4" to={`/compras`}>Ver todas</ViewDetailsLink>
        </div>
        <div className="d-flex flex-wrap mt-3 justify-content-center">
          {compras.slice(0, 4).map((compra) => (
            <Card style={{ width: "16rem" }} className="card" key={compra.id}>
              <div className="card-body">
                <h5 className="card-title">
                  Feita em {new Date(compra.createdAt).toLocaleDateString()}
                </h5>
                {dadosDaEntrega(compra)}
              </div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-center">
                  <ViewDetailsLink to={`/compras/${compra.id}`}>
                    Ver detalhes
                  </ViewDetailsLink>
                </li>
              </ul>
            </Card>
          ))}
        </div>
        <hr className="mt-4" />
      </div>
    );
  };

  return (
    <div className="d-flex flex-column justify-content-center">
      <AddProduto
        handleClose={() => setShowModal(false)}
        showModal={showModal}
      />

      <UltimasCompras />

      <div>
        <Title className="float-start">Produtos</Title>
        {user.tipoUsuarioId === tipoUsuario.COLABORADOR ? (
          <div className="float-end">
            <AddProdutoButton onClick={() => setShowModal(true)}>
              <FontAwesomeIcon className="me-2" icon={faPlusCircle} />
              Novo Produto
            </AddProdutoButton>
          </div>
        ) : (
          <></>
        )}
      </div>

      <ProdutosContainer className="d-flex flex-wrap mt-3">
        <ProdutosList />
      </ProdutosContainer>

      <div className="d-flex flex-row justify-content-center align-items-center">
        <ChangePageButton
          className="btn btn-primary"
          onClick={handlePreviousPage}
          disabled={page <= 1}
        >
          Anterior
        </ChangePageButton>
        {page}
        <ChangePageButton
          className="btn btn-primary"
          onClick={handleNextPage}
          disabled={produtos?.length < 10}
        >
          Próxima
        </ChangePageButton>
      </div>
    </div>
  );
};

export default Produtos;
