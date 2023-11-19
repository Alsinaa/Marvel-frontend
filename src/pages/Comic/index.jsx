import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import wallpaper from "../../assets/comic-wallpaper.jpeg";

import Loading from "../../components/Loading";

import noLogo from "../../assets/no-logo.png";

import styles from "./index.module.css";

const Comic = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const { comicId } = useParams();
  // console.log(comicId);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://site--backend-marvel--fwbhzny5f6p7.code.run/comic/${comicId}`
        );
        // console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [comicId]);

  return (
    <main className="main">
      <img className="wallpaper-image" src={wallpaper} alt="wallpaper" />
      {isLoading ? (
        <Loading />
      ) : (
        <section className={styles.comic_info}>
          <div className={styles.image}>
            {data.thumbnail.path ===
            "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available" ? (
              <img src={noLogo} alt="" />
            ) : (
              <img
                src={data.thumbnail.path + "." + data.thumbnail.extension}
                alt={data.title}
              />
            )}
          </div>
          <div className={styles.content}>
            <h1 className={styles.title}>{data.title}</h1>
            <div className={styles.description}>
              {data.description === null ? (
                <p>Description coming soon !</p>
              ) : (
                <p>{data.description}</p>
              )}
            </div>
          </div>
        </section>
      )}
    </main>
  );
};
export default Comic;
