import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import { Title, Card, ProdutoTitle, Info, Value } from "./styles";
import { useEffect, useState } from "react";
import LoadingIcons from "react-loading-icons";
import { currencyFormat } from "../../utils/format";
import { routes } from "@nabstore/utils";
import Anchor from "../../components/Anchor";

const Compras = () => {
  const navigate = useNavigate();
  const [compras, setCompras] = useState();

  useEffect(() => {
    api
      .fetchCompras()
      .then((resp) => setCompras(resp))
      .catch((err) => console.error("Erro ao carregar compras", err));
  }, []);

  const handleVerDetalhes = (id) => {
    navigate(routes.COMPRA.replace(":id", id));
  };

  if (!compras) {
    return <LoadingIcons.Oval className="mt-5" stroke="#2f2f2f" />;
  }
  console.log(compras);

  return (
    <div className="container">
      <Anchor.GoBack path={routes.HOME} text="Voltar aos produtos" />

      <div className="d-flex justify-content-center">
        <Title>Minhas Compras</Title>
      </div>

      {compras.length === 0 ? (
        <Info className="d-flex justify-content-center mt-5">
          Você ainda não fez compra alguma =(.
        </Info>
      ) : (
        <>
          <div className="d-flex flex-column align-items-center mb-5">
            {compras.map((compra) => (
              <Card
                className="card mb-4 p-4"
                key={compra.id}
                onClick={() => handleVerDetalhes(compra.id)}
              >
                <ProdutoTitle className="card-title">
                  Comprou {currencyFormat(compra.total)} no dia{" "}
                  {new Date(compra.createdAt).toLocaleDateString()}
                </ProdutoTitle>
                <div className="d-flex flex-row justify-content-around mt-3">
                  <div className="d-flex flex-column">
                    <Info>
                      ID: <Value>{compra.id}</Value>
                    </Info>
                    <Info>
                      Quantidade de itens:{" "}
                      <Value>
                        {compra.CompraItems.reduce(
                          (prev, atual) => prev + atual.quantidade,
                          0
                        )}
                      </Value>
                    </Info>
                  </div>
                  <div className="d-flex flex-column">
                    <Info>
                      Previsão de entrega:{" "}
                      <Value>
                        {new Date(
                          compra.estimatedDeliveryDate
                        ).toLocaleDateString()}
                      </Value>
                    </Info>
                    <Info>
                      Data de entrega:{" "}
                      <Value style={{ color: "green" }}>
                        {compra.deliveredAt !== null
                          ? new Date(compra.deliveredAt).toLocaleDateString()
                          : "Entrega em andamento."}
                      </Value>
                    </Info>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Compras;
