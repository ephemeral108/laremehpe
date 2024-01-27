import { addMes } from "../../components/FixedToast/FixedToast";
// import { setVal } from "../../components/Toast/Toast";
import { backend } from "../backend/backend";

// Define a type for a list of objects with a key and url property
type list = Array<{ key: string; url: string }>;

// Declare a variable to hold a list of keywords
let keywordList: list;

// Define a function to return the keyword list
export function getKeywordList() {
  return keywordList;
}

// Define a function to update the keyword list
export function updateKeywordList(_: list) {
  // keywordList = list;
  location.reload();
}

/**
 *  strip the first cmd + space that met.
 * @param cmd eg. baidu dick
 * @returns dick
 */
export const stripCmdHead = (cmd: string) => {
  return cmd.substring(cmd.indexOf(" ") + 1);
};

// export const refreshKeywordList = async () => {
//   const data = await backend.getInstance()?.fetchPlaceholders();
//   if (!data) return [];
//   return data.get("list");
// };
// Fetch the list of placeholders from the backend and update the keyword list
//read keyword list from cache
const cachedKeywordList = localStorage.getItem("keywordList");
if (cachedKeywordList) {
  try {
    keywordList = JSON.parse(cachedKeywordList);
  } catch (e) {
    addMes(
      "error: try to parse keyword list from local cache, reason: unresolved string!"
    );
  }
}
//update cache keyword list
// backend
//   .getInstance()
//   ?.fetchPlaceholders()
//   .then((res) => {
//     keywordList = res.get("list");
//     localStorage.setItem("keywordList", JSON.stringify(keywordList));
//   });
export const refreshKeywordList = async () => {
  const data = await backend.getInstance()?.fetchPlaceholders();
  if (!data) return;
  keywordList = data.get("list");
  localStorage.setItem("keywordList", JSON.stringify(keywordList));
};

refreshKeywordList();
// refreshKeywordList().then((data) => {
//   keywordList = data;
//   localStorage.setItem("keywordList", JSON.stringify(keywordList));
// });

// Define an array of command objects with a cmd property and a handler function
const command: Array<{
  cmd: RegExp;
  handler: (val: string, clearInputCallBack?: () => void) => void;
}> = [
  {
    // If the input starts with a space, load the corresponding plugin
    cmd: /^ /,
    handler(val, clearInputCallBack) {
      val = val.replace(" ", "");
      import(`../plugins/plugin_${val.split(" ")[0]}.ts`)
        .then(
          (res: {
            install: (val: string, clearInputCallBack?: () => void) => void;
          }) => {
            res.install(val, clearInputCallBack);
          }
        )
        .catch((err) => {
          console.log(err);
          // try to resolve it as windows command
          location.href = "cmd://" + val;
          //   toast(
          //     "cannot find corresponding plugin, please check you spell or install function" +
          //       err
          //   );
        });
    },
  },
  {
    // match custom protocol including http:// or https://
    cmd: /.*?:\/\/.+/,
    handler(val) {
      // extract url from input
      let url: RegExpExecArray | null = new RegExp(
        /(http|https):\/\/.*/ //[a-z\.\/%0-9A-Z#&-]*
      ).exec(val);
      if (url) location.href = url[0];
      else location.href = val;
    },
  },
  // {
  //   // If the input contains http:// or https://, open the corresponding URL
  //   cmd: /(http|https):\/\//,
  //   handler(val) {
  //     let url: RegExpExecArray | null = new RegExp(
  //       /(http|https):\/\/.*/ //[a-z\.\/%0-9A-Z#&-]*
  //     ).exec(val);
  //     if (url) window.open(url[0]);
  //     else encryptAndForward(localStorage.getItem("searchEngine"), val);
  //   },
  // },
  {
    // If the input starts with "baidu ", search on Baidu
    cmd: /^(baidu )/,
    handler(val) {
      encryptAndForward("baidu", val);
    },
  },
  {
    // If the input starts with "sougou ", search on sougou
    cmd: /^(sougou |s )/,
    handler(val) {
      encryptAndForward("sougou", val);
    },
  },
  {
    // If the input starts with "google ", search on Google
    cmd: /^(google |g )/,
    handler(val) {
      encryptAndForward("google", val);
    },
  },
  {
    // If the input starts with "bilibili ", search on bilibili
    cmd: /^(bilibili |b )/,
    handler(val) {
      location.href = `https://search.bilibili.com/all?keyword=${encodeURIComponent(
        //val.replace("bilibili ", "")
        // val.substring(val.indexOf(" ") + 1)
        stripCmdHead(val)
      )}`;
    },
  },
  // {
  //   // If the input contains Chinese characters, search on Baidu
  //   cmd: /[\u2E80-\uFE4F]/,
  //   handler(val) {
  //     encryptAndForward("baidu", val);
  //   },
  // },
  {
    // If the input matches none of the above commands, search using the default search engine
    cmd: /.+/,
    handler(val) {
      let shortcut =
        keywordList && keywordList.find((ele) => ele.key === val)?.url;
      shortcut
        ? (location.href = shortcut)
        : encryptAndForward(localStorage.getItem("searchEngine"), val);
    },
  },
  {
    // if you press enter directly with no input, it will return clipboard for you.
    cmd: /.*/,
    handler(_) {
      navigator.clipboard.readText().then((val) => {
        if (val.startsWith("http")) {
          window.location.href = val;
        } else {
          encryptAndForward(localStorage.getItem("searchEngine"), val);
        }
      });
    },
  },
];

// Encode the input and forward it to the corresponding search engine
function encryptAndForward(engine: string | null, val: string) {
  localStorage.setItem("lastInputVal", val);
  window.location.href =
    (engine === "google"
      ? "https://www.google.com/search?q="
      : engine === "sougou"
      ? "https://www.sogou.com/web?query="
      : "https://www.baidu.com/s?wd=") +
    encodeURIComponent(val.replace(engine + " ", "")); //val.replace(engine + " ", "")
}

// Define a function to execute the appropriate command based on the input
export function goto(wd: string, clearInputCallBack?: () => void): void {
  //add debug break point
  // console.log("debug");
  // return;
  // Find the first command that matches the input and execute its handler function
  const cmd = command.find((val) => new RegExp(val.cmd).test(wd));
  if (!cmd) return;
  cmd.handler(wd, clearInputCallBack);
}
