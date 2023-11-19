import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo-marvel.png";

import styles from "./index.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

const Header = ({ token, handleToken }) => {
  const navigate = useNavigate();
  const [inactive, setInactive] = useState(true);

  const onBarsClick = () => {
    setInactive(!inactive);
  };

  return (
    <header className={styles.header}>
      <button
        className={styles.logo}
        onClick={() => {
          navigate("/");
        }}
      >
        <img className={styles.logo_image} src={logo} alt="logo" />
      </button>
      <div className={`${styles.wrapper} ${inactive ? styles.inactive : ""}`}>
        <nav className={styles.nav}>
          <button
            className={styles.button}
            onClick={() => {
              navigate("/characters");
            }}
          >
            Personnages
          </button>
          <button
            className={styles.button}
            onClick={() => {
              navigate("/comics");
            }}
          >
            Comics
          </button>
          <button
            className={styles.button}
            onClick={() => {
              navigate("/favorites");
            }}
          >
            Favoris
          </button>
        </nav>
        <div className={styles.auth}>
          {token ? (
            <button
              className={styles.button}
              onClick={() => {
                handleToken(null);
              }}
            >
              Se déconnecter
            </button>
          ) : (
            <>
              <button
                className={styles.button}
                onClick={() => {
                  navigate("/signup");
                }}
              >
                S'inscrire
              </button>
              <button
                className={styles.button}
                onClick={() => {
                  navigate("/login");
                }}
              >
                Se connecter
              </button>
            </>
          )}
        </div>
      </div>

      <button className={styles.buttonBars} onClick={onBarsClick}>
        <FontAwesomeIcon icon="fa-solid fa-bars" />
      </button>
    </header>
  );
};
export default Header;
