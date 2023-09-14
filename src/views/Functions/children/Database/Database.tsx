import { Button, Input } from "antd";
import styles from "./Database.module.css";
import { useEffect, useRef, useState } from "react";
import { useBackendContext } from "../../../../context/Backend";

export const Database = (): JSX.Element => {
  const { cloud } = useBackendContext();
  const [result, setResult] = useState<string>("");
  const [input1, setInput1] = useState<string>("");
  const [input2, setInput2] = useState<string>("");
  const [input3, setInput3] = useState<string>("");
  const [input4, setInput4] = useState<string>("");
  const [input5, setInput5] = useState<string>("");
  const [input6, setInput6] = useState<string>("");
  const [input7, setInput7] = useState<string>("");
  const [input8, setInput8] = useState<string>("");
  const [history, setHistory] = useState<Array<string>>([]);

  useEffect(() => {
    const his = localStorage.getItem("check_history");
    if (his) {
      setHistory(his.split("|"));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("check_history", history.join("|"));
  }, [history]);

  return (
    <div className={styles.box}>
      <div>
        <Input
          value={input1}
          onChange={(e) => {
            setInput1(e.target.value);
          }}
        />
        <Button
          onClick={() => {
            let obj;
            try {
              obj = JSON.parse(input1);
            } catch (e) {
              setResult("error: cannot parse the object");
            }

            cloud
              .createObj(obj)
              .then((ip) => {
                setResult(ip.id);
              })
              .catch((err) => {
                setResult(JSON.stringify(err));
              });
          }}
          type="primary"
        >
          create
        </Button>
      </div>
      <div className={styles.gap}>
        <Input
          value={input2}
          onChange={(e) => {
            setInput2(e.target.value);
          }}
        />
        <Button
          onClick={() => {
            if (input2.length === 0) return;
            cloud
              .getObj(input2)
              .then((res) => {
                setResult(JSON.stringify(res));
                setHistory((his) => {
                  if (his.includes(input2)) return his;
                  let arr = [input2, ...his];
                  if (arr.length > 10) {
                    arr = arr.slice(arr.length - 11, arr.length - 1);
                  }
                  return arr;
                });
              })
              .catch((err) => {
                setResult(JSON.stringify(err));
              });
          }}
          type="primary"
        >
          check
        </Button>
      </div>

      <div className={styles.gap}>
        table name:
        <Input
          defaultValue=""
          value={input5}
          onChange={(e) => {
            setInput5(e.target.value);
          }}
        />
        key:
        <Input
          defaultValue=""
          value={input3}
          onChange={(e) => {
            setInput3(e.target.value);
          }}
        />
        val:
        <Input
          defaultValue="{}"
          value={input4}
          onChange={(e) => {
            setInput4(e.target.value);
          }}
        />
        <Button
          onClick={() => {
            if (
              input3.length <= 1 ||
              input4.length <= 1 ||
              input5.length <= 1
            ) {
              setResult("please check form");
              return;
            }
            const obj = {};
            try {
              obj[input3] = JSON.parse(input4);
            } catch (err) {
              obj[input3] = input4;
            }
            cloud
              .setObj(input5, obj)
              .then(() => {
                setResult("success!");
              })
              .catch((err) => {
                setResult(JSON.stringify(err));
              });
          }}
          type="primary"
        >
          alter
        </Button>
      </div>

      <div className={styles.gap}>
        table name:
        <Input
          value={input6}
          onChange={(e) => {
            setInput6(e.target.value);
          }}
        />
        key name:
        <Input
          value={input7}
          onChange={(e) => {
            setInput7(e.target.value);
          }}
        />
        <Button
          type="primary"
          onClick={() => {
            cloud
              .delKey(input6, input7)
              .then(() => {
                setResult("success");
              })
              .catch((err) => {
                setResult(JSON.stringify(err));
              });
          }}
        >
          remove key
        </Button>
      </div>
      <div className={styles.gap}>
        table name:
        <Input
          value={input8}
          onChange={(e) => {
            setInput8(e.target.value);
          }}
        />
        <Button
          type="primary"
          onClick={() => {
            cloud.delTable(input8).then(() => {
              setResult("success");
            });
          }}
        >
          remove table
        </Button>
      </div>

      <div className={styles.gap}>
        ---------------------------------------------------------
        <p>{result}</p>
        ---------------------------------------------------------
      </div>
      <div>
        history:
        <ul>
          {history.map((val, seq) => (
            <li key={seq}>{val}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};
