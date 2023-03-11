import styles from "./Toast.module.css";
import { useToastContext } from "../../context/ToastContext";
let setVal = null;

function Toast() {
  let {
    flag,
    infoList,
    innerText,
    toastProp,
    setFlag,
    setInnerText,
    setToastProp,
  } = useToastContext();

  setVal = (val) => {
    val && (infoList = [...infoList, val]);
    if (flag) return;
    setFlag(() => true);
    setInnerText(() => infoList[0]);
    setToastProp(() => ({
      className: [styles.showToast, styles.toast].join(" "),
    }));
    setTimeout(() => {
      setFlag(() => false);
      setInnerText(() => null);
      setToastProp(() => ({ className: null }));
      setTimeout(() => {
        if (infoList.length - 1 > 0) {
          infoList = infoList.slice(1);
          setVal();
        } else infoList = [];
      }, 500);
    }, 4000);
  };

  return <div {...toastProp}>{innerText}</div>;
}

export { Toast, setVal };
