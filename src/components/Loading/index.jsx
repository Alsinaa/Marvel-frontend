import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from "./index.module.css";

const Loading = () => {
  return (
    <div className={styles.loading}>
      <FontAwesomeIcon className={styles.icon} icon="fa-solid fa-spinner" />
    </div>
  );
};

export default Loading;
