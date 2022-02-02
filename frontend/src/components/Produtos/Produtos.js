import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle, faSearch } from "@fortawesome/free-solid-svg-icons";
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

const Produtos = () => {
  const [produtos, setProdutos] = useState(null);
  const [searchString, setSearchString] = useState("");
  const [searchResult, setSearchResult] = useState([]);
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
    if (produtos) {
      setSearchResult(
        produtos.filter((p) =>
          p.nome?.toLowerCase().includes(searchString.toLowerCase())
        )
      );
    }
  }, [searchString, produtos]);

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

    if (
      produtos.length === 0 ||
      (searchString !== "" && searchResult.length === 0)
    ) {
      return <NoProdutosText>Nenhum produto listado.</NoProdutosText>;
    }

    if (searchString === "") {
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
    }

    return searchResult.map((produto) => (
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

  return (
    <>
      <AddProduto
        handleClose={() => setShowModal(false)}
        showModal={showModal}
      />

      <div>
        <Title className="float-start">Produtos</Title>
        {user.tipoUsuario === "colaborador" ? (
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

      <div className="input-group mb-3">
        <span className="input-group-text" id="basic-addon1">
          <FontAwesomeIcon icon={faSearch} />
        </span>
        <input
          type="text"
          className="form-control"
          placeholder="Buscar produto"
          aria-label="Buscar produto"
          aria-describedby="basic-addon1"
          value={searchString}
          onChange={(e) => setSearchString(e.target.value)}
        />
      </div>

      <ProdutosContainer className="d-flex flex-wrap">
        <ProdutosList />
      </ProdutosContainer>

      {searchString === "" ? (
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
      ) : (
        <></>
      )}
    </>
  );
};

export default Produtos;
