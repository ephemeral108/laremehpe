import { addMes } from "../../components/FixedToast/FixedToast";
export const install = (val: string) => {
  const valNum = Number(val.replace("date ", ""));
  let date = new Date(valNum);

  if (isNaN(date.getFullYear())) {
    const tmp = new Date().valueOf().toString();
    addMes(tmp);
    navigator.clipboard.writeText(tmp);
  } else {
    const formatDate = `${date.getFullYear()}年 ${
      date.getMonth() + 1
    }月 ${date.getDate()}日 ${date.getHours()}: ${date.getMinutes()}: ${date.getSeconds()}`;
    addMes(formatDate);
    navigator.clipboard.writeText(formatDate);
  }
};
