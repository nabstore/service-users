import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../redux/store";
import {
  AddColaborador,
  Cart,
  Cartoes,
  Checkout,
  Compra,
  Compras,
  Enderecos,
  Header,
  Login,
  Produto,
  Produtos,
  Signup,
  Sobre,
} from "../screens";

function App() {
  return (
    <Provider store={store}>
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
            <Route path="/cartoes" exact element={<Cartoes />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/compras" element={<Compras />} />
            <Route path="/compras/:id" element={<Compra />} />
          </Routes>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
