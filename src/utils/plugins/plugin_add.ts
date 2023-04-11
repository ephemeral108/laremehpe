import { backend } from "../backend/backend";
export function add(val: string): void {
  //val: 'add baidu http://www.baidu.com'
  //entry: ['baidu','http://www.baidu.com']
  const entry: string[] = val.replace("add ", "").split(" ");
  const urlReg: RegExp = new RegExp(/.*\.{1}.+/);
  //'http://www.baidu.com'
  const url: string = entry.find((val) => urlReg.test(val)) || "";
  //'baidu'
  const key: string = entry.find((val) => val != url) || "";
  //   let datas = backend.fetchPlaceholders() || [];
  //   backend.setPlaceholders([...datas, { key, url }]);
}
