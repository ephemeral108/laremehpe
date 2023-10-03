import { Button, Input, Space } from "antd";
import styles from "./Eval.module.css";
import { useEffect, useRef, useState } from "react";

export const Eval = (): JSX.Element => {
  const [items, setItems] = useState<Array<{ time: string }>>([]);
  const [res, setRes] = useState<string>("");

  const [clipboardText, setClipboardText] = useState("");

  useEffect(() => {
    setItems([{ time: new Date().valueOf().toString() }]);

    const handleFocus = () => {
      navigator.clipboard.readText().then((res) => {
        setClipboardText(res);
      });
    };

    window.addEventListener("focus", handleFocus);

    return () => {
      window.removeEventListener("focus", handleFocus);
    };
  }, []);

  return (
    <div className={styles.box}>
      {items.map((val) => (
        <div key={val.time}>
          <EvalItem
            mark={val.time}
            remove={(e) => setItems(items.filter((val) => val.time !== e))}
            setResult={(e) => {
              setRes(e);
              navigator.clipboard.writeText(e);
            }}
            update={(e) => setClipboardText(e)}
          />
        </div>
      ))}

      <Button
        type="primary"
        onClick={() => {
          setItems((e) => [...e, { time: new Date().valueOf().toString() }]);
        }}
      >
        add
      </Button>
      <div style={{ marginTop: "20px" }}>
        <h3>tips:</h3>
        <span>
          the function you provide, must accept clipboard text as parameter, and
          return values that is text format
        </span>
      </div>
      <div style={{ marginTop: "20px" }}>
        <h3>Result:</h3>
        <p>{clipboardText}</p>
        <p>-----------------------------------------------</p>
        <p>{res}</p>
      </div>
    </div>
  );
};

const template = `e=>{

    return e
  }`;

const EvalItem = (props: {
  mark: string;
  remove: (val: string) => void;
  setResult: (val: string) => void;
  update: (val: string) => void;
}): JSX.Element => {
  const { TextArea } = Input;
  const [text, setText] = useState(template);
  const textRef = useRef(null);
  return (
    <div className={styles.evalItem}>
      <Space.Compact block direction="vertical">
        <TextArea
          rows={8}
          value={text}
          onChange={(e) => setText(e.target.value)}
          ref={textRef}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => {
              navigator.clipboard.readText().then((res) => {
                props.setResult(eval(text)(res));
                props.update(res);
              });
            }}
          >
            execute
          </Button>
          <Button
            onClick={() => {
              setText(template);
              textRef.current && (textRef.current as HTMLInputElement).focus();
            }}
          >
            clear
          </Button>
          <Button onClick={() => props.remove(props.mark)}>remove</Button>
        </Space>
      </Space.Compact>
    </div>
  );
};
