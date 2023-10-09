// import { addMes } from "../../components/FixedToast/FixedToast";
import { setVal } from "../../components/Toast/Toast";
import { backend } from "../backend/backend";
import { getKeywordList } from "../common/common";
import { updateKeywordList } from "../common/common";

export async function install(val: string): Promise<void> {
  //val: ' add baidu http://www.baidu.com'
  //entry: ['baidu','http://www.baidu.com']
  const entry: string[] = val.replace("add ", "").split(" ");
  const urlReg: RegExp = new RegExp(/.*\.{1}.+/);
  //'http://www.baidu.com'
  const url: string =
    entry.find((val) => urlReg.test(val))?.split("?")[0] || "";
  //'baidu'
  const key: string = entry.find((val) => val != url) || "";
  if (!key || !url) {
    setVal("please check your key or url spell");
    return;
  }

  if (getKeywordList().findIndex((val) => val.key === key) > -1) {
    // setVal("the key already exist!");
    let shortcut = getKeywordList().find((ele) => ele.key === key)?.url;
    localStorage.setItem(
      "lastMes",
      "the key already exist! url is: " + shortcut
    );
  }
  const instance = backend.getInstance();

  if (instance === null) return;
  let datas = (await instance.fetchPlaceholders()).get("list") || [];
  const newList = [
    ...datas,
    { key, url: url.startsWith("http") ? url : "http://" + url },
  ];
  instance.setPlaceholders(newList);
  setVal(url.startsWith("http") ? url : "http://" + url);
  updateKeywordList(newList);
}
