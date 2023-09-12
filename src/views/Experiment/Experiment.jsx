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
            cloud.createObj([{ ip: "127.0.0.1" }]).then((ip) => {
              setContent(ip);
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
