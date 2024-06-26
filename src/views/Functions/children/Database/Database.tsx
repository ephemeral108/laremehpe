import { Button, Input } from "antd";
import styles from "./Database.module.css";
import { useEffect, useState } from "react";
import { useBackendContext } from "../../../../context/Backend";

const HISTORY_KEY_NAME = "6507aba663372b4e216bf1b8";

export const Database = (): JSX.Element => {
  const { cloud } = useBackendContext();
  const [result, setResult] = useState<string>("");

  const [form, setForm] = useState({
    input1: "",
    input2: "",
    input3: "",
    input4: "",
    input5: "",
    input6: "",
    input7: "",
    input8: "",
    input9: "",
    input10: "",
  });
  const formHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const [history, setHistory] = useState<Array<string>>([]);

  useEffect(() => {
    (async () => {
      const his: string[] = (await cloud.getObj(HISTORY_KEY_NAME)).get("list");
      if (his) {
        setHistory(his);
      }
    })();
  }, []);

  const updateHistory = async (val: (prev: string[]) => string[]) => {
    const his: string[] = (await cloud.getObj(HISTORY_KEY_NAME)).get("list");
    if (his) {
      const res = val(his);
      cloud.setObj(HISTORY_KEY_NAME, { list: res });
      setHistory(res);
    }
  };
  const checkHistoryQuick = (queryKey: string) => {
    cloud
      .getObj(queryKey)
      .then((res) => {
        setResult(JSON.stringify(res));
      })
      .catch((err) => {
        setResult(JSON.stringify(err));
      });
  };

  return (
    <div className={styles.box}>
      <div>
        <Input
          name="input1"
          placeholder='{ "content": string[] } | { "list": any[] }'
          value={form.input1}
          onChange={formHandler}
        />
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
        <Input
          autoFocus
          name="input2"
          value={form.input2}
          onChange={formHandler}
        />
        <Button
          onClick={() => {
            if (form.input2.length === 0) return;
            cloud
              .getObj(form.input2)
              .then((res) => {
                const obj = res.toJSON();
                const jsObj = JSON.stringify(obj);
                setResult(jsObj);
                const checker = document.querySelector(
                  "input:checked"
                ) as HTMLInputElement | null;
                checker && (checker.checked = false);
                if (history.includes(form.input2)) return;
                // let arr = ;
                updateHistory((prev) => [...prev, form.input2]);
              })
              .catch((err) => {
                setResult((e) => {
                  return e + "===> error: " + JSON.stringify(err);
                });
              });
          }}
          type="primary"
        >
          check
        </Button>
      </div>

      <div className={styles.gap}>
        table name: (alter value)
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
            const obj: {
              [key: string]: any;
            } = {};
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
        table name:(add key)
        <Input name="input9" value={form.input9} onChange={formHandler} />
        key name:
        <Input name="input10" value={form.input10} onChange={formHandler} />
        <Button
          type="primary"
          onClick={() => {
            cloud
              .addKey(form.input9, form.input10)
              .then(() => {
                setResult("success");
              })
              .catch((err) => {
                setResult(JSON.stringify(err));
              });
          }}
        >
          add key
        </Button>
      </div>
      <div className={styles.gap}>
        table name:(remove key)
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
              updateHistory((his) => his.filter((val) => val !== form.input8));
            });
          }}
        >
          remove table
        </Button>
      </div>

      <div className={styles.gap}>
        ---------------------------------------------------------
        <p className={styles.result}>{result}</p>
        ---------------------------------------------------------
      </div>
      <div>
        history:
        <ul>
          {history.map((val, seq) => (
            <li
              key={seq}
              onTouchEnd={() => checkHistoryQuick(val)}
              onDoubleClick={() => checkHistoryQuick(val)}
              className={styles.listUnit}
            >
              <label>
                <input
                  type="radio"
                  name="queryKey"
                  style={{ display: "none" }}
                />
                <span>{val}</span>
              </label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
