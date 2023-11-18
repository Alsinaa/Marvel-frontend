import { useNavigate } from "react-router-dom";
import logo from "../assets/logo-marvel.png";

const Header = ({ token, handleToken }) => {
  const navigate = useNavigate();
  return (
    <div className="header">
      <div className="header-nav">
        <img
          className="logo-header"
          src={logo}
          alt="logo"
          onClick={() => {
            navigate("/");
          }}
        />

        <section className="nav">
          <button
            onClick={() => {
              navigate("/characters");
            }}
          >
            Characters
          </button>
          <button
            onClick={() => {
              navigate("/comics");
            }}
          >
            Comics
          </button>
          <button
            onClick={() => {
              navigate("/favorites");
            }}
          >
            Favoris
          </button>
        </section>
      </div>
      {token ? (
        <section className="disconnect">
          <button
            onClick={() => {
              handleToken(null);
            }}
          >
            Se déconnecter
          </button>
        </section>
      ) : (
        <section className="header-sign-log">
          <button
            onClick={() => {
              navigate("/signup");
            }}
          >
            S'inscrire
          </button>
          <button
            onClick={() => {
              navigate("/login");
            }}
          >
            Se connecter
          </button>
        </section>
      )}
    </div>
  );
};
export default Header;
