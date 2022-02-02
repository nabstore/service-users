import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  AddColaborador,
  Cart,
  Checkout,
  Enderecos,
  Header,
  Login,
  Produto,
  Produtos,
  Signup,
  Sobre,
} from "./components";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className="container-sm mt-5">
        <Routes>
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/" exact element={<Produtos />} />
          <Route path="/produto/:id" element={<Produto />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/colaborador/add" element={<AddColaborador />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/enderecos" exact element={<Enderecos />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
