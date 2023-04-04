import { useEffect, useState } from "react";
import styles from "./Extra.module.css";
// import { setVal } from "../../components/Toast/Toast";

interface memoItem {
  key: string;
}

type propsType = {
  show: boolean;
  inputText: string;
  cloud: {
    fetchMemo: () => Promise<{ get: (val: string) => Array<memoItem> }>;
    updateMemo: (val: Array<memoItem>) => void;
  };
};

let dataset: memoItem[] = [];

export function Extra(props: propsType): JSX.Element {
  const [memo, setMemo] = useState<Array<memoItem>>([
    {
      key: "loading...",
    },
  ]);

  useEffect(() => {
    const init = async () => {
      setMemo((await props.cloud.fetchMemo()).get("list"));
    };
    init();
  }, []);

  function add(): void {
    setMemo((dataset) => {
      const data = [
        ...dataset,
        {
          key: props.inputText,
        },
      ];
      props.cloud.updateMemo(data);
      return data;
    });
  }

  function remove(val: number): void {
    const res = confirm("delete " + memo[val].key + " ?");
    if (!res) return;
    setMemo((dataset) => {
      const data = [...dataset].filter((a, b) => b != val);
      props.cloud.updateMemo(data);
      return data;
    });
  }

  return props.show ? (
    <ul className={styles.Extra}>
      {memo.map((val, seq) => (
        <li key={val.key + seq} onClick={() => remove(seq)}>
          {val.key}
        </li>
      ))}
      <li>{props.inputText !== "" && <button onClick={add}>add</button>}</li>
    </ul>
  ) : (
    <></>
  );
}
