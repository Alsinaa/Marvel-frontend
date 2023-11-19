import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

import wallpaper from "../../assets/favoris-wallpaper.jpeg";
import noLogo from "../../assets/no-logo.png";

import styles from "./index.module.css";

const Favorites = () => {
  const favCharCookie = Cookies.get("FavCharact");
  const favComicsCookie = Cookies.get("FavComics");

  const navigate = useNavigate();

  return (
    <main className="main">
      <img className="wallpaper-image" src={wallpaper} alt="wallpaper" />
      <div className={styles.container}>
        <h1 className={styles.title}>Mes favoris </h1>

        <section className={styles.wrapper}>
          <div className={styles.section}>
            <h2 className={styles.section_title}>Mes personnages favoris</h2>
            <div className={styles.section_container}>
              {favCharCookie
                ? JSON.parse(favCharCookie).map((elem) => {
                    return (
                      <button key={elem.id} className={styles.element}>
                        {elem.picture ===
                        "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg" ? (
                          <img
                            src={noLogo}
                            alt=""
                            onClick={() => {
                              navigate("/character/" + elem.id);
                            }}
                          />
                        ) : (
                          <img
                            src={elem.picture}
                            alt={elem.name}
                            onClick={() => {
                              navigate("/character/" + elem.id);
                            }}
                          />
                        )}
                        <p>{elem.name}</p>
                      </button>
                    );
                  })
                : ""}
            </div>
          </div>

          <hr className={styles.separator} />

          <div className={styles.section}>
            <h2 className={styles.section_title}>Mes comics favoris</h2>
            <div className={styles.section_container}>
              {favComicsCookie
                ? JSON.parse(favComicsCookie).map((elem) => {
                    return (
                      <button key={elem.id} className={styles.element}>
                        {elem.picture ===
                        "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg" ? (
                          <img
                            src={noLogo}
                            alt=""
                            onClick={() => {
                              navigate("/comic/" + elem.id);
                            }}
                          />
                        ) : (
                          <img
                            src={elem.picture}
                            alt={elem.title}
                            onClick={() => {
                              navigate("/comic/" + elem.id);
                            }}
                          />
                        )}
                        <p>{elem.title}</p>
                      </button>
                    );
                  })
                : ""}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Favorites;
