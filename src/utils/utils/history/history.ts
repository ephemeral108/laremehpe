export const addHistory = (val: string) => {
  const hist = JSON.parse(localStorage.getItem("history") || "[]");
  hist.push(val);
  localStorage.setItem("history", JSON.stringify(hist));
};

export const getHistory = () =>
  JSON.parse(localStorage.getItem("history") || "[]") as string[];

export const cleanHistory = () => localStorage.removeItem("history");
