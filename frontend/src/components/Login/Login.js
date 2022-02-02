import { useState } from "react";
import apiMethods from "../../services/api";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/slicer/userSlicer";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faKey, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import {
  Container,
  Title,
  Button,
  Input,
  Label,
  Line,
  SignUpLink,
} from "./styles";

const Login = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    apiMethods
      .login({ email, password })
      .then((resp) => {
        dispatch(login(resp));
        setError(false);
        if (cart.produtos.length > 0) navigate("/enderecos");
        else navigate("/");
      })
      .catch((err) => {
        if (err.response?.status === 401) {
          setError(true);
        }
      });
  };

  return (
    <Container className="container">
      <Title>Login</Title>

      <Line />

      <form onSubmit={handleSubmit}>
        <div className="ms-3">
          <FontAwesomeIcon icon={faUser} />
          <Label htmlFor="email">E-mail</Label>
        </div>
        <Input
          autoFocus
          type="email"
          id="email"
          className={error ? "form-control is-invalid" : "form-control"}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className="ms-3">
          <FontAwesomeIcon icon={faKey} />
          <Label htmlFor="password">Senha</Label>
        </div>

        <Input
          type="password"
          id="password"
          className={error ? "form-control is-invalid" : "form-control"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="invalid-feedback">E-mail e/ou senha inválido(s).</div>

        <Button>Entrar</Button>
        <div className="d-flex justify-content-center">
          <SignUpLink to="/signup">
            Não possuo uma conta <FontAwesomeIcon icon={faArrowRight} />
          </SignUpLink>
        </div>
      </form>
    </Container>
  );
};

export default Login;
