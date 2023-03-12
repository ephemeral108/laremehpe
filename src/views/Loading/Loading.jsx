import { useEffect } from "react";
import styles from "./Loading.module.css";

export function Loading() {
  useEffect(() => {
    setTimeout(() => {
      window.location =
        document.body.clientWidth >= 414 ? "#/computer" : "#/mobile";
    }, 2000);
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
