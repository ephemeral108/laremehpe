import { createContext, useState, useContext } from "react";

const ToastConfig = createContext({
  flag: false,
  infoList: [],
  innerText: "",
  toastProp: {
    className: null,
  },
});

export const useToastContext = () => {
  return useContext(ToastConfig);
};

export const ToastConfigProvider = (props) => {
  //Toast.jsx
  const [flag, setFlag] = useState(false);
  let infoList = [];
  const [innerText, setInnerText] = useState(null);
  const [toastProp, setToastProp] = useState({
    className: null,
  });
  //Toast.jsx

  return (
    <ToastConfig.Provider
      value={{
        flag,
        infoList,
        innerText,
        toastProp,
        setFlag,
        setInnerText,
        setToastProp,
      }}
    >
      {props.children}
    </ToastConfig.Provider>
  );
};
