import styles from "./Menu.module.css";
import { goto } from "../../utils/common/common";
export function Menu(props) {
  function clickHandler(val) {
    props.setInputVal(val);
    goto(val);
  }
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
          onMouseDown={() => clickHandler(val)}
        >
          {val}
        </li>
      ))}
    </ul>
  );
}
