import { useState } from "react";
import { Modal } from "react-bootstrap";
import api from "../../services/api";
import { SubmitButton } from "../AddProduto/styles";
import { useNavigate } from "react-router";

const AddEndereco = ({ showModal, handleClose }) => {
  const [logradouro, setLogradouro] = useState("");
  const [bairro, setBairro] = useState("");
  const [numero, setNumero] = useState(0);
  const [cidade, setCidade] = useState("Manaus");
  const navigate = useNavigate();
  const [uf, setUf] = useState("AM");
  const [cep, setCep] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    api
      .createEndereco({
        logradouro,
        bairro,
        numero,
        cep,
        uf,
        cidade,
      })
      .then((resp) => {
        navigate(0);
      })
      .catch((err) => {
        console.error("Erro ao criar endereço", err);
      });
  };

  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Adição de Endereço</Modal.Title>
      </Modal.Header>
      <Modal.Body className="m-3">
        <form onSubmit={handleSubmit}>
          <label htmlFor="logradouro">Logradouro</label>
          <input
            autoFocus
            type="text"
            id="logradouro"
            className="form-control"
            value={logradouro}
            onChange={(e) => setLogradouro(e.target.value)}
          />

          <label className="mt-3 mb-1" htmlFor="bairro">Bairro</label>
          <input
            id="bairro"
            type="text"
            className="form-control"
            value={bairro}
            onChange={(e) => setBairro(e.target.value)}
          />

          <label className="mt-3 mb-1" htmlFor="numero">Número</label>
          <input
            type="number"
            id="number"
            className="form-control"
            value={numero}
            onChange={(e) => setNumero(e.target.value)}
          />

          <label className="mt-3 mb-1" htmlFor="cidade">Cidade</label>
          <input
            type="text"
            id="cidade"
            className="form-control"
            value={cidade}
            onChange={(e) => setCidade(e.target.value)}
          />

          <label className="mt-3 mb-1" htmlFor="uf">UF</label>
          <input
            type="text"
            id="uf"
            className="form-control"
            value={uf}
            onChange={(e) => setUf(e.target.value)}
          />

          <label className="mt-3 mb-1" htmlFor="cep">CEP</label>
          <input
            type="text"
            id="cep"
            className="form-control"
            value={cep}
            onChange={(e) => setCep(e.target.value)}
          />

          <SubmitButton>Criar</SubmitButton>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default AddEndereco;
