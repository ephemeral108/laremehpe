import styles from "./Functions.module.css";
const funList: Array<{
  name: string;
  event: () => void;
}> = [
  {
    name: "favourite",
    event() {},
  },
  {
    name: "js Lab",
    event() {},
  },
  {
    name: "data sync textarea",
    event() {},
  },
  {
    name: "Note",
    event() {
      location.href = "notes";
    },
  },
];

export function Functions() {
  return (
    <div className={styles.box}>
      {funList.map((val) => (
        <div key={val.name} onClick={() => val.event()}>
          {val.name}
        </div>
      ))}
    </div>
  );
}
