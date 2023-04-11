import { setVal } from "../../components/Toast/Toast";
const command: Array<{ cmd: RegExp; handler: (val: string) => void }> = [
  {
    //以空格开头的将被识别为插件，加载的插件必须提供 install 函数，并接收一个参数，参数值为空格后面的输入内容
    cmd: /^ /,
    handler(val) {
      val = val.replace(" ", "");
      // import("../plugins/memo.ts");
      import(`../plugins/plugin_${val}.ts`)
        .then((res: { install: (val: string) => void }) => {
          res.install(val);
        })
        .catch((err) => {
          setVal("cannot find correspond plugin, please check you spell");
        });
    },
  },
  {
    //搜索内容中包含http://或者https://则直接截取跳转相应的网页
    cmd: /(http|https):\/\//,
    handler(val) {
      let url: RegExpExecArray | null = new RegExp(
        /(http|https):\/\/[a-z\.\/%0-9A-Z#&-]*/
      ).exec(val);
      if (url) window.open(url[0]);
      else encryptAndForward(localStorage.getItem("searchEngine"), val);
    },
  },
  {
    //baidu空格开头的内容将被识别为用百度搜索
    cmd: /^(baidu )/,
    handler(val) {
      encryptAndForward("baidu", val);
    },
  },
  {
    //google空格开头的内容将被识别为用Google搜索
    cmd: /^(google )/,
    handler(val) {
      encryptAndForward("google", val);
    },
  },
  {
    //包含中文字符则直接用百度搜索
    cmd: /[\u2E80-\uFE4F]/,
    handler(val) {
      encryptAndForward("baidu", val);
    },
  },
];
//将字符通过encodeURIComponent进行转义并使用对应搜索引擎进行搜索
function encryptAndForward(engine: string | null, val: string) {
  window.location.href =
    (engine === "google"
      ? "https://www.google.com/search?q="
      : "https://www.baidu.com/s?wd=") +
    encodeURIComponent(val.replace(engine + " ", ""));
}

export function goto(wd: string) {
  //对所有命令检索
  let res = command.find((val) => new RegExp(val.cmd).test(wd));
  res
    ? res.handler(wd)
    : encryptAndForward(localStorage.getItem("searchEngine"), wd);
}
