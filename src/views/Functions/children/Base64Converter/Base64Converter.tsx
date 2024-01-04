import React, { useState } from "react";
import { Button, Input } from "antd";
import styles from "./Base64Converter.module.css";
import _ from "lodash";
import { Base64 } from "js-base64";

const initState = {
  encode: "",
  decode: "",
};

export const Base64Converter = () => {
  const { TextArea } = Input;
  // const [output, setOutput] = useState<string>();
  const [res, setRes] = useState<typeof initState>(initState);
  return (
    <div className={styles.box}>
      <TextArea
        showCount
        autoFocus
        style={{ height: 120, resize: "none" }}
        onChange={_.debounce(function (e) {
          // setOutput(Base64.decode(e.target.value));
          const res = {
            encode: "",
            decode: "",
          };
          try {
            res.decode = Base64.decode(e.target.value);
          } catch (e) {
          } finally {
            try {
              res.encode = Base64.encode(e.target.value);
            } catch (e) {
            } finally {
              setRes(res);
            }
          }
        }, 1000)}
        placeholder="input"
      />

      <div>
        <Button
          type="primary"
          onClick={() => {
            navigator.clipboard.writeText(res.encode);
          }}
        >
          copy
        </Button>
        <TextArea
          showCount
          value={res.encode}
          style={{ height: 120, resize: "none" }}
          placeholder="output"
          disabled
        />
      </div>

      <div>
        <Button
          type="primary"
          onClick={() => {
            navigator.clipboard.writeText(res.decode);
          }}
        >
          copy
        </Button>
        <TextArea
          showCount
          value={res.decode}
          style={{ height: 120, resize: "none" }}
          placeholder="output"
          disabled
        />
      </div>
    </div>
  );
};
