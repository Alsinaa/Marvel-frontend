import { Link } from "react-router-dom";
import wallpaper from "../../assets/home-wallpaper.jpeg";

import styles from "./index.module.css";

const Home = () => {
  return (
    <main className={styles.wrapper}>
      <img className="wallpaper-image" src={wallpaper} alt="wallpaper" />
      <Link className={styles.element} to="/characters">
        <p>Personnages</p>
      </Link>
      <Link className={styles.element} to="/comics">
        <p>Comics</p>
      </Link>
    </main>
  );
};
export default Home;
