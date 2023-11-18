import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cookies from "js-cookie";
import { useState } from "react";
import "./App.css";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

//COMPONENTS
import Header from "./components/Header";

// PAGES
import Home from "./pages/Home";
import Comics from "./pages/Comics";
import ComicsByCharacter from "./pages/ComicsByCharacter";
import Comic from "./pages/Comic";
import Characters from "./pages/Characters";
import CharacterDetails from "./pages/CharacterDetails";
import Favorites from "./pages/Favorites";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

library.add(faHeart);

function App() {
  const [token, setToken] = useState(Cookies.get("token") || null);
  const handleToken = (token, username) => {
    if (token) {
      Cookies.set("token", token, { expires: 15 });
      Cookies.set("username", username, { expires: 15 });
      setToken(token);
    } else {
      Cookies.remove("username");
      Cookies.remove("token");
      setToken(null);
    }
  };
  return (
    <Router>
      <Header token={token} handleToken={handleToken} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/comics" element={<Comics />} />
        <Route path="/comics/:characterId" element={<ComicsByCharacter />} />
        <Route path="/comic/:comicId" element={<Comic />} />
        <Route path="/characters" element={<Characters />} />
        <Route path="/character/:characterId" element={<CharacterDetails />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/signup" element={<Signup handleToken={handleToken} />} />
        <Route path="/login" element={<Login handleToken={handleToken} />} />
      </Routes>
    </Router>
  );
}

export default App;
