import styles from "./Loading.module.css";
export function Loading() {
  return (
    <div className={styles.box}>
      <h1>
        {"Loading...".split("").map((val, seq) => (
          <span key={seq}>{val}</span>
        ))}
      </h1>
    </div>
  );
}
