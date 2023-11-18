import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

import noLogo from "../assets/no-logo.png";

const Favorites = () => {
  const favCharCookie = Cookies.get("FavCharact");
  const favComicsCookie = Cookies.get("FavComics");

  const navigate = useNavigate();

  return (
    <main>
      <div className="container">
        <h1>Mes favoris </h1>

        <section className="all-fav">
          <div>
            <h2>Vos personnages favoris</h2>
            <div className="fav-char">
              {favCharCookie
                ? JSON.parse(favCharCookie).map((elem) => {
                    return (
                      <div key={elem.id}>
                        <p>{elem.name}</p>
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
                      </div>
                    );
                  })
                : ""}
            </div>
          </div>

          <div>
            <h2>Vos comics favoris</h2>
            <div className="fav-comics">
              {favComicsCookie
                ? JSON.parse(favComicsCookie).map((elem) => {
                    // console.log("COMICS", myFav);
                    return (
                      <div key={elem.id}>
                        <p>{elem.title}</p>
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
                      </div>
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
