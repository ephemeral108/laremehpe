import styles from "./Menu.module.css";
import { goto } from "../../utils/common/common";

function clickHandler(val) {
  alert("click", val);
  goto(val);
}

export function Menu(props) {
  return (
    <ul className={styles.ul} onMouseLeave={props.onLeave}>
      {props.arr.map((val, seq) => (
        <li
          key={val}
          className={[
            styles.item,
            props.chosen === seq ? styles.chosen : "",
          ].join(" ")}
          onMouseMove={() => props.updateChosen(seq)}
          onClick={() => clickHandler(val)}
        >
          {val}
        </li>
      ))}
    </ul>
  );
}
