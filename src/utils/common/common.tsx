export function goto(wd: string) {
  if (new RegExp(/^(http|https)/).test(wd)) {
    window.open(wd);
    return;
  }
  window.location.href =
    localStorage.getItem("searchEngine") + encodeURIComponent(wd);
}
