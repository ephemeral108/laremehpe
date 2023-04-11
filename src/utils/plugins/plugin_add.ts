import { setVal } from "../../components/Toast/Toast";
import { backend } from "../backend/backend";
import { getKeywordList } from "../common/common";

export async function install(val: string): Promise<void> {
  //val: ' add baidu http://www.baidu.com'
  //entry: ['baidu','http://www.baidu.com']
  const entry: string[] = val.replace("add ", "").split(" ");
  const urlReg: RegExp = new RegExp(/.*\.{1}.+/);
  //'http://www.baidu.com'
  const url: string = entry.find((val) => urlReg.test(val)) || "";
  //'baidu'
  const key: string = entry.find((val) => val != url) || "";
  if (!key || !url) {
    setVal("please check your key or url spell");
    return;
  }
  const instance = backend.getInstance();

  if (instance === null) return;
  let datas = (await instance.fetchPlaceholders()).get("list") || [];
  instance.setPlaceholders([
    ...datas,
    { key, url: url.startsWith("http://") ? url : "http://" + url },
  ]);
  setVal("success");
  getKeywordList();
}
