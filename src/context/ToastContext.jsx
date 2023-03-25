import { createContext, useState, useContext } from "react";

const ToastConfig = createContext({
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
  let infoList = [];
  const [innerText, setInnerText] = useState(null);
  const [toastProp, setToastProp] = useState({
    className: null,
  });
  //Toast.jsx

  return (
    <ToastConfig.Provider
      value={{
        infoList,
        innerText,
        toastProp,
        setInnerText,
        setToastProp,
      }}
    >
      {props.children}
    </ToastConfig.Provider>
  );
};
