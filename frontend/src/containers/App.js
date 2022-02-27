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
import { monolitoRoutes } from "@nabstore/utils";
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
          <Route path={monolitoRoutes.ABOUT} element={<Sobre />} />
          <Route path={monolitoRoutes.HOME} exact element={<Produtos />} />
          <Route path={monolitoRoutes.PRODUTO} element={<Produto />} />
          <Route path={monolitoRoutes.SIGNUP} element={<Signup />} />
          <Route path={monolitoRoutes.CREATE_COLABORADOR} element={<AddColaborador />} />
          <Route path={monolitoRoutes.LOGIN} element={<Login />} />
          <Route path={monolitoRoutes.CART} element={<Cart />} />
          <Route path={monolitoRoutes.ENDERECOS} exact element={<Enderecos />} />
          <Route path={monolitoRoutes.CARDS} exact element={<Cartoes />} />
          <Route path={monolitoRoutes.CHECKOUT} element={<Checkout />} />
          <Route path={monolitoRoutes.COMPRAS} element={<Compras />} />
          <Route path={monolitoRoutes.COMPRA} element={<Compra />} />
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
