import { setVal } from "../../components/Toast/Toast";
import { getKeywordList } from "../common/common";

export function install(val: string): void {
  const list = getKeywordList();
  const keys = list.map((val) => val.key);
  const vals = list.map((val) => val.url);

  switch (val.replace(/list /, "")) {
    case "val":
      setVal(vals.join(","));
      break;
    case "key":
      setVal(keys.join(","));
      break;
    default:
      setVal(
        "add space and val show all the url, add space and key show all the keys!"
      );
      break;
  }
}