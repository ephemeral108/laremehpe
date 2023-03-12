import styles from "./Menu.module.css";
export function Menu(props) {
  return (
    <ul>
      {props.arr.map((val, seq) => (
        <li key={seq} className={styles.item}>
          {val}
        </li>
      ))}
    </ul>
  );
}
