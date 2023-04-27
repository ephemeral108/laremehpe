import { setVal } from "../../components/Toast/Toast";

export function install(val: string) {
  switch (val.replace("help", "")) {
    case "add":
      setVal(
        "add shortcut and correspond url .eg: [ add baidu http://www.baidu.com], then refresh your browser, input baidu in search box then it will redirect to baidu."
      );
      break;
    case "remove":
      setVal(
        "remove shortcuts from list, .eg:[ remove baidu] then you're no longer can redirect to http://baidu.com from input box"
      );
      break;
    case "list":
      setVal(
        "show shortcuts list, you can use like:[ list key] or [ list val] to show exact values"
      );
      break;
    case "memo":
      setVal("toggle memo list .eg [ memo]");
      break;
    case "":
      setVal("commands:(add command show instructions, eg. help add)");
      [
        "add",
        "remove",
        "list",
        "clear",
        "help",
        "reload",
        "memo",
        "test",
      ].forEach((val) => setVal(val));
      break;
    default:
      setVal("this command havent have any instruction yet!!!");
      break;
  }
}
