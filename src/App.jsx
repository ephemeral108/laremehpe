import { Routes, Route, HashRouter } from "react-router-dom";
import { NotFound } from "./views/NotFound/NotFound";
import { toast } from "./components/Toast/Toast";
import { Loading } from "./views/Loading/Loading";
import { Index } from "./views/Index/Index";
import { Experiment } from "./views/Experiment/Experiment";
import { Functions } from "./views/Functions/Functions";
import { Timetable } from "./views/Timetable/Timetable";
// import { TestButton } from "./components/TestButton/TestButton";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { showAllLastMes } from "./components/FixedToast/FixedToast";
import { _ } from "lodash";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    showAllLastMes();

    toast("Welcom back!");

    dispatch({
      type: "app/device",
      payload: screen.availWidth >= 768 ? "computer" : "mobile",
    });

    const resizeListener = _.throttle(() => {
      dispatch({
        type: "app/device",
        payload: screen.availWidth >= 768 ? "computer" : "mobile",
      });
    }, 2000);

    window.addEventListener("resize", resizeListener);

    return () => {
      window.removeEventListener("resize", resizeListener);
    };
  }, []);

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/index" element={<Index />} />
        <Route path="/loading" element={<Loading />} />
        <Route path="/experiment" element={<Experiment />} />
        <Route path="/functions" element={<Functions />} />
        <Route path="/timetable" element={<Timetable />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
