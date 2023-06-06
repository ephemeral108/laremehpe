import { Input } from "antd";
import styles from "./Inputs.module.css";

export const Inputs = (): JSX.Element => {
  const { TextArea } = Input;
  return (
    <div className={styles.box}>
      <TextArea
        showCount
        maxLength={2000}
        style={{ height: "90vh", width: "90vw", resize: "none" }}
        placeholder="disable resize"
      />
    </div>
  );
};
