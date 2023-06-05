import { useNavigate } from "react-router-dom";
import styles from "./Functions.module.css";
const funList: Array<{
  name: string;
  page: string;
}> = [
  {
    name: "base64 converter",
    page: "/base64",
  },
  // {
  //   name: "js Lab",
  //   event() {},
  // },
  // {
  //   name: "data sync textarea",
  //   event() {},
  // },
  // {
  //   name: "Note",
  //   event() {
  //     location.href = "notes";
  //   },
  // },
];

export function Functions() {
  const to = useNavigate();
  return (
    <div className={styles.box}>
      {funList.map((val) => (
        <div key={val.name} onClick={() => to(val.page)}>
          {val.name}
        </div>
      ))}
    </div>
  );
}
