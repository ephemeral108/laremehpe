import { useEffect, useState } from "react";
import styles from "./Collection.module.css";
import { getKeywordList } from "../../../../utils/common/common";
import { Button, Input, Modal, Space, message } from "antd";
import { backend } from "../../../../utils/backend/backend";

const Item = (props: {
  clickHandler: (item: item) => void;
  entry: { key: string; url: string; name: string };
}) => {
  return (
    <a
      className={styles.entry}
      // href={props.entry.url}
      onClick={() => {
        props.clickHandler(props.entry);
      }}
      title={props.entry.url}
      key={props.entry.key}
    >
      <div className={styles.top}>{props.entry.name}</div>
      <div className={styles.bottom}>{props.entry.key}</div>
    </a>
  );
};

type item = { key: string; url: string; name: string };

const PopFooter = (props: { onConfirm: () => void; onOpen: () => void }) => {
  return (
    <Space>
      <Button onClick={props.onConfirm}>confirm</Button>
      <Button onClick={props.onOpen}>open</Button>
    </Space>
  );
};
const Pop = (props: {
  item: item;
  del: () => void;
  getItem: (foo: (val: item) => void) => void;
}) => {
  const [val, setVal] = useState({
    key: "",
    url: "",
    name: "",
  });
  useEffect(() => {
    setVal(() => {
      props.getItem(() => {
        return props.item;
      });
      return props.item;
    });
  }, [props.item]);

  useEffect(() => {
    props.getItem(() => {
      return val;
    });
  }, [val]);
  return (
    <div className={styles.pop}>
      <Space>
        <span>key:</span>
        <Input
          onChange={(e) =>
            setVal({
              ...val,
              key: e.target.value,
            })
          }
          value={val.key}
          autoFocus
        />
      </Space>
      <br />
      <div className={styles.gap}></div>
      <Space>
        <span>url:</span>
        <Input
          onChange={(e) =>
            setVal({
              ...val,
              url: e.target.value,
            })
          }
          value={val.url}
        />
      </Space>
      <br />
      <div className={styles.gap}></div>
      <Space>
        <span></span>
        <Button danger type="primary" onClick={props.del}>
          delete
        </Button>
      </Space>
    </div>
  );
};

const instance = backend.getInstance();
export const Collections = () => {
  const [list, setList] = useState<item[]>([]);
  const [mo, setMo] = useState({
    open: false,
    item: {
      key: "",
      url: "",
      name: "",
    },
  });
  let changeInfo: null | (() => item) = null;
  useEffect(() => {
    const arr = getKeywordList()
      .map((val) => ({
        ...val,
        name: val.url
          .replace(/(http:\/\/|https:\/\/|www)\.{0,1}/g, "")
          .substring(0, 5),
      }))
      .sort((a, b) => a.key.charCodeAt(0) - b.key.charCodeAt(0));

    setList(arr);
  }, []);

  const setOrderList = (tmp: item[]) => {
    setList(
      tmp
        .map((val) => ({
          ...val,
          name: val.url
            .replace(/(http:\/\/|https:\/\/|www)\.{0,1}/g, "")
            .substring(0, 5),
        }))
        .sort((a, b) => a.key.charCodeAt(0) - b.key.charCodeAt(0))
    );
  };
  const cancelModal = () => {
    setMo({
      open: false,
      item: {
        key: "",
        url: "",
        name: "",
      },
    });
  };
  return (
    <>
      <div className={styles.box}>
        {list.map((val, seq) => (
          <Item
            entry={val}
            key={val.key + seq}
            clickHandler={(item) => {
              console.log(item);

              setMo({
                open: true,
                item,
              });
            }}
          />
        ))}
        <a className={styles.entry}></a>
      </div>
      <Modal
        open={mo.open}
        footer={
          <PopFooter
            onConfirm={() => {
              if (!changeInfo) {
                message.error("cannot get changed item info!");
                return;
              }
              // console.log(changeInfo());
              const res = list.filter((val) => {
                return val.key != mo.item.key && val.url != mo.item.url;
              });
              res.push(changeInfo());
              instance.setPlaceholders(
                res.map((val) => ({ key: val.key, url: val.url }))
              );
              // setList(res);
              setOrderList(res);
              cancelModal();
            }}
            onOpen={() => {
              window.open(mo.item.url);
            }}
          />
        }
        onCancel={() => {
          cancelModal();
        }}
      >
        <Pop
          getItem={(cb) => {
            changeInfo = cb as () => item;
          }}
          item={mo.item}
          del={() => {
            const res = list.filter((val) => {
              return val.key != mo.item.key && val.url != mo.item.url;
            });
            cancelModal();
            console.log(res);
            instance.setPlaceholders(
              res.map((val) => ({ key: val.key, url: val.url }))
            );
            setList(res);
          }}
        />
      </Modal>
    </>
  );
};
