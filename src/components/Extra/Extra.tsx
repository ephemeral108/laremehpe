import { useEffect, useState } from "react";
import styles from "./Extra.module.css";
import { setVal } from "../../components/Toast/Toast";

interface memoItem {
  key: string;
}

type propsType = {
  show: boolean;
  inputText: string;
};

let dataset: memoItem[] = [];

let init: () => void;

async function fetchData(): Promise<memoItem[]> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(dataset);
    }, 500);
  });
}

async function removeData(val: number) {
  return new Promise<void>((resolve, reject) => {
    setTimeout(() => {
      setVal("remove successfully!");
      resolve();
    }, 1000);
  });
}

// async function addData(val: string) {}

async function remove(val: number): Promise<void> {
  confirm("delete " + dataset[val].key + " ?") && (await removeData(val));
  dataset = [...dataset].filter((a, b) => b != val);
  init();
}

export function Extra(props: propsType): JSX.Element {
  const [memo, setMemo] = useState<Array<memoItem>>([
    {
      key: "loading...",
    },
  ]);

  useEffect(() => {
    init = async () => {
      setMemo(await fetchData());
    };
    init();
  }, []);

  function add(): void {
    dataset = [
      ...dataset,
      {
        key: props.inputText,
      },
    ];
    init();
  }

  return props.show ? (
    <ul className={styles.Extra}>
      {memo.map((val, seq) => (
        <li key={val.key} onClick={() => remove(seq)}>
          {val.key}
        </li>
      ))}
      <li>{props.inputText !== "" && <button onClick={add}>add</button>}</li>
    </ul>
  ) : (
    <></>
  );
}
