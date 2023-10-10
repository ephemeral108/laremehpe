import { Button, Input } from "antd";
import styles from "./UrlEncoder.module.css";
import { useEffect, useState } from "react";

const initState = {
  text: "",
  encode: "",
  decode: "",
};

export const UrlEncoder = () => {
  const [form, setForm] = useState<typeof initState>(initState);

  const changeInputs = (e) => {
    setForm((entry) => {
      return {
        ...entry,
        [e.target.name]: e.target.value,
      };
    });
  };

  useEffect(() => {
    setForm((e) => {
      let encode, decode;
      try {
        encode = encodeURIComponent(form.text);
      } catch (e) {
      } finally {
        try {
          decode = decodeURIComponent(form.text);
        } catch (e) {
        } finally {
          return {
            ...e,
            encode,
            decode,
          };
        }
      }
    });
  }, [form.text]);

  return (
    <div className={styles.box}>
      <Input name="text" value={form.text} onChange={changeInputs} />
      <div className={styles.flex}>
        <label htmlFor="encode">encode:</label>
        <Input name="encode" value={form.encode} onChange={changeInputs} />
        <Button
          type="primary"
          onClick={() => {
            try {
              navigator.clipboard.writeText(form.encode);
            } catch (e) {}
          }}
        >
          copy
        </Button>
      </div>
      <div className={styles.flex}>
        <label htmlFor="decode">decode:</label>
        <Input name="decode" value={form.decode} onChange={changeInputs} />
        <Button
          type="primary"
          onClick={() => {
            try {
              navigator.clipboard.writeText(form.decode);
            } catch (e) {}
          }}
        >
          copy
        </Button>
      </div>
    </div>
  );
};
