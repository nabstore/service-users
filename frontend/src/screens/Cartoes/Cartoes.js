import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { selectCartao } from "../../redux/slicer/cartSlicer";
import api from "../../services/api";
import { Data, Label, CardTitle, Card } from "./styles";
import { routes } from "@nabstore/utils";
import AddCartao from "../AddCartao/AddCartao";
import Button from "../../components/Button";
import Typography from "../../components/Typografy";
import Anchor from "../../components/Anchor";

const Cartoes = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [cartoes, setCartoes] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    api
      .fetchCartoes()
      .then((resp) => setCartoes(resp))
      .catch((err) => console.error("Erro ao carregar cartões", err));
  }, []);

  const handleSelect = (cartao) => {
    dispatch(selectCartao(cartao));
    navigate(routes.ENDERECOS);
  };

  return (
    <div className="container">
      <AddCartao 
        handleClose={() => setShowModal(false)} 
        showModal={showModal} 
      />

      <Anchor.GoBack path={routes.CART} text="Voltar ao carrinho" />

      <div className="float-end">
        <Button.Primary onClick={() => setShowModal(true)}>
          <FontAwesomeIcon className="me-2" icon={faPlusCircle} /> Novo Cartão
        </Button.Primary>
      </div>

      <div className="d-flex justify-content-center mt-4">
        <Typography.Title>Cartões</Typography.Title>
      </div>

      <div className="d-flex flex-column align-items-center mb-5">
        {cartoes.map((cartao) => (
          <Card
            key={cartao.id}
            className="card"
            onClick={() => handleSelect(cartao)}
            style={{ cursor: "pointer" }}
          >
            <CardTitle>{cartao.apelido}</CardTitle>
            <div className="d-flex flex-row justify-content-around">
              <div className="d-flex flex-column">
                <Data>
                  <Label>Número:</Label> {cartao.number}
                </Data>
              </div>
              <div className="d-flex flex-column">
                <Data>
                  <Label>Validade:</Label> {cartao.validade}
                </Data>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Cartoes;
