import { currencyFormat } from "../../utils/format";
import api from "../../services/api";
import { Card, Info, Title, Value } from "./styles";
import { useEffect, useState } from "react";
import "antd/dist/antd.css";
import { useParams } from "react-router";
import LoadingIcons from "react-loading-icons";
import Anchor from "../../components/Anchor";

const Checkout = () => {
  const { id } = useParams();
  const [compra, setCompra] = useState();

  useEffect(() => {
    api
      .fetchCompraById(id)
      .then((resp) => setCompra(resp))
      .catch((err) => console.log("Erro ao carregar compra."));
  }, [id]);

  const Content = () => {
    if (!compra) {
      return <LoadingIcons.Oval className="mt-5" stroke="#2f2f2f" />;
    }

    return (
      <div className="d-flex flex-row">
        <Card className="card" style={{ width: "60%" }}>
          <h3>Produtos</h3>
          {compra.CompraItems.map((prod) => (
            <div
              className="d-flex flex-row justify-content-between p-2"
              key={prod.id}
            >
              <Info>
                {prod.quantidade}x {prod.Produto.nome}
              </Info>
              <Value bold>
                {currencyFormat(prod.quantidade * prod.Produto.preco)}
              </Value>
            </div>
          ))}

          <hr />

          <div className="mt-3 mb-3 d-flex  flex-row justify-content-between">
            <Info>Cartão:</Info>
            <Value bold style={{ color: "green" }}>
              {compra.Cartao.apelido}
            </Value>
          </div>

          <hr />

          <div className="mt-3 mb-3 d-flex align-items-center flex-row justify-content-between">
            <Info style={{ color: "#2f2f2f" }}>Valor total:</Info>
            <Value bold style={{ fontSize: 32 }}>
              {currencyFormat(compra.total)}
            </Value>
          </div>
        </Card>

        <Card className="card" style={{ width: "40%", height: "50%" }}>
          <h3>Endereço de Entrega</h3>
          <Info>
            {compra.Endereco.logradouro}, {compra.Endereco.bairro} -{" "}
            {compra.Endereco.numero}
          </Info>
          <Info>
            {compra.Endereco.cidade} - {compra.Endereco.uf}
          </Info>
          <Info>CEP: {compra.Endereco.cep}</Info>

          <hr />

          <div className="mt-3 mb-1 d-flex  flex-row justify-content-between">
            <Info>Taxa de Entrega:</Info>
            <Value bold style={{ color: "green" }}>
              Grátis
            </Value>
          </div>

          <div className="mt-1 mb-1 d-flex  flex-row justify-content-between">
            <Info>Previsão de Entrega:</Info>
            <Value>
              {new Date(compra.estimatedDeliveryDate).toLocaleDateString()}
            </Value>
          </div>

          <div className="mt-1 mb-3 d-flex  flex-row justify-content-between">
            <Info>Entrega:</Info>
            {compra.deliveredAt !== null ? (
              <Value bold style={{ color: "green" }}>
                {new Date(compra.deliveredAt).toLocaleDateString()}
              </Value>
            ) : (
              <Value>Em andamento.</Value>
            )}
          </div>
        </Card>
      </div>
    );
  };

  return (
    <div className="container">
      <Anchor.GoBack path="/compras" text="Voltar às compras" />

      <div className="d-flex justify-content-center">
        <Title>Detalhes de Compra</Title>
      </div>

      <Content />
    </div>
  );
};

export default Checkout;
