import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import {
  Card,
  ProdutosContainer,
  NoProdutosText,
} from "./styles";
import api from "../../services/api";
import { NO_IMAGE_URL } from "../../utils/images";
import LoadingIcons from "react-loading-icons";
import AddProduto from "../AddProduto/AddProduto";
import { tipoUsuario } from "../../utils/tipoUsuarioEnum";
import { currencyFormat } from "../../utils/format";
import { routes } from "@nabstore/utils";
import Button from "../../components/Button";
import Typography from "../../components/Typografy";
import Anchor from "../../components/Anchor";

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
            <Anchor.Primary to={routes.PRODUTO.replace(":id", produto.id)}>
              Ver detalhes
            </Anchor.Primary>
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
          <Typography.Title className="float-start">Últimas Compras</Typography.Title>
          <Anchor.Primary className="ms-4" to={routes.COMRPAS}>
            Ver todas
          </Anchor.Primary>
        </div>
        <div className="d-flex flex-wrap mt-3 justify-content-start">
          {compras.slice(0, 4).map((compra) => (
            <Card style={{ width: "16rem" }} className="card" key={compra.id}>
              <div className="card-body">
                <h5 className="card-title">
                  Feita em {new Date(compra.createdAt).toLocaleDateString()}
                </h5>
                <h1 className="card-title">{currencyFormat(compra.total)}</h1>
                {dadosDaEntrega(compra)}
              </div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-center">
                  <Anchor.Primary to={routes.COMPRA.replace(":id", compra.id)}>
                    Ver detalhes
                  </Anchor.Primary>
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
        <Typography.Title className="float-start">Produtos</Typography.Title>
        {user.tipoUsuarioId === tipoUsuario.COLABORADOR ? (
          <div className="float-end">
            <Button.Primary onClick={() => setShowModal(true)}>
              <FontAwesomeIcon className="me-2" icon={faPlusCircle} />
              Novo Produto
            </Button.Primary>
          </div>
        ) : (
          <></>
        )}
      </div>

      <ProdutosContainer className="d-flex flex-wrap mt-3">
        <ProdutosList />
      </ProdutosContainer>

      <div className="mt-5 mb-5 d-flex flex-row justify-content-center align-items-center">
        <Button.Primary
          margin="0 25px"
          width="20%"
          onClick={handlePreviousPage}
          disabled={page <= 1}
        >
          Anterior
        </Button.Primary>
        {page}
        <Button.Primary
          margin="0 25px"
          width="20%"
          onClick={handleNextPage}
          disabled={produtos?.length < 10}
        >
          Próxima
        </Button.Primary>
      </div>
    </div>
  );
};

export default Produtos;
