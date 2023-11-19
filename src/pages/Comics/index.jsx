import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import wallpaper from "../../assets/comics-wallpaper.jpeg";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import ResearchBar from "../../components/ResearchBar";
import Pagination from "../../components/Pagination";
import Loading from "../../components/Loading";

import noLogo from "../../assets/no-logo.png";
import Cookies from "js-cookie";

import styles from "./index.module.css";

const Comics = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [skip, setSkip] = useState(0);
  const [counter, setCounter] = useState(1);
  const [totalPage, setTotalPage] = useState();
  let limit = 100;

  const navigate = useNavigate();

  const [fav, setFav] = useState(
    Cookies.get("FavComics") ? JSON.parse(Cookies.get("FavComics")) : []
  );
  // console.log(fav);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://site--backend-marvel--fwbhzny5f6p7.code.run/comics?title=${title}&limit=${limit}&skip=${skip}`
      );
      setData(response.data);
      setIsLoading(false);
      setTotalPage(Math.ceil(response.data.count / limit));
    };
    fetchData();
  }, [title, skip, limit, totalPage]);

  const handleFav = (comic) => {
    // console.log("comic", comic);
    const favCopy = [...fav];
    const favInCookie = favCopy.find((element) => element.id === comic._id);

    if (!favInCookie) {
      favCopy.push({
        title: comic.title,
        picture: comic.thumbnail.path + "." + comic.thumbnail.extension,
        id: comic._id,
      });
      // console.log("FAVCOPY", favCopy);
    } else {
      // console.log("FAVINCOOKIE", favInCookie);
      for (let i = 0; i < favCopy.length; i++) {
        if (favInCookie.id === favCopy[i].id) {
          favCopy.splice(i, 1);
        }
      }
    }
    setFav(favCopy);
  };

  const isFavorite = (comicId) => {
    // console.log(comicId);
    const favCopy = [...fav];
    const favInCookie = favCopy.find((element) => element.id === comicId);
    return favInCookie;
  };

  Cookies.set("FavComics", JSON.stringify(fav), {
    expires: 15,
  });

  return (
    <main className="main">
      <img className="wallpaper-image" src={wallpaper} alt="wallpaper" />
      {isLoading ? (
        <Loading />
      ) : (
        <div>
          <ResearchBar
            setName={setTitle}
            setCounter={setCounter}
            setSkip={setSkip}
          />
          <section className={styles.comics}>
            {data.results.map((comic, index) => {
              return (
                <div key={comic._id} className={styles.comic}>
                  <div className={styles.comic_image}>
                    {comic.thumbnail.path ===
                    "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available" ? (
                      <img
                        src={noLogo} // A REMPLACER PAR IMAGE COMICS
                        alt="" // A REMPLACER PAR NOM DE L'IMAGE
                      />
                    ) : (
                      <img
                        src={
                          comic.thumbnail.path + "." + comic.thumbnail.extension
                        }
                        alt={comic.title}
                      />
                    )}
                  </div>
                  <div className={styles.content}>
                    <button
                      className={styles.favorite}
                      onClick={() => {
                        handleFav(comic, index);
                        // console.log(comic._id);
                      }}
                    >
                      {isFavorite(comic._id) ? (
                        <FontAwesomeIcon
                          className={styles.favorite_active}
                          icon="fa-heart"
                        />
                      ) : (
                        <FontAwesomeIcon icon="fa-regular fa-heart" />
                      )}
                    </button>
                    <h2 className={styles.name}>{comic.title}</h2>
                    <button
                      className={styles.button}
                      onClick={() => {
                        navigate("/comic/" + comic._id);
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
        </div>
      )}
    </main>
  );
};
export default Comics;
