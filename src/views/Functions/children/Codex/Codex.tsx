import { useEffect, useState } from "react";
import { Button, Input, Radio } from "antd";
import styles from "./Codex.module.css";
import _, { escape, unescape } from "lodash";
import { Base64 } from "js-base64";

const converter = (type: number) => {
  return [
    {
      //base64
      encode: (value: string) => {
        return Base64.encode(value);
      },
      decode: (value: string) => {
        return Base64.decode(value);
      },
    },
    {
      //url encodeURI
      encode: (value: string) => {
        return encodeURIComponent(value);
      },
      decode: (value: string) => {
        return decodeURIComponent(value);
      },
    },
    {
      //url escape
      encode: (value: string) => {
        return escape(value);
      },
      decode: (value: string) => {
        return unescape(value);
      },
    },
  ][type];
};

export const Codex = () => {
  const { TextArea } = Input;
  const [form, setForm] = useState<{
    type: 0 | 1 | 2;
    input: string;
    output: {
      encode: string;
      decode: string;
    };
  }>({
    type: 0,
    input: "",
    output: {
      encode: "",
      decode: "",
    },
  });

  useEffect(() => {
    const con = converter(form.type);
    let encode = "",
      decode = "";
    try {
      encode = con.encode(form.input);
    } catch (err) {
      console.log("cannot encode");
    }

    try {
      decode = con.decode(form.input);
    } catch (err) {
      console.log("cannot decode");
    }

    setForm({
      ...form,
      output: {
        encode,
        decode,
      },
    });
  }, [form.type, form.input]);
  return (
    <div className={styles.box}>
      <div className={styles.radioBox}>
        <Radio.Group
          onChange={(e) =>
            setForm({
              ...form,
              type: e.target.value,
            })
          }
          value={form.type}
        >
          <Radio value={0}>base64 codex</Radio>
          <Radio value={1}>url codex</Radio>
          <Radio value={2}>escape</Radio>
        </Radio.Group>
      </div>
      <TextArea
        showCount
        autoFocus
        style={{ height: 120, resize: "none" }}
        onChange={_.debounce(function (e) {
          setForm({
            ...form,
            input: e.target.value,
          });
        }, 1000)}
        placeholder="input"
      />

      <div>
        <Button
          type="primary"
          onClick={() => {
            navigator.clipboard.writeText(form.output.encode);
          }}
        >
          copy
        </Button>
        <TextArea
          showCount
          value={form.output.encode}
          style={{ height: 120, resize: "none" }}
          placeholder="output"
          disabled
        />
      </div>

      <div>
        <Button
          type="primary"
          onClick={() => {
            navigator.clipboard.writeText(form.output.decode);
          }}
        >
          copy
        </Button>
        <TextArea
          showCount
          value={form.output.decode}
          style={{ height: 120, resize: "none" }}
          placeholder="output"
          disabled
        />
      </div>
    </div>
  );
};
