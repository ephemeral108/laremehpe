export function install(val: string): void {
  localStorage.setItem(
    "memoStatus",
    localStorage.getItem("memoStatus") === "true" ? "false" : "true"
  );
  location.reload();
}
