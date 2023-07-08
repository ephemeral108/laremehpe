import { createContext, useState, useContext, useEffect } from "react";
import { backend, myBack } from "../utils/backend/backend";
const BackendConfig = createContext({ cloud: backend.getInstance() });

export const useBackendContext = (): { cloud: myBack } => {
  return useContext<{ cloud: myBack }>(BackendConfig);
};

export const BackendConfigProvider = (props: { children: JSX.Element }) => {
  const [cloud, setCloud] = useState(backend.getInstance());
  useEffect(() => {
    setCloud(backend.getInstance());
  }, []);
  return (
    <BackendConfig.Provider value={{ cloud }}>
      {props.children}
    </BackendConfig.Provider>
  );
};
