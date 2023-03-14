export function changePaper(val) {
  localStorage.setItem("wallpaper", val);
  location.reload();
}
