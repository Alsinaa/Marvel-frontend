import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

import noLogo from "../assets/no-logo.png";

const CharacterDetails = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const { characterId } = useParams();
  //   console.log(characterId);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://site--backend-marvel--fwbhzny5f6p7.code.run/character/${characterId}`
        );
        console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [characterId]);

  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <main>
      <Link to={"/characters"}>Retour</Link>

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
export default CharacterDetails;
