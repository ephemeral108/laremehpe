import { Button, Input, Space } from "antd";
import styles from "./Eval.module.css";
import { useEffect, useRef, useState } from "react";
import { useBackendContext } from "../../../../context/Backend";
import { copyText } from "../../../../utils/common/copy";

let table = "650269df63372b4e2163c86f";
const template = `


return e;`;

export const Eval = (): JSX.Element => {
  const [items, setItems] = useState<Array<{ time: string; text: string }>>([]);
  const [res, setRes] = useState<string>("");
  const { cloud } = useBackendContext();
  const [clipboardText, setClipboardText] = useState("");
  const [visibilitychange, setVisibilitychange] = useState<boolean>(false);

  useEffect(() => {
    //
    cloud.getObj(table).then((res) => {
      let arr = res.get("list");
      if (arr.length === 0) {
        setItems([{ time: new Date().valueOf().toString(), text: template }]);
        return;
      }
      setItems(arr);
    });

    const handleFocus = () => {
      navigator.clipboard.readText().then((res) => {
        setClipboardText(res);
      });
      setVisibilitychange((val) => !val);
    };

    window.addEventListener("visibilitychange", handleFocus);

    return () => {
      window.removeEventListener("visibilitychange", handleFocus);
    };
  }, []);

  return (
    <div className={styles.box}>
      {items.map((val) => (
        <div key={val.time}>
          <EvalItem
            mark={val.time}
            defaultText={val.text}
            remove={(e) => {
              cloud
                .getObj(table)
                .then((res) => {
                  let arr = res.get("list");
                  let result = arr.filter((el: any) => el.time != val.time);
                  console.log("remove:", result);
                  cloud.setObj(table, { list: result });
                })
                .then((_) => {
                  setItems(items.filter((val) => val.time !== e));
                });
            }}
            setResult={(e) => {
              setRes(e);
              navigator.clipboard.writeText(e);
            }}
            update={(e) => setClipboardText(e)}
            save={(text) => {
              cloud.getObj(table).then((res) => {
                let arr = res.get("list");
                let result = arr.filter((el: any) => el.time != val.time);
                result.push({
                  time: val.time,
                  text,
                });
                console.log("push:", result);
                cloud.setObj(table, { list: result });
              });
            }}
            visibilitychange={visibilitychange}
          />
        </div>
      ))}

      <Button
        type="primary"
        onClick={() => {
          setItems((e) => [
            ...e,
            { time: new Date().valueOf().toString(), text: template },
          ]);
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
        <h3 onClick={() => copyText(clipboardText)}>Result:</h3>
        <p>{clipboardText}</p>
        <p>-----------------------------------------------</p>
        <p>{res}</p>
      </div>
    </div>
  );
};

const EvalItem = (props: {
  mark: string;
  save: (val: string) => void;
  remove: (val: string) => void;
  setResult: (val: string) => void;
  update: (val: string) => void;
  defaultText: string;
  visibilitychange: boolean;
}): JSX.Element => {
  const { TextArea } = Input;
  const [customInput, setCustomInput] = useState<string>("");
  const [text, setText] = useState(props.defaultText);
  const textRef = useRef(null);

  const evalJs = (res: string) => {
    props.setResult(eval("let foo = (e) =>{" + text + "}; foo(`" + res + "`)"));
    props.update(res);
  };

  useEffect(() => {
    setCustomInput("");
  }, [props.visibilitychange]);

  return (
    <div className={styles.evalItem}>
      <Space.Compact block direction="vertical">
        <Space>
          <Input
            value={customInput}
            onChange={(e) => setCustomInput(e.target.value)}
          />
          &nbsp; e =&gt;
        </Space>
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
              if ("" !== customInput) {
                evalJs(customInput);
                return;
              }
              navigator.clipboard.readText().then(evalJs);
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
          <Button onClick={() => props.save(text)}>save</Button>
        </Space>
      </Space.Compact>
    </div>
  );
};
