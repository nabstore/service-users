import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { selectEndereco } from "../../redux/slicer/cartSlicer";
import api from "../../services/api";
import { GoBackLink } from "../Produto/styles";
import { Title } from "../Cart/styles";
import { Data, Label, CardTitle, Card, AddEnderecoButton } from "./styles";
import AddEndereco from "../AddEndereco/AddEndereco";

const Enderecos = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [enderecos, setEnderecos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    api
      .fetchEnderecos(user.id)
      .then((resp) => setEnderecos(resp))
      .catch((err) => console.error("Erro ao carregar endereços", err));
  }, [user]);

  const handleSelect = (endereco) => {
    dispatch(selectEndereco(endereco));
    navigate("/checkout");
  };

  return (
    <div className="container">
      <AddEndereco 
        handleClose={() => setShowModal(false)} 
        showModal={showModal} 
      />

      <GoBackLink to="/cart">
        <FontAwesomeIcon icon={faArrowLeft} /> Voltar ao carrinho
      </GoBackLink>

      <div className="float-end">
        <AddEnderecoButton onClick={() => setShowModal(true)}>
          <FontAwesomeIcon className="me-2" icon={faPlusCircle} /> Novo Endereço
        </AddEnderecoButton>
      </div>

      <div className="d-flex justify-content-center mt-4">
        <Title>Endereços</Title>
      </div>

      <div className="d-flex flex-column align-items-center mb-5">
        {enderecos.map((endereco) => (
          <Card
            key={endereco.id}
            className="card"
            onClick={() => handleSelect(endereco)}
            style={{ cursor: "pointer" }}
          >
            <CardTitle>Endereço {endereco.id}</CardTitle>
            <div className="d-flex flex-row justify-content-around">
              <div className="d-flex flex-column">
                <Data>
                  <Label>Logradouro:</Label> {endereco.logradouro}
                </Data>
                <Data>
                  <Label>Bairro:</Label> {endereco.bairro}
                </Data>
                <Data>
                  <Label>Numero:</Label> {endereco.numero}
                </Data>
              </div>
              <div className="d-flex flex-column">
                <Data>
                  <Label>Cidade:</Label> {endereco.cidade}
                </Data>
                <Data>
                  <Label>UF:</Label> {endereco.uf}
                </Data>
                <Data>
                  <Label>CEP:</Label> {endereco.cep}
                </Data>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Enderecos;
