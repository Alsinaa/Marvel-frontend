import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import styles from "./index.module.css";

import wallpaper from "../../assets/home-wallpaper.jpeg";

const Login = ({ handleToken }) => {
  const navigate = useNavigate();

  // State qui gère mes input
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //   State qui gère le message d'erreur
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (event, setChange) => {
    setChange(event.target.value);
    setErrorMessage("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const fetchData = async () => {
      try {
        setErrorMessage("");

        const response = await axios.post(
          "https://site--backend-marvel--fwbhzny5f6p7.code.run/user/login",
          {
            email: email,
            password: password,
          }
        );

        // console.log(response.data);
        handleToken(response.data.token, response.data.username);
        navigate("/");
      } catch (error) {
        console.log(error.response.data);
        if (
          error.response.data.message === "Email ou mot de passe incorrecte"
        ) {
          setErrorMessage("Connexion non autorisé");
        }
      }
    };
    fetchData();
  };
  return (
    <main className="main">
      <img className="wallpaper-image" src={wallpaper} alt="wallpaper" />
      <div className={styles.wrapper}>
        <form
          className={styles.form}
          onSubmit={(event) => {
            handleSubmit(event);
          }}
        >
          <div className={styles.form_content}>
            <h1>Formulaire de connexion</h1>

            <div className={styles.element}>
              <label htmlFor="email">Email</label>
              <input
                className={styles.input}
                type="email"
                id="email"
                placeholder="marvel@mail.com"
                name="email"
                value={email}
                onChange={(event) => {
                  handleChange(event, setEmail);
                }}
              />
            </div>
            <div className={styles.element}>
              <label htmlFor="password">Password</label>
              <input
                className={styles.input}
                type="password"
                id="password"
                placeholder="******"
                name="password"
                value={password}
                onChange={(event) => {
                  handleChange(event, setPassword);
                }}
              />
            </div>
          </div>

          {errorMessage && <p>{errorMessage}</p>}

          <button className={styles.button} type="submit">
            Se Connecter
          </button>
        </form>
        <Link className={styles.link} to={"/signup"}>
          Pas encore de compte ? Inscris-toi !
        </Link>
      </div>
    </main>
  );
};
export default Login;
