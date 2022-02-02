import { useNavigate } from "react-router-dom";
import { Button, Subtitle, Text, Title } from "./styles"

const Sobre = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Title>Bem vindo,</Title>
      <Subtitle>esta é a minha loja e eu que fiz!</Subtitle>

      <Text>
        Aqui você vai encontrar os melhores produtos, com os melhores preços.
        Através de um simples controle de estoque, podemos levar o que você mais
        quer com conforto e praticidade.
      </Text>

      <Button onClick={() => navigate("/")}>Ver Produtos</Button>
    </div>
  );
};

export default Sobre;
