import styles from "./Index.module.css";
export function Index() {
  return (
    <div className={styles.box}>
      <div className={styles.frame}>
        <input type="text" placeholder="Never stop learning..." />
        <img src="/search.svg" alt="search logo" />
      </div>
    </div>
  );
}
