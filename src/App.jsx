import { Routes, Route, HashRouter } from "react-router-dom";
import { ToastConfigProvider } from "./context/ToastContext";
import { BackendConfigProvider } from "./context/Backend";
import { NotFound } from "./views/NotFound/NotFound";
import { Toast } from "./components/Toast/Toast";
import { Loading } from "./views/Loading/Loading";
import { Index } from "./views/Index/Index";
import { Experiment } from "./views/Experiment/Experiment";
import { Functions } from "./views/Functions/Functions";
import { FixedToast, addMes } from "./components/FixedToast/FixedToast";
// import { TestButton } from "./components/TestButton/TestButton";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    const last = localStorage.getItem("lastMes");
    if (!last) return;
    addMes(last);
    localStorage.setItem("lastMes", "");
    setVal("Welcom back!");
  }, []);
  return (
    <ToastConfigProvider>
      <BackendConfigProvider>
        <HashRouter>
          <Routes>
            <Route path="/index" element={<Index />} />
            <Route path="/loading" element={<Loading />} />
            <Route path="/experiment" element={<Experiment />} />
            <Route path="/functions" element={<Functions />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </HashRouter>
        <Toast />
        <FixedToast />
        {/* <TestButton /> */}
      </BackendConfigProvider>
    </ToastConfigProvider>
  );
}

export default App;
