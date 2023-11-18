import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

import noLogo from "../assets/no-logo.png";

const ComicsByCharacter = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { characterId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://site--backend-marvel--fwbhzny5f6p7.code.run/comics/${characterId}`
        );
        // console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, [characterId]);

  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <main>
      <Link to={"/comics"}>Retour</Link>

      <div className="container">
        <div className="comics-character">
          <div>
            <h1>Comics liés à {data.name} </h1>

            {data.thumbnail.path ===
              "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available" ||
            data.thumbnail.path ===
              "http://i.annihil.us/u/prod/marvel/i/mg/f/60/4c002e0305708" ? (
              <img
                src={noLogo}
                alt=""
                onClick={() => {
                  navigate("/character/" + data._id);
                }}
              />
            ) : (
              <img
                src={data.thumbnail.path + "." + data.thumbnail.extension}
                alt={data.name}
                onClick={() => {
                  navigate("/character/" + data._id);
                }}
              />
            )}
          </div>

          <div>
            {data.comics.map((comics) => {
              return (
                <div
                  key={comics._id}
                  onClick={() => {
                    navigate("/comic/" + comics._id);
                  }}
                >
                  <p>{comics.title}</p>

                  {comics.thumbnail.path ===
                  "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available" ? (
                    <img src={noLogo} alt="" />
                  ) : (
                    <img
                      src={
                        comics.thumbnail.path + "." + comics.thumbnail.extension
                      }
                      alt={comics.title}
                    />
                  )}

                  <p>{comics.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
};

export default ComicsByCharacter;
