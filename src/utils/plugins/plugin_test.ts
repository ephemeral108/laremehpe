import { setVal } from "../../components/Toast/Toast";
import { backend } from "../backend/backend";
export function install(val: string): void {
  new backend().createObj([{ key: 1, url: "test" }]);
  // const query = new AV.Query("dictionary");
  // query.get("642c3d161abe031ff722202b").then((res) => {
  //   console.log(res.get("list"));
  // });
  setVal("test");
}
