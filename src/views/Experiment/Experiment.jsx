import styles from "./Experiment.module.css";
import { Button } from "antd";
import { useState } from "react";
import { useBackendContext } from "../../context/Backend";

export function Experiment() {
  const { cloud } = useBackendContext();
  const [content, setContent] = useState("");
  return (
    <div className={styles.box}>
      <div>
        <Button
          className={styles.back}
          type="primary"
          onClick={() => {
            history.back();
          }}
        >
          back
        </Button>
        <Button
          onClick={() => {
            // cloud.createObj({});
            cloud.paste("test" + new Date().valueOf()).then((sus) => {
              console.log("success");
              cloud.copy().then((txt) => {
                console.log("copy", txt.get("content"));
              });
            });
          }}
          type="primary"
        >
          create obj
        </Button>
      </div>
      <div>
        <p>Result: {content}</p>
      </div>
    </div>
  );
}
