import axios from "axios";
import { getToken, login as authLogin, logout as authLogout } from "./auth";

const api = axios.create({
  baseURL: process.env.REACT_APP_API,
});

api.interceptors.request.use(async (config) => {
  const token = getToken();
  if (token) {
    config.headers.authorization = token;
  }
  return config;
});

const fetchProdutos = async (page) => {
  const res = await api.get(`/produtos?page=${page ? page : 1}`);
  return res.data;
};

const fetchProdutoById = async (id) => {
  const res = await api.get(`/produtos/${id}`);
  return res.data;
};

const createProduto = async (formData) => {
  const res = await api.post(`/produtos`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

const createUsuario = async ({ nome, email, senha, tipoUsuarioId }) => {
  const res = await api.post(
    `/usuarios`,
    {
      nome,
      email,
      senha,
      tipoUsuarioId,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    }
  );
  return res.data;
};

const editProduto = async ({ id, nome, descricao, preco, estoque }) => {
  const res = await api.put(
    `/produtos/${id}`,
    {
      nome,
      descricao,
      preco,
      estoque,
    },
    { withCredentials: true }
  );
  return res.data;
};

const deleteProduto = async (id) => {
  const res = await api.delete(`/produtos/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.data;
};

const login = async ({ email, password }) => {
  const res = await api.post(
    `/login`,
    { email, senha: password },
    {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    }
  );
  authLogin(res.data.token);
  return res.data.usuario;
};

const logout = async () => {
  const res = await api.get(`/logout`);
  authLogout();
  return res.data;
};

const fetchEnderecos = async () => {
  const res = await api.get(`/enderecos`);
  return res.data;
};

const createEndereco = async ({
  logradouro,
  bairro,
  numero,
  cidade,
  uf,
  cep,
}) => {
  const res = await api.post(
    `/enderecos`,
    {
      logradouro,
      bairro,
      numero,
      cidade,
      uf,
      cep,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    }
  );
  return res.data;
};

const getImageUrl = (produtoId) => {
  return `${process.env.REACT_APP_API}/produtos/${produtoId}/image`;
};

const uploadImage = (produtoId, formData) => {
  const res = axios.post(`/produtos/${produtoId}/imagem`, formData);
  return res.data;
};

const comprar = async ({ userId, cartaoId, enderecoId, produtos }) => {
  const res = await api.post(
    `/compras`,
    {
      userId,
      enderecoId,
      cartaoId,
      produtos,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    }
  );
  return res.data;
};

const createCartao = async ({ number, apelido, validade, cvv, titular }) => {
  const res = await api.post(
    `/cartao`,
    {
      number,
      apelido,
      validade,
      cvv,
      titular,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    }
  );
  return res.data;
};

const fetchCartoes = async () => {
  const res = await api.get(`/cartao`);
  return res.data;
};

const fetchCompras = async () => {
  const res = await api.get(`/compras`);
  return res.data;
};

const fetchCompraById = async (id) => {
  const res = await api.get(`/compras/${id}`);
  return res.data;
};

const apiMethods = {
  fetchProdutos,
  fetchProdutoById,
  fetchCompras,
  fetchCompraById,
  createProduto,
  createCartao,
  fetchCartoes,
  editProduto,
  deleteProduto,
  login,
  logout,
  createUsuario,
  fetchEnderecos,
  createEndereco,
  getImageUrl,
  uploadImage,
  comprar,
};

export default apiMethods;
