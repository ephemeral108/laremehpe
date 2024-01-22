import { Button, Input, List, Popconfirm, Space, Typography } from "antd";
import styles from "./Memo.module.css";
import { useEffect, useState } from "react";
import { useBackendContext } from "../../../../context/Backend";
import { copyText } from "../../../../utils/common/copy";
import { setVal as toast } from "../../../../components/Toast/Toast";

interface memoItem {
  key: string;
}

export const Memo = () => {
  const { cloud } = useBackendContext();
  const [list, setList] = useState<memoItem[]>([]);
  const [val, setVal] = useState<string>("");
  const refresh = async () => {
    setList((await cloud.fetchMemo()).get("list"));
  };
  const add = (): void => {
    setList((dataset: memoItem[]) => {
      const data = [
        ...dataset,
        {
          key: val,
        },
      ];
      cloud.updateMemo(data).then(() => {
        toast && toast("success");
      });
      return data;
    });
    setVal("");
  };

  useEffect(() => {
    refresh();
  }, []);
  return (
    <div className={styles.box}>
      <div className={styles.entry}>
        <Input
          onChange={(e) => setVal(e.target.value)}
          value={val}
          onKeyDown={(e) => {
            if (e.key !== "Enter") return;
            add();
          }}
        />
        <Button onClick={add}>+</Button>
      </div>
      <div className={styles.listBox}>
        {/* <div className={styles.list}>{list.map((val) => val)}</div> */}
        <List
          dataSource={list}
          renderItem={(item) => (
            <List.Item className={styles.item}>
              <Typography.Text mark>[EVENT]:</Typography.Text>
              <div className={styles.text}>{item.key}</div>
              <div className={styles.opt}>
                <Space>
                  <Button
                    type="primary"
                    onClick={() => {
                      copyText(item.key);
                    }}
                  >
                    copy
                  </Button>
                  <Popconfirm
                    title="Delete the memo?"
                    description="Are you sure to delete this memo?"
                    okText="Yes"
                    cancelText="No"
                    onConfirm={() => {
                      setList((dataset: memoItem[]) => {
                        const data = [...dataset].filter(
                          (data) => data.key !== item.key
                        );
                        cloud.updateMemo(data).then(() => {
                          toast && toast("success");
                        });
                        return data;
                      });
                    }}
                  >
                    <Button>x</Button>
                  </Popconfirm>
                </Space>
              </div>
            </List.Item>
          )}
          header={<div>Memo</div>}
        />
      </div>
    </div>
  );
};
