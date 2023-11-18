import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Pagination from "../components/Pagination";
import ResearchBar from "../components/ResearchBar";

import noLogo from "../assets/no-logo.png";

const Characters = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [name, setName] = useState("");
  const [skip, setSkip] = useState(0);
  const [counter, setCounter] = useState(1);
  const [totalPage, setTotalPage] = useState();
  let limit = 25;

  const navigate = useNavigate();

  const [fav, setFav] = useState(
    Cookies.get("FavCharact") ? JSON.parse(Cookies.get("FavCharact")) : []
  );

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://site--backend-marvel--fwbhzny5f6p7.code.run/characters?title=${name}&limit=${limit}&skip=${skip}`
      );
      setData(response.data);
      setIsLoading(false);
    };
    fetchData();
  }, [name, skip, limit, totalPage]);

  const handleFav = (charact) => {
    console.log("comic", charact);
    const favCopy = [...fav];
    const favInCookie = favCopy.find((element) => element.id === charact._id);

    if (!favInCookie) {
      favCopy.push({
        title: charact.title,
        picture: charact.thumbnail.path + "." + charact.thumbnail.extension,
        id: charact._id,
      });
      console.log(favCopy);
    } else {
      console.log(favInCookie);
      for (let i = 0; i < favCopy.length; i++) {
        if (favInCookie.id === favCopy[i].id) {
          favCopy.splice(i, 1);
        }
      }
    }
    setFav(favCopy);
  };

  const isFavorite = (charactId) => {
    // console.log(charactId);
    const favCopy = [...fav];
    const favInCookie = favCopy.find((element) => element.id === charactId);
    return favInCookie;
  };

  Cookies.set("FavCharact", JSON.stringify(fav), {
    expires: 15,
  });

  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <main>
      <ResearchBar
        setName={setName}
        setCounter={setCounter}
        setSkip={setSkip}
      />

      <section className="characters">
        {data.results.map((character, index) => {
          return (
            <div key={character._id}>
              {character.thumbnail.path ===
                "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available" ||
              character.thumbnail.path ===
                "http://i.annihil.us/u/prod/marvel/i/mg/f/60/4c002e0305708" ? (
                <img
                  src={noLogo} // IMAGE A IMPORTER
                  alt=""
                  onClick={() => {
                    navigate("/comics/" + character._id);
                  }}
                />
              ) : (
                <img
                  src={
                    character.thumbnail.path +
                    "." +
                    character.thumbnail.extension
                  }
                  alt={character.title}
                  onClick={() => {
                    navigate("/comics/" + character._id);
                  }}
                />
              )}

              <p>{character.name}</p>
              <button
                onClick={() => {
                  navigate("/character/" + character._id);
                }}
              >
                Plus d'information sur le character
              </button>

              <button
                className="favorite"
                onClick={() => {
                  handleFav(character, index);
                }}
              >
                {isFavorite(character._id) ? (
                  <div>Retirer à mes favoris</div>
                ) : (
                  <div>Ajouter à mes favoris</div>
                )}
              </button>
            </div>
          );
        })}
      </section>

      <Pagination
        counter={counter}
        setCounter={setCounter}
        limit={limit}
        skip={skip}
        setSkip={setSkip}
        totalPage={totalPage}
      />
    </main>
  );
};
export default Characters;
