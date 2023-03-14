import { Routes, Route, HashRouter } from "react-router-dom";
import { ToastConfigProvider } from "./context/ToastContext";
import { NotFound } from "./views/NotFound/NotFound";
import { Toast } from "./components/Toast/Toast";
import { Loading } from "./views/Loading/Loading";
import { Index } from "./views/Index/Index";
function App() {
  return (
    <ToastConfigProvider>
      <HashRouter>
        <Routes>
          <Route path="/index" element={<Index />} />
          <Route path="/loading" element={<Loading />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </HashRouter>
      <Toast />
    </ToastConfigProvider>
  );
}

export default App;
