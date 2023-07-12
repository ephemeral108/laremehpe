import React, { useState } from "react";
import { Input } from "antd";
import styles from "./Base64Converter.module.css";
import _ from "lodash";
import { Base64 } from "js-base64";

export const Base64Converter = () => {
  const { TextArea } = Input;
  const [output, setOutput] = useState<string>();
  return (
    <div className={styles.box}>
      <TextArea
        showCount
        style={{ height: 120, resize: "none" }}
        onChange={_.debounce(function (e) {
          setOutput(Base64.decode(e.target.value));
        }, 1000)}
        placeholder="input"
      />
      <TextArea
        showCount
        value={output}
        style={{ height: 120, resize: "none" }}
        placeholder="output"
      />
    </div>
  );
};
