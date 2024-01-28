import { toast } from "../../components/Toast/Toast";
import { backend } from "../backend/backend";
import { getKeywordList, updateKeywordList } from "../common/common";
// import { updateKeywordList } from "../common/common";

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
    toast("please check your key or url spell");
    return;
  }

  if (getKeywordList().findIndex((val) => val.key === key) > -1) {
    let shortcut = getKeywordList().find((ele) => ele.key === key)?.url;
    toast("the key already exist! url is: " + shortcut);

    return;
  }
  const instance = backend.getInstance();

  if (instance === null) return;
  let datas = (await instance.fetchPlaceholders()).get("list") || [];
  const newList = [
    ...datas,
    { key, url: url.startsWith("http") ? url : "http://" + url },
  ];
  instance.setPlaceholders(newList);
  toast(url.startsWith("http") ? url : "http://" + url);
  // console.log(newList);
  updateKeywordList(newList);
  // updateKeywordList(newList);
}
