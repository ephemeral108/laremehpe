import { Button } from "antd";
import styles from "./Timer.module.css";
import { useEffect, useState } from "react";
import { useBackendContext } from "../../../../context/Backend";
import { toast } from "../../../../components/Toast/Toast";
import { useNavigate } from "react-router-dom";
const table = "65975e3490d3d1241de49d20";
export const Timer = () => {
  const [time, setTime] = useState(0);
  const { cloud } = useBackendContext();
  const to = useNavigate();

  useEffect(() => {
    cloud.getObj(table).then((val) => {
      setTime(new Date(Number(val.get("time"))).valueOf());
    });
    // api callback
  }, []);
  return (
    <div className={styles.box}>
      <div
        className={styles.more}
        onClick={() => {
          to("/timetable");
        }}
      >
        <img src="/more.png" alt="" />
      </div>
      <Countdown timeStamp={time} />
      <Button
        type="primary"
        onClick={() => {
          const time = new Date().valueOf();
          setTime(time);
          cloud.setObj(table, { time: time + "" }).then(() => toast("success"));
        }}
      >
        reset
      </Button>
      <div className={styles.aphorism}>
        <p>There're things we can have, but can't keep</p>
        <p>who cares if one more light goes out</p>
        <p>in the sky of a million stars</p>
        <p>who cares when someone's time runs out?</p>
        <p>if a moment is all we are</p>
        <p>-- Chester Bennington</p>
      </div>
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

export const Countdown = (props: { timeStamp: number }) => {
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
