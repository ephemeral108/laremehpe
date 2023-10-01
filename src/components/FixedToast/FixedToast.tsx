import { useState } from "react";
import styles from "./FixedToast.module.css";
const messageQueue: string[] = [];
let isDisplaying = false;
let alterMes: (firstTime?: boolean) => void;
export const addMes: (val: string) => void = (val) => {
  messageQueue.push(val);
  !isDisplaying && alterMes();
};

export const FixedToast = () => {
  const [text, setText] = useState<string>("");
  const [clazz, setClazz] = useState<string>(
    [styles.box, styles.vanish].join(" ")
  );
  alterMes = (firstTime = false) => {
    if (messageQueue.length > 0) {
      !firstTime && setText(messageQueue.shift() || "");

      setClazz(
        [
          styles.box,
          styles.show,
          firstTime && styles.anotherAnnoyingMessage,
        ].join(" ")
      );
      isDisplaying = true;
      //remove animation
      setTimeout(() => {
        firstTime && setText(messageQueue.shift() || "");

        setTimeout(() => {
          setClazz([styles.box, styles.show].join(" "));
        }, 1000);
      }, 1000);
    } else {
      setClazz([styles.box, styles.vanish].join(" "));
      isDisplaying = false;
    }
  };
  return (
    <div className={clazz} onClick={() => alterMes(true)}>
      {text}
    </div>
  );
};
