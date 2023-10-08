import styles from "./Index.module.css";
import { setVal } from "../../components/Toast/Toast";
import { Menu } from "../../components/Menu/Menu";
import { useEffect, useState, useRef } from "react";
import { goto } from "../../utils/common/common";
import { ping } from "../../utils/common/ping";
import { Memo } from "../../components/Memo/Memo";
import { useBackendContext } from "../../context/Backend";
// import { useLocation } from "react-router-dom";

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
let client = window.screen.width > 425; // true computer false mobile
const googleLogo =
  "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png";
const config = {
  wallpaper: localStorage.getItem("wallpaper") || "./wallpaper.jpg",
  width: window.screen.width * 1.1 + "px", //wallpaper
  height: window.screen.height * 1.1 + "px", //wallpaper
};

export function Index() {
  const myRef = useRef(null);
  const [recArr, setRecArr] = useState([]);
  const [inputVal, setInputVal] = useState("");
  const [chosen, setChosen] = useState(-1);
  const [menuHeight, setMenuHeight] = useState(0);
  const [directive, setDirective] = useState(false);
  const { cloud } = useBackendContext();
  const [placeholder, setPlaceholder] = useState("never stop learning...");
  // const [state, setState] = useState({
  //   focus: 0,
  //   blur: 0,
  //   come: 0,
  //   leave: 0,
  // });
  // const { path } = useLocation();

  // useEffect(() => {
  //   // console.log("back", recArr, inputVal);
  //   document.getElementById("input").focus();
  // }, [path]);

  useEffect(() => {
    localStorage.setItem("searchEngine", "baidu");
    ping(googleLogo, false).then(() => {
      setVal("google search");
      localStorage.setItem("searchEngine", "google");
    });

    function changeEvent() {
      if (document.visibilityState === "visible") {
        myRef.current.focus();
        //mobile wont trigger focus event when go back from another tab please be aware!!!
        focus();
        //
        const oldNode = document.getElementsByTagName("title")[0];
        const newNode = document.createElement("title");
        newNode.innerText = "laremehpe";
        oldNode.parentNode.replaceChild(newNode, oldNode);

        // setState((state) => ({
        //   ...state,
        //   come: state.come + 1,
        // }));
      } else if (document.visibilityState === "hidden") {
        myRef.current.blur();
        //mobile wont trigger blur event either!!!
        blur();
        //
        const oldNode = document.getElementsByTagName("title")[0];
        const newNode = document.createElement("title");
        newNode.innerText = "waiting...";
        oldNode.parentNode.replaceChild(newNode, oldNode);

        // setState((state) => ({
        //   ...state,
        //   leave: state.leave + 1,
        // }));
      }
    }

    document.addEventListener("visibilitychange", changeEvent);
    return () => {
      document.removeEventListener("visibilitychange", changeEvent);
    };
  }, []);

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
    setChosen(-1);
    setMenuHeight(0);
    setPlaceholder("search");

    // setState((state) => ({
    //   ...state,
    //   blur: state.blur + 1,
    // }));
  }

  function focus() {
    computedMenuHeight = recArr.length * (client ? 44 : 38) + 15;
    setMenuHeight(computedMenuHeight);
    setPlaceholder("never stop learning...");

    // setState((state) => ({
    //   ...state,
    //   focus: state.focus + 1,
    // }));
  }

  async function clipboard() {
    let receive;
    try {
      const send = await navigator.clipboard.readText();
      setVal(send);
      receive = (await cloud.copy()).get("content");
      setInputVal(receive);
      await navigator.clipboard.writeText(receive);
      cloud.paste(send);
    } catch (e) {
      receive = (await cloud.copy()).get("content");
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
      {/* for debug only please do not use in production environment */}
      {/* <div className={styles.stateBox}>
        {Object.keys(state).map((val) => {
          return <div key={val}>{val + "==>" + state[val]}</div>;
        })}
      </div> */}
      {/* for debug only please do not use in production environment */}
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
        <button>
          <img
            src="/icon.png"
            alt="logo"
            title="stop and stare"
            id="logo"
            onClick={() => (window.location.href = "#/functions")}
          />
        </button>
      </div>
      <div
        className={[styles.frame, directive ? styles.directive : ""].join(" ")}
      >
        <input
          id="input"
          type="text"
          value={inputVal}
          onChange={searchHandler}
          placeholder={placeholder}
          onKeyDown={keyUp}
          onBlur={blur}
          onFocus={focus}
          autoFocus
          ref={myRef}
          autoComplete="off"
        />
        <img src="/search.svg" alt="search logo" onClick={clipboard} />
        <div className={styles.menu} style={{ height: menuHeight + "px" }}>
          <Menu
            arr={recArr}
            chosen={chosen}
            updateChosen={(e) => {
              console.log("update chosen");
              setChosen(e);
              setInputVal(recArr[e]);
            }}
            // setInputVal={(e) => setInputVal(e)}
            clickItem={(e) => {
              setInputVal(e);
              text = e;
              setTimeout(() => {
                goto(e);
              }, 0);
            }}
            onLeave={() => {
              setChosen(-1);
              setInputVal(text);
            }}
          />
        </div>
      </div>
      <Memo
        show={localStorage.getItem("memoStatus") === "true"}
        inputText={inputVal}
        clearText={clearText}
      />
    </div>
  );
}
