import { setVal } from "../../components/Toast/Toast";
import { addMes } from "../../components/FixedToast/FixedToast";

export function install(val: string) {
  switch (val.replace("help", "").trim()) {
    case "add":
      addMes(
        "add shortcut and correspond url .eg: [ add baidu http://www.baidu.com], then refresh your browser, input baidu in search box then it will redirect to baidu."
      );
      break;
    case "remove":
      addMes(
        "remove shortcuts from list, .eg:[ remove baidu] then you're no longer can redirect to http://baidu.com from input box"
      );
      break;
    case "list":
      addMes(
        "show shortcuts list, you can use like:[ list key] or [ list val] to show exact values"
      );
      break;
    case "memo":
      addMes("toggle memo list .eg [ memo]");
      break;
    case "":
      addMes("commands:(add command show instructions, eg. help add)");
      [
        "add",
        "remove",
        "list",
        "clear",
        "help",
        "reload",
        "memo",
        "test",
      ].forEach((val) => addMes(val));
      break;
    default:
      addMes("this command havent have any instruction yet!!!");
      break;
  }
}
