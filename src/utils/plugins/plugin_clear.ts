import { backend } from "../backend/backend";
import { getKeywordList } from "../common/common";
export function install() {
  backend.getInstance().setPlaceholders([]);
  setTimeout(() => {
    getKeywordList();
  }, 0);
}
