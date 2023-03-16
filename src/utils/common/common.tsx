export function goto(wd: string) {
  if (new RegExp(/^(http|https)/).test(wd)) {
    window.open(wd);
    return;
  }
  window.location.href = `https://www.baidu.com/s?wd=${encodeURIComponent(wd)}`;
}
