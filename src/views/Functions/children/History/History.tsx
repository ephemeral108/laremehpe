import { Button, List, Space, Typography } from "antd";
import { useEffect, useState } from "react";
import styles from "./History.module.css";
import {
  cleanHistory,
  getHistory,
} from "../../../../utils/utils/history/history";

export const History = () => {
  const [data, setData] = useState<string[]>([]);
  useEffect(() => {
    setData(getHistory());
  }, []);
  return (
    <div className={styles.box}>
      <Space>
        <Button className={styles.gap} type="primary">
          add
        </Button>
        <Button
          className={styles.gap}
          onClick={() => {
            cleanHistory();
            setData(getHistory());
          }}
        >
          clean
        </Button>
      </Space>
      <List
        bordered
        dataSource={data}
        renderItem={(item) => (
          <List.Item>
            <Typography.Text mark>[HISTORY]</Typography.Text> {item}
          </List.Item>
        )}
      />
    </div>
  );
};
