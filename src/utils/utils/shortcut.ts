import _ from "lodash";

const mid = _.debounce((pageName: string) => {
  window.location.href = pageName;
}, 500);

export const switchTab = (val: KeyboardEvent, pageName: string) => {
  if (val.key === "p" && val.ctrlKey) {
    val.preventDefault();
    mid(pageName);
  }
};
