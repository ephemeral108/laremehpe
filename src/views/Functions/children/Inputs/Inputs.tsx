import { Button, Input, Space } from "antd";
import styles from "./Inputs.module.css";
import { useBackendContext } from "../../../../context/Backend";
import { useState } from "react";
import { setVal } from "../../../../components/Toast/Toast";

export const Inputs = (): JSX.Element => {
  const { TextArea } = Input;
  const { cloud } = useBackendContext();
  const [text, setText] = useState<string>("");

  return (
    <div className={styles.box}>
      <TextArea
        autoFocus
        showCount
        style={{ height: "85%", width: "90vw", minHeight: "80%" }}
        placeholder="never stop learning..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <Space className={styles.buts}>
        <Button
          type="primary"
          onClick={() => {
            cloud.paste(text);
            setVal && setVal("success!");
          }}
        >
          save
        </Button>
        <Button
          type="primary"
          onClick={() => {
            cloud.copy().then((res) => {
              setText((res as any).get("content"));
            });
          }}
        >
          restore
        </Button>

        <Button
          onClick={() => {
            setText("");
          }}
        >
          clear
        </Button>
      </Space>
    </div>
  );
};
