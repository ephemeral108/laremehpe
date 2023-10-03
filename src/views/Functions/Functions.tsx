import { useNavigate } from "react-router-dom";
import styles from "./Functions.module.css";
import { Button, Space } from "antd";
import { useState } from "react";
import { Eval } from "./children/Eval/Eval";
import { Base64Converter } from "./children/Base64Converter/Base64Converter";
import { Inputs } from "./children/Inputs/Inputs";
import { Database } from "./children/Database/Database";
type funs = {
  name: string;
  page: React.ReactNode;
};
const funList: Array<funs> = [
  {
    name: "base64 converter",
    page: <Base64Converter />,
  },
  {
    name: "inputs",
    page: <Inputs />,
  },
  {
    name: "eval js",
    page: <Eval />,
  },
  {
    name: "database management",
    page: <Database />,
  },
];
export function Functions() {
  const to = useNavigate();
  const [page, setPage] = useState<funs>();

  return (
    <div className={styles.outer}>
      <Space className={styles.box}>
        <Button
          type="primary"
          onClick={() => {
            to(-1);
          }}
        >
          返回
        </Button>
        {funList.map((val) => (
          <Button key={val.name} onClick={() => setPage(val)}>
            {val.name}
          </Button>
        ))}
      </Space>
      <div className={styles.rest}>{page && page.page}</div>
    </div>
  );
}
