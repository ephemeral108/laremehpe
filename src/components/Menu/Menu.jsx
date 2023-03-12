import styles from "./Menu.module.css";
export function Menu(props) {
  return (
    <ul className={styles.ul}>
      {props.arr.map((val, seq) => (
        <li key={seq} className={styles.item}>
          {val}
        </li>
      ))}
    </ul>
  );
}
