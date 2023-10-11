export const install = () => {
  localStorage.setItem(
    "rocket",
    localStorage.getItem("rocket") === "true" ? "false" : "true"
  );
  location.reload();
};
