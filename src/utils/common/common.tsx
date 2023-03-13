export function goto(wd: string) {
  window.location.href = `https://www.baidu.com/s?wd=${encodeURIComponent(wd)}`;
}
