import { useEffect, useState } from "react";
import styles from "./Menu.module.css";
// let chosen = -1;
export function Menu(props: {
  arr: string[];
  onLeave: () => void;
  updateChosen: (val: number) => void;
  clickItem: (val: string) => void;
  chosen: number;
  device: boolean;
  showMenu: boolean;
}) {
  // function clickHandler(val) {
  //   props.setInputVal(val);
  //   setTimeout(() => {
  //     // goto(val);
  //   }, 0);
  // }
  const [li, setLi] = useState<{ length: number; arr: string[] }>({
    length: 0,
    arr: [],
  });

  useEffect(() => {
    const newArr: string[] = [];
    for (let i = 0; i < 10; i++) {
      newArr[i] = props.arr[i] || li.arr[i];
    }

    setLi({
      length: props.showMenu ? props.arr.length : 0,
      arr: newArr,
    });
  }, [props.arr, props.showMenu]);
  return (
    <ul
      className={styles.ul}
      onMouseLeave={props.onLeave}
      style={{
        // gridTemplateRows: props.arr.length + "fr",
        // gridTemplateRows: `repeat(auto-fill, ${li.length}fr)`,
        height: li.length * (props.device ? 44 : 38) + 15 + "px",
      }}
    >
      {li.arr.map((val, seq) => (
        <li
          key={val + "" + seq}
          className={[
            styles.item,
            props.chosen === seq ? styles.chosen : "",
          ].join(" ")}
          onMouseMove={() =>
            // chosen != seq ? ((chosen = seq), props.updateChosen(seq)) : ""
            props.updateChosen(seq)
          }
          // onMouseEnter={() =>
          //   chosen != seq ? ((chosen = seq), props.updateChosen(seq)) : ""
          // }
          onMouseDown={() => props.clickItem(val)}
        >
          <span>{val}</span>
        </li>
      ))}
    </ul>
  );
}
