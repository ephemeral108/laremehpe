import { useEffect, useState } from "react";
import styles from "./Collection.module.css";
import { getKeywordList } from "../../../../utils/common/common";

const Item = (props: { entry: { key: string; url: string } }) => {
  return (
    <a
      className={styles.entry}
      href={props.entry.url}
      title={props.entry.url}
      key={props.entry.key}
    >
      <div className={styles.top}>
        {props.entry.url
          .replace(/(http:\/\/|https:\/\/|www)\.{0,1}/g, "")
          .substring(0, 5)}
      </div>
      <div className={styles.bottom}>{props.entry.key}</div>
    </a>
  );
};

export const Collections = () => {
  const [list, setList] = useState<{ key: string; url: string }[]>([]);
  useEffect(() => {
    // console.log(getKeywordList());
    setList(getKeywordList());
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
