import { createContext, useState, useContext } from "react";

const config: {
  infoList: string[];
  innerText: string | null;
  toastProp: {
    className: string;
  };
  setInnerText: any;
  setToastProp: any;
} = {
  infoList: [],
  innerText: "",
  toastProp: {
    className: "",
  },
  setInnerText: null,
  setToastProp: null,
};

const ToastConfig = createContext(config);

export const useToastContext = () => {
  return useContext(ToastConfig);
};

export const ToastConfigProvider = (props: { children: JSX.Element }) => {
  //Toast.jsx
  let infoList: string[] = [];
  const [innerText, setInnerText] = useState(null);
  const [toastProp, setToastProp] = useState({
    className: "",
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
