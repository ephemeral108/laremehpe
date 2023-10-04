import { Button, Input } from "antd";
import styles from "./Database.module.css";
import { useEffect, useRef, useState } from "react";
import { useBackendContext } from "../../../../context/Backend";

export const Database = (): JSX.Element => {
  const { cloud } = useBackendContext();
  const [result, setResult] = useState<string>("");
  /*  const [input1, setInput1] = useState<string>("");
  const [input2, setInput2] = useState<string>("");
  const [input3, setInput3] = useState<string>("");
  const [input4, setInput4] = useState<string>("");
  const [input5, setInput5] = useState<string>("");
  const [input6, setInput6] = useState<string>("");
  const [input7, setInput7] = useState<string>("");
  const [input8, setInput8] = useState<string>("");
*/
  const [form, setForm] = useState({
    input1: "",
    input2: "",
    input3: "",
    input4: "",
    input5: "",
    input6: "",
    input7: "",
    input8: "",
  });
  const formHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const [history, setHistory] = useState<Array<string>>([]);

  useEffect(() => {
    (async () => {
      const his: string[] = (
        await cloud.getObj("6507aba663372b4e216bf1b8")
      ).get("list");
      if (his) {
        console.log(his);
        setHistory(his);
      }
    })();
  }, []);

  /*useEffect(() => {
    localStorage.setItem("check_history", history.join("|"));
  }, [history]);*/

  return (
    <div className={styles.box}>
      <div>
        <Input name="input1" value={form.input1} onChange={formHandler} />
        <Button
          onClick={() => {
            let obj;
            try {
              obj = JSON.parse(form.input1);
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
        <Input name="input2" value={form.input2} onChange={formHandler} />
        <Button
          onClick={() => {
            if (form.input2.length === 0) return;
            cloud
              .getObj(form.input2)
              .then((res) => {
                setResult(JSON.stringify(res));
                if (history.includes(form.input2)) return;
                setHistory((prev) => {
                  let arr = [...prev, form.input2];
                  cloud.setObj("6507aba663372b4e216bf1b8", { list: arr });
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
          name="input5"
          value={form.input5}
          onChange={formHandler}
        />
        key:
        <Input
          defaultValue=""
          name="input3"
          value={form.input3}
          onChange={formHandler}
        />
        val:
        <Input
          defaultValue="{}"
          name="input4"
          value={form.input4}
          onChange={formHandler}
        />
        <Button
          onClick={() => {
            if (
              form.input3.length <= 1 ||
              form.input4.length <= 1 ||
              form.input5.length <= 1
            ) {
              setResult("please check form");
              return;
            }
            const obj = {};
            try {
              obj[form.input3] = JSON.parse(form.input4);
            } catch (err) {
              obj[form.input3] = form.input4;
            }
            cloud
              .setObj(form.input5, obj)
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
        <Input name="input6" value={form.input6} onChange={formHandler} />
        key name:
        <Input name="input7" value={form.input7} onChange={formHandler} />
        <Button
          type="primary"
          onClick={() => {
            cloud
              .delKey(form.input6, form.input7)
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
        <Input name="input8" value={form.input8} onChange={formHandler} />
        <Button
          type="primary"
          onClick={() => {
            cloud.delTable(form.input8).then(() => {
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
