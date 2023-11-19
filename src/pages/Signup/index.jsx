import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import styles from "./index.module.css";

import wallpaper from "../../assets/home-wallpaper.jpeg";

const Signup = ({ handleToken }) => {
  const navigate = useNavigate();

  // State pour gérer mes input
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //   State qui gère le message d'erreur
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (event, setchange) => {
    setchange(event.target.value);
    setErrorMessage("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchData();
  };
  const fetchData = async () => {
    try {
      setErrorMessage("");

      const response = await axios.post(
        "https://site--backend-marvel--fwbhzny5f6p7.code.run/user/signup",
        {
          username: username,
          email: email,
          password: password,
        }
      );

      // console.log(response.data);

      handleToken(response.data.token, response.data.username);
      navigate("/");
    } catch (error) {
      console.log(error.response.data);
      if (error.response.data.message === "Cette email est déjà enregistré") {
        setErrorMessage("Cet email existe déjà !");
      } else if (
        error.response.data.message === "Veuillez renseigner tous les champs"
      ) {
        setErrorMessage("Veuillez renseigner tous les champs");
      }
    }
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
            <h1>Formulaire d'inscription</h1>
            <div className={styles.element}>
              <label htmlFor="username">Nom d'utilisateur</label>
              <input
                className={styles.input}
                type="text"
                placeholder="marvel"
                name="username"
                id="username"
                value={username}
                onChange={(event) => {
                  handleChange(event, setUsername);
                }}
              />
            </div>

            <div className={styles.element}>
              <label htmlFor="email">Email</label>
              <input
                className={styles.input}
                type="email"
                placeholder="marvel@mail.com"
                name="email"
                id="email"
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
                placeholder="******"
                name="password"
                id="password"
                value={password}
                onChange={(event) => {
                  handleChange(event, setPassword);
                }}
              />
            </div>

            {errorMessage && <p> {errorMessage}</p>}
          </div>
          <button className={styles.button} type="submit">
            Valider
          </button>
        </form>
        <Link className={styles.link} to={"/login"}>
          Tu as déjà un compte ? Connecte-toi !
        </Link>
      </div>
    </main>
  );
};
export default Signup;
