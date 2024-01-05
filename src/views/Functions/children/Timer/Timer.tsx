import { Button } from "antd";
import styles from "./Timer.module.css";
import { useEffect, useState } from "react";
import { useBackendContext } from "../../../../context/Backend";
import { setVal } from "../../../../components/Toast/Toast";
const table = "65975e3490d3d1241de49d20";
export const Timer = () => {
  const [time, setTime] = useState(0);
  const { cloud } = useBackendContext();
  useEffect(() => {
    cloud.getObj(table).then((val) => {
      setTime(new Date(Number(val.get("time"))).valueOf());
    });
    // api callback
  }, []);
  return (
    <div className={styles.box}>
      <Countdown timeStamp={time} />
      <Button
        type="primary"
        onClick={() => {
          const time = new Date().valueOf();
          setTime(time);
          cloud
            .setObj(table, { time: time + "" })
            .then(() => setVal && setVal("success"));
        }}
      >
        reset
      </Button>
    </div>
  );
};

const DAY_MILLS = 1000 * 60 * 60 * 24;
const HOUR_MILLS = 1000 * 60 * 60;
const MIN_MILLS = 1000 * 60;
const SEC_MILLS = 1000;

const calRest = (time: number, unit: number) => {
  const val = Math.floor(time / unit);
  const rest = time - val * unit;
  return {
    val,
    rest,
  };
};

const calDate = (past: number) => {
  const cur = new Date().valueOf();
  const day = calRest(cur - past, DAY_MILLS);
  const hour = calRest(day.rest, HOUR_MILLS);
  const min = calRest(hour.rest, MIN_MILLS);
  const sec = calRest(min.rest, SEC_MILLS);
  return {
    day: day.val,
    hour: hour.val,
    min: min.val,
    sec: sec.val,
  };
};

const Countdown = (props: { timeStamp: number }) => {
  const [date, setDate] = useState({
    day: 0,
    hour: 0,
    min: 0,
    sec: 0,
  });
  useEffect(() => {
    const timer = setInterval(() => {
      setDate(calDate(props.timeStamp));
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [props.timeStamp]);

  return (
    <div>
      {date.day || 0} 天 {date.hour || 0} 时 {date.min || 0} 分 {date.sec || 0}{" "}
      秒
    </div>
  );
};
