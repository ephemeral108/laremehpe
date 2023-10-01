import { createContext, useState, useContext, useEffect } from "react";

const ToastConfig = createContext<Array<string>>([]);
let setFixedToast: React.Dispatch<React.SetStateAction<string[]>>;

export const useFiexedToastContext = () => {
  return useContext(ToastConfig);
};

export const ToastConfigProvider = (props) => {
  const [list, setList] = useState<Array<string>>([]);
  setFixedToast = setList;
  return (
    <ToastConfig.Provider value={list}>{props.children}</ToastConfig.Provider>
  );
};

export { setFixedToast };
