import _ from "lodash";

const mid = _.debounce((val: KeyboardEvent, pageName: string) => {
  if (val.ctrlKey) window.location.href = pageName;
}, 500);

export const switchTab = (val: KeyboardEvent, pageName: string) => {
  if (val.key === "p") {
    val.preventDefault();
  }
  mid(val, pageName);
};
