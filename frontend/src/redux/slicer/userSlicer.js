import { createSlice } from "@reduxjs/toolkit";

const initialState = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : {
      id: "",
      email: "",
      nome: "",
      logado: false,
      tipoUsuarioId: "visitante",
    };

export const userSlicer = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      const data = {
        id: action.payload.id,
        email: action.payload.email,
        nome: action.payload.nome,
        logado: true,
        tipoUsuarioId: action.payload.tipoUsuarioId,
      };

      localStorage.setItem("user", JSON.stringify(data));

      return data;
    },
    logout: (state) => {
      localStorage.clear();
      
      return initialState;
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, logout } = userSlicer.actions;

export default userSlicer.reducer;
