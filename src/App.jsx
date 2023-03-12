import { BrowserRouter, Routes, Route, HashRouter } from "react-router-dom";
import { ToastConfigProvider } from "./context/ToastContext";
import { NotFound } from "./views/NotFound/NotFound";
import { Toast } from "./components/Toast/Toast";
import { Index } from "./views/Index/Index";
import { Loading } from "./views/Loading/Loading";
import { Computer } from "./views/Computer/Computer";
import { Mobile } from "./views/Mobile/Mobile";
function App() {
  return (
    <ToastConfigProvider>
      <HashRouter>
        <Routes>
          <Route path="/computer" element={<Computer />} />
          <Route path="/mobile" element={<Mobile />} />
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
