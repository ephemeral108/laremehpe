export function install(val: string) {
  localStorage.setItem(
    "memoStatus",
    localStorage.getItem("memoStatus") === "true" ? "false" : "true"
  );
}
