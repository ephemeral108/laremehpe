import styles from "./Index.module.css";
import { setVal } from "../../components/Toast/Toast";
import { Menu } from "../../components/Menu/Menu";
import { useEffect, useState, useRef } from "react";
import { goto } from "../../utils/common/common";
import { backend } from "../../utils/backend/backend";
import { ping } from "../../utils/common/ping";
import { Memo } from "../../components/Memo/Memo";

window.cloud = null;

window.onload = function () {
  cloud = backend.getInstance(); //new backend();
};

document.addEventListener("visibilitychange", function () {
  if (document.visibilityState === "visible") {
    document.getElementById("input").focus();
    const oldNode = document.getElementsByTagName("title")[0];
    const newNode = document.createElement("title");
    newNode.innerText = "laremehpe";
    oldNode.parentNode.replaceChild(newNode, oldNode);
  } else if (document.visibilityState === "hidden") {
    const oldNode = document.getElementsByTagName("title")[0];
    const newNode = document.createElement("title");
    newNode.innerText = "waiting...";
    oldNode.parentNode.replaceChild(newNode, oldNode);
  }
});

function getRec(val) {
  let o = document.getElementById("script");
  let s = document.createElement("script");
  s.setAttribute("id", "script");
  s.src = `https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=${val}&cb=callBack`;
  o.parentNode.replaceChild(s, o);
}

let text = "";
let menuContent = { s: [] };
let client = window.screen.width > 425; // true computer false mobile
let inputStatus = false; // false => blur, true => focus

export function Index() {
  const myRef = useRef(null);

  useEffect(() => {
    setVal("Welcom back!");
    setInputVal("");
    setConfig({
      wallpaper: localStorage.getItem("wallpaper") || "./wallpaper.jpg",
      width: window.screen.width * 1.1 + "px", //wallpaper
      height: window.screen.height * 1.1 + "px", //wallpaper
    });
    localStorage.setItem("searchEngine", "baidu");
    const googleLogo =
      "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png";
    ping(googleLogo, false).then(() => {
      setVal("google search");
      localStorage.setItem("searchEngine", "google");
    });
  }, []);

  const [recArr, setRecArr] = useState([]);
  const [inputVal, setInputVal] = useState("");
  const [chosen, setChosen] = useState(-1);
  const [config, setConfig] = useState({});
  const [placeholder, setPlaceholder] = useState("search");
  const [menuHeight, setMenuHeight] = useState(0);

  const changeShadow = (val, backup = true) => {
    backup && (menuContent = val);
    if (inputStatus) {
      setMenuHeight(val.s.length * (client ? 44 : 38) + 15);
      setRecArr(val.s);
    } else {
      setMenuHeight(15);
      setRecArr([]);
    }
  };

  window.callBack = changeShadow;

  const searchHandler = ({ target: { value } }) => {
    setInputVal(value);
    text = value;

    if (!value) {
      changeShadow({ s: [] });
      return;
    }
    getRec(value);
  };

  function keyUp(val) {
    switch (val.keyCode) {
      case 13:
        goto(inputVal);
        text = "";
        blur();
        break;
      case 38: //up
        updateChosen(chosen - 1 > -2 ? chosen - 1 : recArr.length - 1);
        myRef.current.setSelectionRange(inputVal.length, inputVal.length);
        break;
      case 40: //down
        updateChosen(chosen + 1 > recArr.length ? 0 : chosen + 1);
        myRef.current.setSelectionRange(inputVal.length, inputVal.length);
        break;
      default:
        setChosen(-1);
        break;
    }
  }

  function updateChosen(e) {
    setInputVal(recArr[e] || text);
    setChosen(e);
  }

  function blur() {
    // setTimeout(() => {
    // false => blur, true => focus
    inputStatus = false;
    setPlaceholder("search");
    setInputVal(text);
    setChosen(-1);
    changeShadow({ s: [] }, false);
    // }, 500);
  }

  function focus() {
    // false => blur, true => focus
    inputStatus = true;
    setPlaceholder("Never stop learning...");
    changeShadow(menuContent);
    inputVal.length && myRef.current.setSelectionRange(0, inputVal.length);
  }

  // function inputSelect() {
  //   myRef.current.setSelectionRange(0, inputVal.length);
  // }

  async function clipboard() {
    let receive;
    try {
      const send = await navigator.clipboard.readText();
      setVal(send);
      receive = (await cloud.copy()).get("word");
      setInputVal(receive);
      await navigator.clipboard.writeText(receive);
      cloud.paste(send);
    } catch (e) {
      receive = (await cloud.copy()).get("word");
      cloud.paste(inputVal);
      setInputVal(receive);
    }
  }

  function clearText() {
    text = "";
    menuContent = { s: [] };
    setInputVal("");
    setRecArr([]);
  }

  return (
    <div className={styles.box}>
      <div
        style={{
          backgroundImage: `url(${config.wallpaper})`,
          width: config.width,
          height: config.height,
        }}
        alt="wallpaper"
        className={styles.wallpaper}
      />
      <div className={styles.headBox}></div>
      <div className={styles.logo}>
        <img
          src="/icon.png"
          alt="logo"
          title="stop and stare"
          id="logo"
          onClick={() => (window.location.href = "#/functions")}
        />
      </div>
      <div className={styles.frame}>
        <input
          id="input"
          type="text"
          value={inputVal}
          onChange={searchHandler}
          onKeyDown={keyUp}
          onBlur={blur}
          onFocus={focus}
          placeholder={placeholder}
          autoFocus
          ref={myRef}
        />
        <img src="/search.svg" alt="search logo" onClick={clipboard} />
        <div className={styles.menu} style={{ height: menuHeight + "px" }}>
          <Menu
            arr={recArr}
            chosen={chosen}
            updateChosen={(e) => setChosen(e)}
            onLeave={() => (setChosen(-1), setInputVal(text))}
          />
        </div>
      </div>
      <Memo
        show={
          placeholder === "search" &&
          localStorage.getItem("memoStatus") === "true"
        }
        inputText={inputVal}
        cloud={cloud}
        clearText={clearText}
      />
    </div>
  );
}
