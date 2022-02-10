import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  cleanCart,
  removeProduto,
  addProduto,
} from "../../redux/slicer/cartSlicer";
import { currencyFormat } from "../../utils/format";
import api from "../../services/api";
import { NO_IMAGE_URL } from "../../utils/images";
import { Card, ProdutoTitle, Info, Total, Value } from "./styles";
import { useEffect, useState } from "react";
import "antd/dist/antd.css";
import { notification } from "antd";
import { isAuthenticated } from "../../services/auth";
import Button from "../../components/Button";
import Typography from "../../components/Typografy";
import Anchor from "../../components/Anchor";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cart } = useSelector((state) => ({
    cart: state.cart,
  }));
  const [total, setTotal] = useState(0);
  const [ofertas, setOfertas] = useState();

  useEffect(() => {
    setTotal(
      cart.produtos.reduce(
        (prev, actual) => prev + actual.qtd * actual.precoUnit,
        0
      )
    );
  }, [cart]);

  useEffect(() => {
    api
      .fetchOfertas()
      .then((resp) => setOfertas(resp))
      .catch((error) => console.error("Erro ao carregar ofertas"));
  }, []);

  const handleComprar = () => {
    if (isAuthenticated()) {
      navigate("/cartoes");
    } else {
      navigate("/login");
    }
  };

  const handleAddAoCarrinho = (produto) => {
    if (cart.produtos.find((prod) => prod.id === produto.id)) {
      const args = {
        message: "Ei, se liga!",
        description: "Este produto já foi adicionado ao carrinho.",
        duration: 2,
      };
      notification.info(args);
      return;
    }

    dispatch(
      addProduto({
        id: produto.id,
        precoUnit: produto.preco,
        qtd: 1,
        nome: produto.nome,
      })
    );
    const args = {
      message: "Prontinho =)",
      description: "Produto adicionado ao carrinho.",
      duration: 2,
    };
    notification.success(args);
  };

  return (
    <div className="container">
      <Anchor.GoBack path="/" text="Voltar aos produtos" />

      <div className="d-flex justify-content-center">
        <Typography.Title>Meu Carrinho</Typography.Title>
      </div>

      {cart.produtos.length === 0 ? (
        <Info className="d-flex justify-content-center mt-5">
          Seu carrinho está vazio.
        </Info>
      ) : (
        <>
          <div className="d-flex flex-column align-items-center">
            {cart.produtos.map((produto) => (
              <Card className="card" key={produto.id}>
                <div className="d-flex flex-row  justify-content-around">
                  <div className="d-flex justify-content-center">
                    <img
                      src={api.getImageUrl(produto.id)}
                      onError={(e) => (e.target.src = NO_IMAGE_URL)}
                      className="img-thumbnail"
                      alt={produto.nome}
                      width="300px"
                    />
                  </div>

                  <div>
                    <div className="card-body">
                      <ProdutoTitle className="card-title">
                        {produto.nome}
                      </ProdutoTitle>
                      <Info>ID: {produto.id}</Info>
                      <Info className="mt-4">
                        Quantidade: <Value>{produto.qtd}</Value>
                      </Info>
                      <Info>
                        Preço Unitário:{" "}
                        <Value>{currencyFormat(produto.precoUnit)}</Value>
                      </Info>
                      <Info className="mt-5">
                        Total:{" "}
                        <Value>
                          {currencyFormat(produto.qtd * produto.precoUnit)}
                        </Value>
                      </Info>
                    </div>
                  </div>

                  <div className="d-flex">
                    <Button.Danger
                      className="align-self-center"
                      onClick={() =>
                        dispatch(removeProduto({ id: produto.id }))
                      }
                    >
                      Remover
                    </Button.Danger>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="d-flex justify-content-center mt-3 mb-3">
            <Total>Total: {currencyFormat(total)}</Total>
          </div>

          <div className="card-body d-flex justify-content-center mb-5 mt=4">
            <Button.Danger width="40%" onClick={() => dispatch(cleanCart())}>
              Limpar Carrinho
            </Button.Danger>

            <Button.Secondary
              width="45%"
              margin="0 10px"
              onClick={handleComprar}
            >
              Continuar
            </Button.Secondary>
          </div>
        </>
      )}

      {ofertas && ofertas.length > 0 ? (
        <div className="mt-5">
          <hr className="mb-5" />
          <Typography.Title>Melhores Ofertas</Typography.Title>
          <div className="d-flex flex-row justify-content-center mb-5">
            {ofertas.map((produto) => (
              <Card
                style={{ width: "16rem" }}
                className="card"
                key={produto.id}
              >
                <img
                  src={api.getImageUrl(produto.id)}
                  className="card-img-top"
                  onError={(e) => (e.target.src = NO_IMAGE_URL)}
                  alt={produto.nome}
                />
                <div className="card-body">
                  <h5 className="card-title">{produto.nome}</h5>
                  <h2 className="card-title">
                    {currencyFormat(produto.preco)}
                  </h2>
                </div>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item d-flex justify-content-center">
                    <Button.Secondary
                      margin="10px 0 0 0"
                      onClick={() => handleAddAoCarrinho(produto)}
                    >
                      Add ao carrinho
                    </Button.Secondary>
                  </li>
                </ul>
              </Card>
            ))}
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Cart;
