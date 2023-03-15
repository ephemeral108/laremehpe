import styles from "./Experiment.module.css";

function foo() {
  prompt("foo");
}

export function Experiment() {
  return (
    <div className={styles.box}>
      <button onClick={foo}>button</button>
      <input type="text" autoFocus id="test" />
    </div>
  );
}
