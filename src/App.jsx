import { Routes, Route, HashRouter } from "react-router-dom";
import { ToastConfigProvider } from "./context/ToastContext";
import { BackendConfigProvider } from "./context/Backend";
import { NotFound } from "./views/NotFound/NotFound";
import { Toast } from "./components/Toast/Toast";
import { Loading } from "./views/Loading/Loading";
import { Index } from "./views/Index/Index";
import { Experiment } from "./views/Experiment/Experiment";
import { Functions } from "./views/Functions/Functions";
import { Note } from "./views/Note/Note";
import { FixedToast } from "./components/FixedToast/FixedToast";
import { Base64Converter } from "./views/Functions/children/Base64Converter/Base64Converter";
// import { TestButton } from "./components/TestButton/TestButton";
import { Inputs } from "./views/Functions/children/Inputs/Inputs";
import { Eval } from "./views/Functions/children/Eval/Eval";

function App() {
  return (
    <ToastConfigProvider>
      <BackendConfigProvider>
        <HashRouter>
          <Routes>
            <Route path="/index" element={<Index />} />
            <Route path="/loading" element={<Loading />} />
            <Route path="/experiment" element={<Experiment />} />
            <Route path="/functions" element={<Functions />} />
            <Route path="/eval" element={<Eval />} />
            <Route path="/Notes" element={<Note />} />
            <Route path="/base64" element={<Base64Converter />} />
            <Route path="/inputs" element={<Inputs />} />
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
