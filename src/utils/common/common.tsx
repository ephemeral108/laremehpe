const command: Array<{ cmd: RegExp; handler: (val: string) => void }> = [
  {
    cmd: /(http|https):\/\//,
    handler(val) {
      let url: RegExpExecArray | null = new RegExp(
        /http:\/\/[a-z\.\/%0-9A-Z#&]*/
      ).exec(val);
      if (url) window.open(url[0]);
      else encryptAndForward("baidu", val);
    },
  },
  {
    cmd: /^(baidu )/,
    handler(val) {
      encryptAndForward("baidu", val);
    },
  },
  {
    cmd: /^(google )/,
    handler(val) {
      encryptAndForward("google", val);
    },
  },
  {
    cmd: /[\u2E80-\uFE4F]/,
    handler(val) {
      encryptAndForward("baidu", val);
    },
  },
];

function encryptAndForward(engine: string, val: string) {
  window.location.href =
    (engine === "baidu"
      ? "https://www.baidu.com/s?wd="
      : "https://www.google.com/search?q=") +
    encodeURIComponent(val.replace(engine + " ", ""));
}

export function goto(wd: string) {
  for (let i = 0, len = command.length; i < len; i++) {
    if (new RegExp(command[i].cmd).test(wd)) {
      command[i].handler(wd);
      return;
    }
  }

  window.location.href =
    localStorage.getItem("searchEngine") + encodeURIComponent(wd);
}
