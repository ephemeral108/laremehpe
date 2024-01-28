import { toast } from "../../components/Toast/Toast";
import { backend } from "../backend/backend";
import { getKeywordList, updateKeywordList } from "../common/common";
// import { updateKeywordList } from "../common/common";

export async function install(val: string) {
  const instance = backend.getInstance();
  if (instance === null) return;
  // const list = (await instance.fetchPlaceholders()).get("list");
  const list = getKeywordList();
  const key: string = val.replace("remove ", "");

  const shortcut = list.filter(
    (ele: { key: string; url: string }) => ele.key !== key
  );

  instance.setPlaceholders(shortcut).then(() => {
    toast("removed!");
  });

  updateKeywordList(shortcut);
}
