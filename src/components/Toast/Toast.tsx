import styles from "./Toast.module.css";
import { useToastContext } from "../../context/ToastContext";
import { useCallback } from "react";
let setVal: ((val: any) => void) | null = null;
let flag = false;
function Toast() {
  let { infoList, innerText, toastProp, setInnerText, setToastProp } =
    useToastContext();

  setVal = useCallback((val: string) => {
    val && (infoList = [...infoList, val]);
    if (flag) return;
    flag = true;
    setInnerText(() => infoList[0]);
    setToastProp(() => ({
      className: [styles.showToast, styles.toast].join(" "),
    }));
    setTimeout(() => {
      flag = false;
      setInnerText(() => null);
      setToastProp(() => ({ className: null }));
      setTimeout(() => {
        if (infoList.length - 1 > 0) {
          infoList = infoList.slice(1);
          setVal && setVal("");
        } else infoList = [];
      }, 500);
    }, 4000);
  }, []);

  return <div {...toastProp}>{innerText}</div>;
}

export { Toast, setVal };
