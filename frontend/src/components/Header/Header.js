import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/slicer/userSlicer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlusCircle,
  faQuestionCircle,
  faShoppingCart,
  faSignInAlt,
  faSignOutAlt,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import api from "../../services/api";
import { tipoUsuario } from "../../utils/tipoUsuarioEnum";

const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    api
      .logout()
      .then((res) => {
        dispatch(logout());
        if (location.pathname === "/") {
          navigate(0);
        } else {
          navigate("/");
        }
      })
      .catch((err) => console.error("Erro ao fazer logout", err));
  };

  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
      <div className="container-sm">
        {/* <div className="container">
        <a className="navbar-brand" href="#">
          <img src="/public/logo.png" alt="" width="30" height="24" />
        </a>
      </div> */}
        <div className="container-fluid">
          <div className="float-start">
            <Link className="navbar-brand" to="/">
              <img src="./logo.svg" alt="" />
            </Link>
          </div>
          <div className="float-end">
            <ul className="navbar-nav">
              {user.tipoUsuarioId === tipoUsuario.COLABORADOR ? (
                <li className="nav-item">
                  <Link className="nav-link" to="/colaborador/add">
                    Add Colaborador
                    <FontAwesomeIcon className="ms-2" icon={faPlusCircle} />
                  </Link>
                </li>
              ) : (
                <></>
              )}
              <li className="nav-item">
                <Link className="nav-link" to="/sobre">
                  Sobre
                  <FontAwesomeIcon className="ms-2" icon={faQuestionCircle} />
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/cart">
                  Carrinho{" "}
                  <FontAwesomeIcon className="ms-2" icon={faShoppingCart} />
                </Link>
              </li>
              {!user.logado ? (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">
                      Login
                      <FontAwesomeIcon className="ms-2" icon={faSignInAlt} />
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/signup">
                      Sign Up
                      <FontAwesomeIcon className="ms-2" icon={faUserPlus} />
                    </Link>
                  </li>
                </>
              ) : (
                <li className="nav-item">
                  <a onClick={handleLogout} className="nav-link" href="/#">
                    {user.nome}{" "}
                    <FontAwesomeIcon className="ms-2" icon={faSignOutAlt} />
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
