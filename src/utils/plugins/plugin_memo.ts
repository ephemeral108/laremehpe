export function install(val: string) {
  let flag: boolean = localStorage.getItem("memoStatus") === "true";
  localStorage.setItem("memoStatus", flag ? "false" : "true");
}
