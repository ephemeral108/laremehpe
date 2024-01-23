import { toast } from "../../components/Toast/Toast";
import { backend } from "../backend/backend";

export function install(val: string, clearInputCallBack?: () => void): void {
  const cloud = backend.getInstance();
  if (val.replace("memo ", "").startsWith("add")) {
    cloud.fetchMemo().then((res) => {
      const data = [
        ...res.get("list"),
        {
          key: val.replace("memo add ", ""),
        },
      ];
      cloud.updateMemo(data).then(() => [toast("success")]);
    });

    clearInputCallBack && clearInputCallBack();
    return;
  }
  if (val.replace("memo ", "").startsWith("remove")) {
    const item = val.replace("memo remove ", "");
    cloud.fetchMemo().then((res) => {
      const data = res.get("list").filter((val) => val.key != item);
      cloud.updateMemo(data).then(() => [toast("success")]);
    });

    clearInputCallBack && clearInputCallBack();
    return;
  }

  localStorage.setItem(
    "memoStatus",
    localStorage.getItem("memoStatus") === "true" ? "false" : "true"
  );
  location.reload();
}
