import styles from "./Menu.module.css";
let chosen = -1;
export function Menu(props) {
  // function clickHandler(val) {
  //   props.setInputVal(val);
  //   setTimeout(() => {
  //     // goto(val);
  //   }, 0);
  // }
  return (
    <ul className={styles.ul} onMouseLeave={props.onLeave}>
      {props.arr.map((val, seq) => (
        <li
          key={val}
          className={[
            styles.item,
            props.chosen === seq ? styles.chosen : "",
          ].join(" ")}
          onMouseMove={() =>
            chosen != seq ? ((chosen = seq), props.updateChosen(seq)) : ""
          }
          // onMouseEnter={() =>
          //   chosen != seq ? ((chosen = seq), props.updateChosen(seq)) : ""
          // }
          onMouseDown={() => props.clickItem(val)}
        >
          {val}
        </li>
      ))}
    </ul>
  );
}
