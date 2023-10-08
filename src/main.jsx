import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./utils/common/store";
import { ToastConfigProvider } from "./context/ToastContext";
import { BackendConfigProvider } from "./context/Backend";
import { Toast } from "./components/Toast/Toast";
import { FixedToast } from "./components/FixedToast/FixedToast";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <ToastConfigProvider>
      <BackendConfigProvider>
        <App />
        <Toast />
        <FixedToast />
      </BackendConfigProvider>
    </ToastConfigProvider>
  </Provider>
);
