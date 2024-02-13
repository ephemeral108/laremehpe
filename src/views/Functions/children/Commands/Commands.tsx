import styles from "./Commands.module.css";

type entry = {
  key: string;
  name: string;
  usage: string;
  demo: string;
  intro: string;
};
const list: entry[] = [
  {
    key: "0",
    name: "add",
    usage: "add $1 $2",
    demo: "add baidu http://www.baidu.com",
    intro: "add shortcut url",
  },
  {
    key: "1",
    name: "remove",
    usage: "remove $1",
    demo: "remove baidu",
    intro: "remove shortcut url",
  },
  {
    key: "2",
    name: "reload",
    usage: "reload",
    demo: "reload",
    intro: "reload webpage",
  },
  {
    key: "3",
    name: "rocket",
    usage: "rocket",
    demo: "rocket",
    intro: "show rocket at index page",
  },
  {
    key: "4",
    name: "memo",
    usage: "memo $1",
    demo: "memo xxx",
    intro: "add memo",
  },
  {
    key: "5",
    name: "date",
    usage: "date $1",
    demo: "date xxx",
    intro: "convert $1 to readable format",
  },
  {
    key: "6",
    name: "bg",
    usage: "bg",
    demo: "bg",
    intro: "change background of whole page background",
  },
];

export const Commands = () => {
  return (
    <div className={styles.box}>
      <table border={1}>
        <thead>
          <tr>
            <th>
              <span>name</span>
            </th>
            <th>
              <span>usage</span>
            </th>
            <th>
              <span>demo</span>
            </th>
            {/* <th>
              <span>intro</span>
            </th> */}
          </tr>
        </thead>
        <tbody>
          {list.map((val) => (
            <tr key={val.key}>
              <td>{val.name}</td>
              <td>{val.usage}</td>
              <td>{val.demo}</td>
              {/* <td>{val.intro}</td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
