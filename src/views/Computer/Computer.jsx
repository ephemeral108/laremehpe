import styles from "./Computer.module.css";
import { setVal } from "../../components/Toast/Toast";
import { Menu } from "../../components/Menu/Menu";
import { useEffect } from "react";

export function Computer() {
  useEffect(() => {
    setVal("Welcom back!");
  }, []);
  let arr = ["123456", "123456", "123456", "123456"];
  return (
    <div className={styles.box}>
      <img src="/wallpaper2.png" alt="wallpaper" className={styles.wallpaper} />
      <div className={styles.headBox}></div>
      <div className={styles.logo}>
        <img src="/icon.png" alt="logo" title="stop and stare" />
      </div>
      <div className={styles.frame}>
        <input type="text" placeholder="Never stop learning..." autoFocus />
        <img src="/search.svg" alt="search logo" />
        <div className={styles.menu}>
          <Menu arr={arr} />
        </div>
      </div>
    </div>
  );
}
