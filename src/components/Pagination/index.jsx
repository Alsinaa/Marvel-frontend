import styles from "./index.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Pagination = ({
  counter,
  limit,
  setCounter,
  skip,
  setSkip,
  totalPage,
}) => {
  return (
    <section className={styles.pagination}>
      <div className={styles.content}>
        <button
          className={counter === 1 ? styles.buttonDesact : styles.button}
          onClick={() => {
            setCounter(counter - 1);
            setSkip(skip - limit);
          }}
        >
          <FontAwesomeIcon icon="fa-solid fa-circle-arrow-left" />
        </button>
        <p className={styles.counter}>
          {counter} / {totalPage}
        </p>
        <button
          className={
            counter === totalPage ? styles.buttonDesact : styles.button
          }
          onClick={() => {
            setCounter(counter + 1);
            setSkip(skip + limit);
          }}
        >
          <FontAwesomeIcon icon="fa-solid fa-circle-arrow-right" />
        </button>
      </div>
      <div className={styles.page}>
        <input
          className={styles.input}
          type="number"
          id="number"
          min="1"
          max={totalPage}
          placeholder="..."
          onChange={(event) => {
            if (event.target.value > 0 && event.target.value <= totalPage) {
              setCounter(Number(event.target.value));
              setSkip((event.target.value - 1) * limit);
            }
          }}
        />
      </div>
    </section>
  );
};

export default Pagination;
