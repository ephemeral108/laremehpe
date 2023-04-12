import { Routes, Route, HashRouter } from "react-router-dom";
import { ToastConfigProvider } from "./context/ToastContext";
import { NotFound } from "./views/NotFound/NotFound";
import { Toast } from "./components/Toast/Toast";
import { Loading } from "./views/Loading/Loading";
import { Index } from "./views/Index/Index";
import { Experiment } from "./views/Experiment/Experiment";
import { Functions } from "./views/Functions/Functions";
import { Note } from "./views/Note/Note";
function App() {
  return (
    <ToastConfigProvider>
      <HashRouter>
        <Routes>
          <Route path="/index" element={<Index />} />
          <Route path="/loading" element={<Loading />} />
          <Route path="/experiment" element={<Experiment />} />
          <Route path="/functions" element={<Functions />} />
          <Route path="/Notes" element={<Note />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </HashRouter>
      <Toast />
    </ToastConfigProvider>
  );
}

export default App;
