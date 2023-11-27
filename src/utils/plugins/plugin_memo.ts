export function install(_: string): void {
  localStorage.setItem(
    "memoStatus",
    localStorage.getItem("memoStatus") === "true" ? "false" : "true"
  );
  location.reload();
}
