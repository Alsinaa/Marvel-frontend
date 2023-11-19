import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import wallpaper from "../../assets/characters-wallpaper.jpeg";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Pagination from "../../components/Pagination";
import ResearchBar from "../../components/ResearchBar";
import Loading from "../../components/Loading";

import noLogo from "../../assets/no-logo.png";

import styles from "./index.module.css";

const Characters = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [name, setName] = useState("");
  const [skip, setSkip] = useState(0);
  const [counter, setCounter] = useState(1);
  const [totalPage, setTotalPage] = useState();
  let limit = 100;

  const navigate = useNavigate();

  const [fav, setFav] = useState(
    Cookies.get("FavCharact") ? JSON.parse(Cookies.get("FavCharact")) : []
  );

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://site--backend-marvel--fwbhzny5f6p7.code.run/characters?name=${name}&limit=${limit}&skip=${skip}`
      );
      setData(response.data);
      setIsLoading(false);
      setTotalPage(Math.ceil(response.data.count / limit));
    };
    fetchData();
  }, [name, skip, limit, totalPage]);

  const handleFav = (charact) => {
    // console.log("comic", charact);
    const favCopy = [...fav];
    const favInCookie = favCopy.find((element) => element.id === charact._id);

    if (!favInCookie) {
      favCopy.push({
        name: charact.name,
        picture: charact.thumbnail.path + "." + charact.thumbnail.extension,
        id: charact._id,
      });
      // console.log(favCopy);
    } else {
      // console.log(favInCookie);
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

  return (
    <main className="main">
      <img className="wallpaper-image" src={wallpaper} alt="wallpaper" />
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <ResearchBar
            setName={setName}
            setCounter={setCounter}
            setSkip={setSkip}
          />

          <section className={styles.characters}>
            {data.results.map((character, index) => {
              return (
                <div key={character._id} className={styles.character}>
                  <div className={styles.character_image}>
                    {character.thumbnail.path ===
                      "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available" ||
                    character.thumbnail.path ===
                      "http://i.annihil.us/u/prod/marvel/i/mg/f/60/4c002e0305708" ? (
                      <img
                        src={noLogo} // IMAGE A IMPORTER
                        alt=""
                      />
                    ) : (
                      <img
                        src={
                          character.thumbnail.path +
                          "." +
                          character.thumbnail.extension
                        }
                        alt={character.name}
                      />
                    )}
                  </div>

                  <div className={styles.content}>
                    <button
                      className={styles.favorite}
                      onClick={() => {
                        handleFav(character, index);
                      }}
                    >
                      {isFavorite(character._id) ? (
                        <FontAwesomeIcon
                          className={styles.favorite_active}
                          icon="fa-heart"
                        />
                      ) : (
                        <FontAwesomeIcon icon="fa-regular fa-heart" />
                      )}
                    </button>

                    <p className={styles.name}>{character.name}</p>

                    <button
                      className={styles.button}
                      onClick={() => {
                        navigate("/character/" + character._id);
                      }}
                    >
                      Voir plus
                    </button>
                  </div>
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
        </>
      )}
    </main>
  );
};
export default Characters;
