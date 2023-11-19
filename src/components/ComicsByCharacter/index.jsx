import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Loading from "../Loading";

import noLogo from "../../assets/no-logo.png";

import styles from "./index.module.css";

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

  return (
    <div className={styles.container}>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {data.comics.map((comics) => {
            return (
              <button
                className={styles.comic}
                key={comics._id}
                onClick={() => {
                  navigate("/comic/" + comics._id);
                }}
              >
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
              </button>
            );
          })}
        </>
      )}
    </div>
  );
};

export default ComicsByCharacter;
