import styles from "./TestButton.module.css";
import { addMes } from "../FixedToast/FixedToast";
let index = 0;
const foo = () => {
  index++;
  addMes("this is a test " + index);
};
export function TestButton() {
  return (
    <button onClick={foo} className={styles.bu}>
      Test
    </button>
  );
}
