import {
  Button,
  DatePicker,
  Drawer,
  Input,
  Modal,
  Popconfirm,
  Space,
  Table,
  TimePicker,
} from "antd";
import styles from "./Timetable.module.css";
import { LeftCircleOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { backend, myBack } from "../../utils/backend/backend";
import { toast } from "../../components/Toast/Toast";
import { Countdown } from "../Functions/children/Timer/Timer";

interface dataType {
  key: number;
  name: string;
  history: number[];
}

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "last",
    dataIndex: "name",
    key: "name",
    render: (_: string, entry: dataType, _2: number) => {
      return <Countdown timeStamp={entry.history[0]} />;
    },
  },
];

const HistoryModal = (props: {
  historyModal: boolean;
  dataList: number[];
  closeModal: () => void;
}) => {
  const transformTime = (time: number) => {
    const date = new Date(time);

    return `${date.getFullYear()}-${
      date.getMonth() + 1
    }-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  };
  return (
    <Drawer
      title="history"
      open={props.historyModal}
      onClose={props.closeModal}
    >
      <div className={styles.hisModalBox}>
        {props.dataList.map((val) => (
          <p key={val}>{transformTime(val)}</p>
        ))}
      </div>
    </Drawer>
  );
};

// const CustomModal = (props: { open: boolean }) => {
//   return (
//     <Modal open={props.open} onOk={(e) => {}}>
//       <DatePicker showTime onChange={(e) => {}} onOk={(e) => {}} />
//       <TimePicker
//         format={"HH:mm"}
//         onChange={(e) => {
//           console.log(e);
//         }}
//       />
//     </Modal>
//   );
// };

const AddModal = (props: {
  open: boolean;
  close: (updateList: boolean) => void;
  list: dataType[];
  cloud: myBack;
}) => {
  const [input, setInput] = useState("");
  const [memo, setMemo] = useState("");
  const updateDataList = (name: string, memo: string) => {
    let res = [
      ...props.list,
      {
        name: name,
        history: [Date.now()],
        key: props.list.length,
        memo: memo,
      },
    ];
    return props.cloud.setObj(TIMETABLE_KEY, { list: res });
  };
  return (
    <Modal
      open={props.open}
      onOk={() => {
        if (!input) {
          toast("please enter name for new table entry!");
          return;
        }
        updateDataList(input, memo)
          .then(() => {
            props.close(true);
            toast("success");
          })
          .catch((err: object) => {
            toast(JSON.stringify(err));
          });
      }}
      onCancel={() => props.close(false)}
      okText="add"
    >
      <div className={styles.inputBox}>
        <label>
          <span>name: </span>
          <Input value={input} onChange={(e) => setInput(e.target.value)} />
        </label>
        <label>
          <span>memo: </span>
          <Input value={memo} onChange={(e) => setMemo(e.target.value)} />
        </label>
      </div>
    </Modal>
  );
};

const TIMETABLE_KEY = "65cb0d0f6658614f41d44c94";

export const Timetable = () => {
  const [addModalStatus, setAddModalStatus] = useState(false);
  const to = useNavigate();
  const cloud = backend.getInstance();
  const [dataList, setDataList] = useState<dataType[]>([]);
  const [historyModal, setHistoryModal] = useState<{
    status: boolean;
    dataList: number[];
  }>({
    status: false,
    dataList: [],
  });
  // const [custom, setCustom] = useState({
  //   status: false,
  // });

  const refresh = async () => {
    const obj = await cloud.getObj(TIMETABLE_KEY);
    setDataList(obj.get("list"));
  };

  const updateList = (list: dataType[]) => {
    cloud.setObj(TIMETABLE_KEY, { list }).then(() => {
      refresh();
    });
  };

  useEffect(() => {
    refresh();
  }, []);

  return (
    <div>
      <div className={styles.title}>
        <LeftCircleOutlined
          style={{ fontSize: "20px", color: "#08c" }}
          onClick={() => {
            // to("/functions");
            to(-1);
          }}
        />
        <h1>Timetable:</h1>
      </div>
      <Table
        pagination={false}
        dataSource={dataList}
        columns={columns}
        expandable={{
          expandedRowRender: (record) => (
            <Space>
              <Button
                type="default"
                onClick={() => {
                  record.history = [Date.now(), ...record.history];
                  const res = dataList.map((val) => {
                    return val.key === record.key ? record : val;
                  });

                  updateList(res);
                }}
              >
                reset
              </Button>
              <DatePicker
                showTime
                onOk={(e) => {
                  const val = e.valueOf();
                  record.history = [...record.history, val].sort(
                    (a, b) => b - a
                  );
                  const res = dataList.map((val) => {
                    return val.key === record.key ? record : val;
                  });
                  updateList(res);
                }}
              />

              <Popconfirm
                title="Delete the entry"
                description="Are you sure to delete this entry?"
                okText="Yes"
                cancelText="No"
                onConfirm={() => {
                  let res = dataList.filter((val) => val.key !== record.key);
                  cloud.setObj(TIMETABLE_KEY, { list: res }).then(() => {
                    refresh();
                  });
                }}
              >
                <Button danger>delete</Button>
              </Popconfirm>

              <Button
                type="primary"
                onClick={() => {
                  setHistoryModal({
                    status: true,
                    dataList: record.history,
                  });
                }}
              >
                history
              </Button>
            </Space>
          ),
          rowExpandable: (record) => record.name !== "Not Expandable",
        }}
        footer={() => {
          return (
            <Space>
              <Button onClick={() => setAddModalStatus(true)} type="primary">
                add
              </Button>
            </Space>
          );
        }}
      />

      {/* <CustomModal open={custom.status} /> */}
      <AddModal
        open={addModalStatus}
        close={(val) => {
          if (val) {
            refresh();
          }
          setAddModalStatus(false);
        }}
        list={dataList}
        cloud={cloud}
      />

      <HistoryModal
        closeModal={() => {
          setHistoryModal({
            status: false,
            dataList: [],
          });
        }}
        dataList={historyModal.dataList}
        historyModal={historyModal.status}
      />
    </div>
  );
};
