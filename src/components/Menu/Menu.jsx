import styles from "./Menu.module.css";
import { goto } from "../../utils/common/common";

export function Menu(props) {
  return (
    <ul className={styles.ul} onMouseLeave={props.onLeave}>
      {props.arr.map((val, seq) => (
        <li
          key={seq}
          className={[
            styles.item,
            props.chosen === seq ? styles.chosen : "",
          ].join(" ")}
          onMouseMove={() => props.updateChosen(seq)}
          onClick={() => goto(val)}
        >
          {val}
        </li>
      ))}
    </ul>
  );
}
