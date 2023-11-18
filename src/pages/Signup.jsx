import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

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

      console.log(response.data);

      handleToken(response.data.token, response.data.account.username);
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
    <main>
      <form
        className="sign-log"
        onSubmit={(event) => {
          handleSubmit(event);
        }}
      >
        <div>
          <h1>Formulaire d'inscription</h1>
          <div className="sign-log-input">
            <div>
              <label htmlFor="username">Nom d'utilisateur</label>
              <input
                type="text"
                placeholder="Jane Doe"
                name="username"
                id="username"
                value={username}
                onChange={(event) => {
                  handleChange(event, setUsername);
                }}
              />
            </div>

            <div>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                placeholder="janeDoe@mail.com"
                name="email"
                id="email"
                value={email}
                onChange={(event) => {
                  handleChange(event, setEmail);
                }}
              />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                placeholder="azerty"
                name="password"
                id="password"
                value={password}
                onChange={(event) => {
                  handleChange(event, setPassword);
                }}
              />
            </div>
          </div>

          {errorMessage && (
            <p style={{ color: "red", margin: "8px" }}> {errorMessage}</p>
          )}
          <button type="submit">Valider</button>
          <Link to={"/login"}>Tu as déjà un compte ? Connecte-toi !</Link>
        </div>
      </form>
    </main>
  );
};
export default Signup;
