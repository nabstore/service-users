import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faMinus,
  faArrowLeft,
  faTrash,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addProduto } from "../../redux/slicer/cartSlicer";
import api from "../../services/api";
import { NO_IMAGE_URL } from "../../utils/images";
import {
  GoBackLink,
  Card,
  EditButton,
  DeleteButton,
  AddToCartButton,
  Price,
  Estoque,
  Subtitle,
  AddItemButton,
  RemoveItemButton,
  Title,
  Details,
  DetailsTitle,
} from "./styles";
import { currencyFormat } from "../../utils/format";
import EditProduto from "../EditProduto/EditProduto";

const Produto = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, cart } = useSelector((state) => ({
    user: state.user,
    cart: state.cart,
  }));
  const [qtd, setQtd] = useState(1);
  const [produto, setProduto] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleDelete = () => {
    if (window.confirm("Deseja deletar o produto?")) {
      api
        .deleteProduto(id)
        .then((produto) => {
          navigate("/");
        })
        .catch((error) => console.error("Erro ao deletar produto."));
    }
  };

  const handleAddToCart = () => {
    dispatch(
      addProduto({
        id: produto.id,
        precoUnit: produto.preco,
        qtd,
        nome: produto.nome,
      })
    );
    alert("Produto adicionado ao carrinho");
    navigate("/");
  };

  useEffect(() => {
    api
      .fetchProdutoById(id)
      .then((produto) => {
        setProduto(produto);
        const prod = cart.produtos.find((prod) => prod.id === produto.id);
        if (prod) {
          setQtd(prod.qtd);
        }
      })
      .catch((error) => console.error("Erro ao carregar produto."));
  }, [id, cart]);

  if (!produto) {
    return <div>Carregando dados do produto...</div>;
  }

  return (
    <div className="row align-items-center">
      <EditProduto
        handleClose={() => setShowModal(false)}
        showModal={showModal}
      />
      <div className="col">
        <div className="float-start">
          <GoBackLink to="/">
            <FontAwesomeIcon icon={faArrowLeft} /> Voltar aos produtos
          </GoBackLink>
        </div>
      </div>

      <div className="row align-items-center mt-3 mb-5">
        <div className="col d-flex justify-content-center">
          <img
            src={api.getImageUrl(produto.id)}
            onError={(e) => (e.target.src = NO_IMAGE_URL)}
            className="img-thumbnail"
            alt={produto.nome}
            width="60%"
          />
        </div>
        <div className="col">
          <Card className="card">
            <div className="card-body">
              <Title className="card-title">{produto.nome}</Title>
              <Subtitle className="card-text">ID: {produto.id}</Subtitle>
            </div>

            <hr />

            <div className="d-flex flex-row justify-content-center mt-2 mb-2">
              <div className="p-2 d-flex flex-column me-4">
                <div className="d-flex justify-content-center">
                  <Price>{currencyFormat(produto.preco)}</Price>
                </div>
                <hr />
                <Estoque>
                  {produto.estoque}{" "}
                  {produto.estoque === 1 ? "disponível" : "disponíveis"} em
                  estoque
                </Estoque>
              </div>

              <div className="p-2 ms-4 d-flex flex-column align-items-center justify-content-center">
                <div>
                  <RemoveItemButton
                    className="btn btn-danger"
                    onClick={() => setQtd(qtd - 1)}
                    disabled={qtd === 1}
                  >
                    <FontAwesomeIcon icon={faMinus} />
                  </RemoveItemButton>
                  <span>{qtd}</span>
                  <AddItemButton
                    className="btn btn-primary"
                    onClick={() => setQtd(qtd + 1)}
                    disabled={qtd >= produto.estoque}
                  >
                    <FontAwesomeIcon icon={faPlus} />
                  </AddItemButton>
                </div>
                <AddToCartButton
                  onClick={handleAddToCart}
                  disabled={produto.estoque === 0 || produto.estoque < qtd}
                >
                  Adicionar ao carrinho
                </AddToCartButton>
              </div>
            </div>

            <hr />
            <div className="card-body">
              <DetailsTitle>Detalhes do Produto</DetailsTitle>
              <Details>{produto.descricao}</Details>
            </div>
            {user.tipoUsuario === "colaborador" ? (
              <div className="card-body d-flex justify-content-center">
                <DeleteButton onClick={handleDelete}>
                  <FontAwesomeIcon className="me-2" icon={faTrash} />
                  Excluir Produto
                </DeleteButton>
                <EditButton onClick={() => setShowModal(true)}>
                  <FontAwesomeIcon className="me-2" icon={faEdit} />
                  Editar Produto
                </EditButton>
              </div>
            ) : (
              <></>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Produto;
