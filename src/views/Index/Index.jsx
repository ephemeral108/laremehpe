import styles from "./Index.module.css";
import { setVal } from "../../components/Toast/Toast";
import { Menu } from "../../components/Menu/Menu";
import { useEffect, useState, useRef } from "react";
import { goto } from "../../utils/common/common";
import { ping } from "../../utils/common/ping";
import { Memo } from "../../components/Memo/Memo";
import { useBackendContext } from "../../context/Backend";

function getRec(val) {
  let o = document.getElementById("script");
  let s = document.createElement("script");
  s.setAttribute("id", "script");
  s.src = `https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=${encodeURIComponent(
    val
  )}&cb=callBack`;
  o.parentNode.replaceChild(s, o);
}

let computedMenuHeight = 0; // calculated menu height ...
let text = "";
// let menuContent = { s: [] };
let client = window.screen.width > 425; // true computer false mobile
let shouldBlur = true; // determine whether should blur
const googleLogo =
  "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png";
const config = {
  wallpaper: localStorage.getItem("wallpaper") || "./wallpaper.jpg",
  width: window.screen.width * 1.1 + "px", //wallpaper
  height: window.screen.height * 1.1 + "px", //wallpaper
};

export function Index() {
  const myRef = useRef(null);
  useEffect(() => {
    localStorage.setItem("searchEngine", "baidu");
    ping(googleLogo, false).then(() => {
      setVal("google search");
      localStorage.setItem("searchEngine", "google");
    });

    function changeEvent() {
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
    }

    document.addEventListener("visibilitychange", changeEvent);

    return () => {
      document.removeEventListener("visibilitychange", changeEvent);
    };
  }, []);

  const [recArr, setRecArr] = useState([]);
  const [inputVal, setInputVal] = useState("");
  const [chosen, setChosen] = useState(-1);
  const [placeholder, setPlaceholder] = useState("search");
  const [menuHeight, setMenuHeight] = useState(0);
  const [directive, setDirective] = useState(false);
  const { cloud } = useBackendContext();

  window.callBack = (val) => {
    if (String(val.q).toUpperCase() !== String(inputVal).toUpperCase()) return; // return if request call back is not correspond with input value
    computedMenuHeight = val.s.length * (client ? 44 : 38) + 15;
    setMenuHeight(computedMenuHeight);
    setRecArr(val.s);
  };

  const searchHandler = ({ target: { value } }) => {
    setInputVal(value);
    setDirective(value.startsWith(" "));

    text = value;
    if (!value) {
      setRecArr([]);
      computedMenuHeight = 0;
      setMenuHeight(computedMenuHeight);
      return;
    }
    getRec(value);
  };

  function keyUp(val) {
    switch (val.keyCode) {
      case 13:
        goto(inputVal);
        shouldBlur = false;
        blur();
        break;
      case 38: //up
        updateChosen(chosen - 1 > -2 ? chosen - 1 : recArr.length - 1);
        break;
      case 40: //down
        updateChosen(chosen + 1 > recArr.length ? 0 : chosen + 1);
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
    setTimeout(() => {
      //wait for animation to be finished
      setPlaceholder("search");
    }, 400);
    shouldBlur ? setInputVal(text) : "";
    setChosen(-1);
    setMenuHeight(0);
  }

  function focus() {
    setPlaceholder("Never stop learning...");
    setMenuHeight(computedMenuHeight);
  }

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
    setDirective(false);
    setTimeout(() => {
      document.getElementById("input").focus();
    }, 0);
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
      <div
        className={[styles.frame, directive ? styles.directive : ""].join(" ")}
      >
        {/* shouldBlur ? blur : () => {} */}
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
          autoComplete="off"
          // onClick={() => changeShadow(menuContent)}
        />
        <img src="/search.svg" alt="search logo" onClick={clipboard} />
        <div className={styles.menu} style={{ height: menuHeight + "px" }}>
          <Menu
            arr={recArr}
            chosen={chosen}
            updateChosen={(e) => {
              setChosen(e);
              setInputVal(recArr[e]);
            }}
            setInputVal={(e) => ((shouldBlur = false), setInputVal(e))}
            onLeave={() => {
              // console.log("leave");
              setChosen(-1);
              setInputVal(text);
              // shouldBlur ? (setChosen(-1), setInputVal(text)) : "";
            }}
          />
        </div>
      </div>
      <Memo
        show={
          placeholder === "search" &&
          localStorage.getItem("memoStatus") === "true"
        }
        inputText={inputVal}
        clearText={clearText}
      />
    </div>
  );
}
