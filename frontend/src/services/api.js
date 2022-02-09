import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API,
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
    withCredentials: true,
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
    withCredentials: true,
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
  return res.data;
};

const logout = async () => {
  const res = await api.get(`/logout`);
  return res.data;
};

const fetchEnderecos = async (usuarioId) => {
  const res = await api.get(`/enderecos`, {
    withCredentials: true,
  });
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

const comprar = async ({ userId, enderecoId, produtos }) => {
  const res = await api.post(
    `/compras`,
    {
      userId,
      enderecoId,
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

const apiMethods = {
  fetchProdutos,
  fetchProdutoById,
  createProduto,
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
