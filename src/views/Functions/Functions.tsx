import { useNavigate } from "react-router-dom";
import styles from "./Functions.module.css";
import { Button } from "antd";
import { useEffect, useState } from "react";
import { Eval } from "./children/Eval/Eval";
// import { Base64Converter } from "./children/Base64Converter/Base64Converter";
import { Inputs } from "./children/Inputs/Inputs";
import { Database } from "./children/Database/Database";
// import { UrlEncoder } from "./children/UrlEncoder/UrlEncoder";
import { Timer } from "./children/Timer/Timer";
import { Collections } from "./children/Collections/Collections";
import { Commands } from "./children/Commands/Commands";
import { Memo } from "./children/Memo/Memo";
import { switchTab } from "../../utils/utils/shortcut";
import { Codex } from "./children/Codex/Codex";
import { History } from "./children/History/History";
import { QrCode } from "./children/QrCode/QrCode";
import { Doodle } from "./children/Doodle/Doodle";

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
    name: "inputs",
    address: <Inputs />,
  },
  {
    name: "timer",
    address: <Timer />,
  },
  {
    name: "memo",
    address: <Memo />,
  },
  {
    name: "codex",
    address: <Codex />,
  },
  {
    name: "qrCode",
    address: <QrCode />,
  },
  {
    name: "eval js",
    address: <Eval />,
  },
  {
    name: "database",
    address: <Database />,
  },
  {
    name: "doodle",
    address: <Doodle />,
  },
  {
    name: "commands",
    address: <Commands />,
  },
  {
    name: "history",
    address: <History />,
  },
];

// let doubleCtrl = false;
export function Functions() {
  const to = useNavigate();
  const [page, setPage] = useState<funs>();

  const keyEvent = (ev: KeyboardEvent) => {
    switchTab(ev, "/");

    const key = +ev.key;
    if (key !== key || key < 0 || key >= funList.length) return;
    const actEl = document?.activeElement?.tagName;
    if (actEl === "INPUT" || actEl === "TEXTAREA") return;

    setPage(funList[key]);
  };
  const unregisterHotKey = () => {
    window.removeEventListener("keydown", keyEvent);
  };
  const registerHotKey = () => {
    window.addEventListener("keydown", keyEvent);
  };
  useEffect(() => {
    setPage(funList[0]);
    registerHotKey();

    return () => {
      unregisterHotKey();
    };
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
