import { useState } from "react";
import styles from "./Experiment.module.css";

export function Experiment() {
  const [val, setVal] = useState([]);

  async function foo() {}

  return (
    <div className={styles.box}>
      <button onClick={foo}>button</button>
      <button onClick={() => setVal([])}>clear</button>
      <h1>{val.join(<br />)}</h1>
    </div>
  );
}
