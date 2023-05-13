import { setVal } from "../../components/Toast/Toast";
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
export function updateKeywordList(list: list) {
  // keywordList = list;
  location.reload();
}

// Fetch the list of placeholders from the backend and update the keyword list
backend
  .getInstance()
  ?.fetchPlaceholders()
  .then((res) => (keywordList = res.get("list")));

// Define an array of command objects with a cmd property and a handler function
const command: Array<{ cmd: RegExp; handler: (val: string) => void }> = [
  {
    // If the input starts with a space, load the corresponding plugin
    cmd: /^ /,
    handler(val) {
      val = val.replace(" ", "");
      import(`../plugins/plugin_${val.split(" ")[0]}.ts`)
        .then((res: { install: (val: string) => void }) => {
          res.install(val);
        })
        .catch((err) => {
          setVal(
            "cannot find corresponding plugin, please check you spell or install function"
          );
        });
    },
  },
  {
    // If the input contains http:// or https://, open the corresponding URL
    cmd: /(http|https):\/\//,
    handler(val) {
      let url: RegExpExecArray | null = new RegExp(
        /(http|https):\/\/.*/ //[a-z\.\/%0-9A-Z#&-]*
      ).exec(val);
      if (url) window.open(url[0]);
      else encryptAndForward(localStorage.getItem("searchEngine"), val);
    },
  },
  {
    // If the input starts with "baidu ", search on Baidu
    cmd: /^(baidu )/,
    handler(val) {
      encryptAndForward("baidu", val);
    },
  },
  {
    // If the input starts with "google ", search on Google
    cmd: /^(google )/,
    handler(val) {
      encryptAndForward("google", val);
    },
  },
  {
    // If the input starts with "bilibili ", search on bilibili
    cmd: /^(bilibili )/,
    handler(val) {
      `https://search.bilibili.com/all?keyword=${encodeURIComponent(
        val.replace("bilibili ", "")
      )}`;
    },
  },
  {
    // If the input contains Chinese characters, search on Baidu
    cmd: /[\u2E80-\uFE4F]/,
    handler(val) {
      encryptAndForward("baidu", val);
    },
  },
  {
    // If the input matches none of the above commands, search using the default search engine
    cmd: /.*/,
    handler(val) {
      let shortcut = keywordList.find((ele) => ele.key === val)?.url;
      shortcut
        ? (location.href = shortcut)
        : encryptAndForward(localStorage.getItem("searchEngine"), val);
    },
  },
];

// Encode the input and forward it to the corresponding search engine
function encryptAndForward(engine: string | null, val: string) {
  localStorage.setItem("lastInputVal", val);
  window.location.href =
    (engine === "google"
      ? "https://www.google.com/search?q="
      : "https://www.baidu.com/s?wd=") +
    encodeURIComponent(val.replace(engine + " ", ""));
}

// Define a function to execute the appropriate command based on the input
export function goto(wd: string) {
  //add debug break point
  // console.log('debug');
  // return;
  // Find the first command that matches the input and execute its handler function
  command.find((val) => new RegExp(val.cmd).test(wd))?.handler(wd);
}
