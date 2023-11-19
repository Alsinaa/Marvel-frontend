import styles from "./index.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ResearchBar = ({ setName, setCounter, setSkip }) => {
  return (
    <div className={styles.researchBar}>
      <FontAwesomeIcon
        className={styles.icon}
        icon="fa-solid fa-magnifying-glass"
      />
      <input
        className={styles.input}
        type="text"
        placeholder="ex: Thor"
        onChange={(event) => {
          setName(event.target.value);
          setCounter(1);
          setSkip(0);
        }}
      />
    </div>
  );
};
export default ResearchBar;
