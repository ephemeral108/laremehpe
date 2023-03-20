import styles from "./Functions.module.css";
const funList = [
  {
    name: "favourite",
  },
  {
    name: "js Lab",
  },
  {
    name: "data sync textarea",
  },
];

export function Functions() {
  return (
    <div className="box">
      {funList.map((val) => (
        <div className="item">{val.name}</div>
      ))}
    </div>
  );
}
