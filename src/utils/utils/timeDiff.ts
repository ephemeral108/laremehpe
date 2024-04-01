import { isNumber } from "lodash";

export const getTimeDiff = (from: number, to: number) => {
  if (!isNumber(from) || !isNumber(to))
    throw Error("parameters not qualified!");
  let fromDate = new Date(from);
  let toDate = new Date(to);

  return {
    years: toDate.getFullYear() - fromDate.getFullYear(),
    months: toDate.getMonth() - fromDate.getMonth(),
    days: toDate.getDate() - fromDate.getDate(),
    hours: toDate.getHours() - fromDate.getHours(),
    minutes: toDate.getMinutes() - fromDate.getMinutes(),
    seconds: toDate.getSeconds() - fromDate.getSeconds(),
  };
};
