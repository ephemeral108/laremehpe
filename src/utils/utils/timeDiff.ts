import { isNumber } from "lodash";

// export const timeDiff = (from: number, to: number) => {
//   if (!isNumber(from) || !isNumber(to))
//     throw Error("parameters not qualified!");
//   const diff = from - to;

//   return {
//     year: 0,
//     month: 0,
//     day: 0,
//     hour: 0,
//     min: 0,
//     sec: 0,
//   };
// };

export const getTimeDiff = (timestamp1: number, timestamp2: number) => {
  var diff = timestamp1 - timestamp2; // 计算时间差，得到毫秒数

  var seconds = Math.floor(diff / 1000); // 转换为秒
  var minutes = Math.floor(seconds / 60);
  var hours = Math.floor(minutes / 60);
  var days = Math.floor(hours / 24);
  var years = Math.floor(days / 365); // 这里假设每年都是365天

  seconds %= 60;
  minutes %= 60;
  hours %= 24;
  days %= 365;

  // 返回格式化后的时间差
  return {
    years: years,
    months: Math.floor(days / 30), // 这里假设每个月都是30天
    days: days % 30,
    hours: hours % 24,
    minutes: minutes,
    seconds: seconds,
  };
};
