import { useState } from "react";
import { useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import api from "../../services/api";
import { SubmitButton } from "../AddProduto/styles";
import { useNavigate } from "react-router";

const AddCartao = ({ showModal, handleClose }) => {
  const [number, setNumber] = useState("");
  const [apelido, setApelido] = useState("");
  const [validade, setValidade] = useState("");
  const [cvv, setCvv] = useState("");
  const [titular, setTitular] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    api
      .createCartao({
        number,
        apelido,
        cvv,
        titular,
        validade,
      })
      .then((resp) => {
        navigate(0);
      })
      .catch((err) => {
        console.error("Erro ao criar cartão", err);
      });
  };

  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Adição de Cartão</Modal.Title>
      </Modal.Header>
      <Modal.Body className="m-3">
        <form onSubmit={handleSubmit}>
          <label htmlFor="apelido">Apelido</label>
          <input
            autoFocus
            type="text"
            id="apelido"
            className="form-control"
            value={apelido}
            onChange={(e) => setApelido(e.target.value)}
          />

          <label htmlFor="number">Número</label>
          <input
            autoFocus
            type="text"
            id="number"
            className="form-control"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
          />
          
          <label htmlFor="validade">Validade</label>
          <input
            autoFocus
            type="text"
            id="validade"
            className="form-control"
            value={validade}
            onChange={(e) => setValidade(e.target.value)}
          />

          <label htmlFor="titular">Titular</label>
          <input
            autoFocus
            type="text"
            id="titular"
            className="form-control"
            value={titular}
            onChange={(e) => setTitular(e.target.value)}
          />
          
          <label htmlFor="cvv">CVV</label>
          <input
            autoFocus
            type="text"
            id="cvv"
            className="form-control"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
          />

          <SubmitButton>Criar</SubmitButton>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default AddCartao;
