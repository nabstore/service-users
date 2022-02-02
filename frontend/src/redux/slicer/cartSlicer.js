import { createSlice } from "@reduxjs/toolkit";

const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : {
      produtos: [],
      enderecoEscolhido: undefined,
    };

export const cartSlicer = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduto: (state, action) => {
      const newProdutos = state.produtos.filter(
        (prod) => prod.id !== action.payload.id
      );

      const newCart = {
        ...state,
        produtos: [
          ...newProdutos,
          {
            id: action.payload.id,
            qtd: action.payload.qtd,
            precoUnit: action.payload.precoUnit,
            nome: action.payload.nome,
          },
        ],
      };

      localStorage.setItem("cart", JSON.stringify(newCart));

      return newCart;
    },
    removeProduto: (state, action) => {
      const newCart = {
        ...state,
        produtos: state.produtos.filter(
          (prod) => prod.id !== action.payload.id
        ),
      };

      localStorage.setItem("cart", JSON.stringify(newCart));

      return newCart;
    },
    selectEndereco: (state, action) => {
      const enderecoEscolhido = {
        logradouro: action.payload.logradouro,
        bairro: action.payload.bairro,
        cidade: action.payload.cidade,
        numero: action.payload.numero,
        uf: action.payload.uf,
        cep: action.payload.cep,
        id: action.payload.id,
      }

      const newState = {
        ...state,
        enderecoEscolhido
      }
      localStorage.setItem("cart", JSON.stringify(newState));

      return newState;
    },
    cleanCart: (state) => {
      localStorage.removeItem("cart");
      return initialState;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addProduto, removeProduto, cleanCart, selectEndereco } =
  cartSlicer.actions;

export default cartSlicer.reducer;
