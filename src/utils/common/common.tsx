export function goto(wd: string) {
  if (new RegExp(/^(http|https)/).test(wd)) {
    window.open(wd);
    return;
  }
  if (new RegExp(/^(baidu )|[\u2E80-\uFE4F]/).test(wd)) {
    window.location.href =
      "https://www.baidu.com/s?wd=" +
      encodeURIComponent(wd.replace("baidu ", ""));
    return;
  }

  window.location.href =
    localStorage.getItem("searchEngine") + encodeURIComponent(wd);
}
