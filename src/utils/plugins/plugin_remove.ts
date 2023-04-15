import { setVal } from "../../components/Toast/Toast";
import { backend } from "../backend/backend";
import { getKeywordList } from "../common/common";

export async function install(val: string) {
  const instance = backend.getInstance();
  if (instance === null) return;
  const list = (await instance.fetchPlaceholders()).get("list");
  const key: string = val.replace("remove ", "");

  const shortcut = (list || []).filter(
    (ele: { key: string; url: string }) =>
      ele.key !== key || ele.url.indexOf(key) === -1
  );
  if (!shortcut) {
    setVal(
      "cannot find revelant keyword, please check your placeholder again!"
    );
    return;
  }
  instance.setPlaceholders(shortcut);
  getKeywordList();
}
