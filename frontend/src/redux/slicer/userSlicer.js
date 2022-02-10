import { createSlice } from "@reduxjs/toolkit";

const USER_KEY = "user";

const initialState = localStorage.getItem(USER_KEY)
  ? JSON.parse(localStorage.getItem(USER_KEY))
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

      localStorage.setItem(USER_KEY, JSON.stringify(data));

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
