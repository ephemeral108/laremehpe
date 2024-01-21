import { useNavigate } from "react-router-dom";
import styles from "./Functions.module.css";
import { Button } from "antd";
import { useEffect, useState } from "react";
import { Eval } from "./children/Eval/Eval";
import { Base64Converter } from "./children/Base64Converter/Base64Converter";
import { Inputs } from "./children/Inputs/Inputs";
import { Database } from "./children/Database/Database";
import { UrlEncoder } from "./children/UrlEncoder/UrlEncoder";
import { Timer } from "./children/Timer/Timer";
import { Collections } from "./children/Collections/Collections";
import { Commands } from "./children/Commands/Commands";
import { Memo } from "../../components/Memo/Memo";

type funs = {
  name: string;
  address: React.ReactNode;
};
const funList: Array<funs> = [
  {
    name: "collections",
    address: <Collections />,
  },
  {
    name: "memo",
    address: <Memo show={true} clearText={() => {}} inputText="null" />,
  },
  {
    name: "url encoder",
    address: <UrlEncoder />,
  },
  {
    name: "base64 converter",
    address: <Base64Converter />,
  },
  {
    name: "inputs",
    address: <Inputs />,
  },
  {
    name: "eval js",
    address: <Eval />,
  },
  {
    name: "database management",
    address: <Database />,
  },
  {
    name: "timer",
    address: <Timer />,
  },
  {
    name: "commands",
    address: <Commands />,
  },
];
export function Functions() {
  const to = useNavigate();
  const [page, setPage] = useState<funs>();

  useEffect(() => {
    setPage(funList[0]);
  }, []);

  return (
    <div className={styles.outer}>
      <div className={styles.box}>
        <Button
          type="primary"
          onClick={() => {
            to(-1);
          }}
        >
          返回
        </Button>
        {funList.map((val) => (
          <Button
            type={page?.name === val.name ? "primary" : "default"}
            key={val.name}
            onClick={() => setPage(val)}
          >
            {val.name}
          </Button>
        ))}
      </div>
      <div className={styles.rest}>{page && page.address}</div>
    </div>
  );
}
