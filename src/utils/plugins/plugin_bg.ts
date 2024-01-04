export const install = () => {
  if (localStorage.getItem("bg")) {
    localStorage.removeItem("bg");
  } else {
    localStorage.setItem("bg", "true");
  }
  window.location.reload();
};
