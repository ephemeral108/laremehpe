import { useState } from "react";
import styles from "./FixedToast.module.css";
const messageQueue: string[] = [];
let isDisplaying = false;
let alterMes: () => void;
export const addMes: (val: string) => void = (val) => {
  console.log(val, "addMes");
  messageQueue.push(val);
  !isDisplaying && alterMes();
};

export function FixedToast() {
  const [text, setText] = useState<string>("");
  const [clazz, setClazz] = useState<string>(
    [styles.box, styles.vanish].join(" ")
  );
  alterMes = () => {
    if (messageQueue.length > 0) {
      setText(messageQueue.shift() || "");
      setClazz([styles.box, styles.show].join(" "));
      isDisplaying = true;
      console.log(messageQueue);
    } else {
      setClazz([styles.box, styles.vanish].join(" "));
      isDisplaying = false;
    }
  };
  return (
    <div className={clazz} onClick={alterMes}>
      {text}
    </div>
  );
}
