import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { cleanCart, removeProduto } from "../../redux/slicer/cartSlicer";
import { currencyFormat } from "../../utils/format";
import api from "../../services/api";
import { NO_IMAGE_URL } from "../../utils/images";
import {
  Title,
  Card,
  ProdutoTitle,
  Info,
  DeleteButton,
  Total,
  Value,
  ClearCartButton,
} from "./styles";
import { EditButton, GoBackLink } from "../Produto/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, cart } = useSelector((state) => ({
    cart: state.cart,
    user: state.user,
  }));
  const [total, setTotal] = useState(0);

  const handleComprar = () => {
    if (user.logado) {
      navigate("/cartoes");
    } else {
      navigate("/login");
    }
  };

  useEffect(() => {
    setTotal(
      cart.produtos.reduce(
        (prev, actual) => prev + actual.qtd * actual.precoUnit,
        0
      )
    );
  }, [cart]);

  return (
    <div className="container">
      <GoBackLink to="/">
        <FontAwesomeIcon icon={faArrowLeft} /> Voltar aos produtos
      </GoBackLink>

      <div className="d-flex justify-content-center">
        <Title>Meu Carrinho</Title>
      </div>

      {cart.produtos.length === 0 ? (
        <Info className="d-flex justify-content-center mt-5">
          Carrinho Vazio
        </Info>
      ) : (
        <>
          <div className="d-flex flex-column align-items-center">
            {cart.produtos.map((prod) => (
              <Card className="card" key={prod.id}>
                <div className="d-flex flex-row  justify-content-around">
                  <div className="d-flex justify-content-center">
                    <img
                      src={api.getImageUrl(prod.id)}
                      onError={(e) => (e.target.src = NO_IMAGE_URL)}
                      className="img-thumbnail"
                      alt={prod.nome}
                      width="300px"
                    />
                  </div>

                  <div>
                    <div className="card-body">
                      <ProdutoTitle className="card-title">
                        {prod.nome}
                      </ProdutoTitle>
                      <Info>ID: {prod.id}</Info>
                      <Info className="mt-4">
                        Quantidade: <Value>{prod.qtd}</Value>
                      </Info>
                      <Info>
                        Preço Unitário:{" "}
                        <Value>{currencyFormat(prod.precoUnit)}</Value>
                      </Info>
                      <Info className="mt-5">
                        Total:{" "}
                        <Value>
                          {currencyFormat(prod.qtd * prod.precoUnit)}
                        </Value>
                      </Info>
                    </div>
                  </div>

                  <div className="d-flex">
                    <DeleteButton
                      className="align-self-center"
                      onClick={() => dispatch(removeProduto({ id: prod.id }))}
                    >
                      Remover do Carrinho
                    </DeleteButton>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <hr />

          <div className="d-flex justify-content-end">
            <Total>Total: {currencyFormat(total)}</Total>
          </div>

          <div className="card-body d-flex justify-content-center mb-5 mt=4">
            <ClearCartButton onClick={() => dispatch(cleanCart())}>
              Limpar Carrinho
            </ClearCartButton>
            <EditButton onClick={handleComprar}>Continuar</EditButton>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
