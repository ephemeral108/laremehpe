import { useEffect } from "react";
import styles from "./Loading.module.css";

export function Loading() {
  useEffect(() => {
    window.location.href = "#/index";
  }, []);

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
