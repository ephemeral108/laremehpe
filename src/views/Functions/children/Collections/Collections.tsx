import { useEffect, useState } from "react";
import styles from "./Collection.module.css";
import { getKeywordList } from "../../../../utils/common/common";

const Item = (props: { entry: { key: string; url: string; name: string } }) => {
  return (
    <a
      className={styles.entry}
      href={props.entry.url}
      title={props.entry.url}
      key={props.entry.key}
    >
      <div className={styles.top}>{props.entry.name}</div>
      <div className={styles.bottom}>{props.entry.key}</div>
    </a>
  );
};

export const Collections = () => {
  const [list, setList] = useState<
    { key: string; url: string; name: string }[]
  >([]);
  useEffect(() => {
    const arr = getKeywordList()
      .map((val) => ({
        ...val,
        name: val.url
          .replace(/(http:\/\/|https:\/\/|www)\.{0,1}/g, "")
          .substring(0, 5),
      }))
      .sort((a, b) => a.name.charCodeAt(0) - b.name.charCodeAt(0));

    setList(arr);
  }, []);
  return (
    <div className={styles.box}>
      {list.map((val, seq) => (
        <Item entry={val} key={val.key + seq} />
      ))}
      <a className={styles.entry}></a>
    </div>
  );
};
