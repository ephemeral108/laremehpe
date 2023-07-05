import { useNavigate } from "react-router-dom";
import styles from "./Functions.module.css";
import { Button, Space } from "antd";
const funList: Array<{
  name: string;
  page: string;
}> = [
  {
    name: "base64 converter",
    page: "/base64",
  },
  {
    name: "inputs",
    page: "/inputs",
  },
  {
    name: "eval js",
    page: "/eval",
  },
];

export function Functions() {
  const to = useNavigate();
  return (
    <Space className={styles.box}>
      {funList.map((val) => (
        <Button key={val.name} onClick={() => to(val.page)}>
          {val.name}
        </Button>
      ))}
    </Space>
  );
}
