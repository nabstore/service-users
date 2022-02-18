import {
  BrowserRouter,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { Provider, useDispatch, useSelector } from "react-redux";
import store from "../redux/store";
import {
  AddColaborador,
  Cart,
  Cartoes,
  Checkout,
  Compra,
  Compras,
  Enderecos,
  Login,
  Produto,
  Produtos,
  Signup,
  Sobre,
} from "../screens";
import { Header } from "@nabstore/styleguide";
import { logout as logoutAction } from "../redux/slicer/userSlicer";

const WrappedApp = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const WrapperHeader = () => {
    const navigate = useNavigate();
    const location = useLocation();

    return (
      <Header
        navigate={navigate}
        user={user}
        logout={() => {
          console.log("logout");
          dispatch(logoutAction());
        }}
        pathname={location.pathname}
      />
    );
  };

  return (
    <BrowserRouter>
      <WrapperHeader />
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
  );
};

const App = () => (
  <Provider store={store}>
    <WrappedApp />
  </Provider>
);

export default App;
