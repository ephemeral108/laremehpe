import styles from "./NotFound.module.css";
export function NotFound() {
  return (
    <div className={styles.box}>
      <h1>
        You seems lost, maybe you could <a href="#/loading">go back</a> !
      </h1>
    </div>
  );
}
