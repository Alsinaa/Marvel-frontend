import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import noLogo from "../assets/no-logo.png";

const Comic = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const { comicId } = useParams();
  console.log(comicId);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://site--backend-marvel--fwbhzny5f6p7.code.run/comic/${comicId}`
        );
        console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [comicId]);

  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <main>
      <section className="comic-info">
        {data.thumbnail.path ===
        "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available" ? (
          <img src={noLogo} alt="Spider-Man 2" />
        ) : (
          <img
            src={data.thumbnail.path + "." + data.thumbnail.extension}
            alt={data.title}
          />
        )}
        <div>
          <h1>{data.title}</h1>
          {data.description === null ? (
            <p>Description coming soon !</p>
          ) : (
            <p>{data.description}</p>
          )}
        </div>
      </section>
    </main>
  );
};
export default Comic;
