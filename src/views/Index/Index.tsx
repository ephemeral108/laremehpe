import styles from "./Index.module.css";
import { setVal } from "../../components/Toast/Toast";
import { Menu } from "../../components/Menu/Menu";
import { useEffect, useState, useRef } from "react";
import { goto } from "../../utils/common/common";
import { ping } from "../../utils/common/ping";
import { Memo } from "../../components/Memo/Memo";
import { useBackendContext } from "../../context/Backend";
import { useSelector } from "react-redux";
import { Rocket } from "../../components/Rocket/Rocket";
import { storeType } from "../../utils/common/store";
// import { useLocation } from "react-router-dom";

type recType = {
  q: string;
  p: boolean;
  s: string[];
};

function getRec(val: string) {
  let o = document.getElementById("script");
  let s = document.createElement("script");
  s.setAttribute("id", "script");
  s.src = `https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=${encodeURIComponent(
    val
  )}&cb=callBack`;
  o?.parentNode && o.parentNode.replaceChild(s, o);
}

// let computedMenuHeight = 0; // calculated menu height ...
let text = "";
// let client = window.screen.width > 425 && !/Mobile/i.test(navigator.userAgent); // true computer false mobile

const googleLogo =
  "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png";
const config = {
  wallpaper: localStorage.getItem("wallpaper") || "./wallpaper.jpg",
  width: window.screen.width * 1.1 + "px", //wallpaper
  height: window.screen.height * 1.1 + "px", //wallpaper
};

let inputFocusing = true;

// let memoRefresh: null | (() => Promise<void>) = null;
export function Index() {
  const myRef = useRef<HTMLInputElement>(null);
  const [recArr, setRecArr] = useState<string[]>([]);
  const [inputVal, setInputVal] = useState("");
  const [chosen, setChosen] = useState(-1);
  const [menuHeight, setMenuHeight] = useState<object>({});
  const [directive, setDirective] = useState(false);
  const { cloud } = useBackendContext();
  const [placeholder, setPlaceholder] = useState("never stop learning...");
  const store = useSelector<storeType>((state) => state.device);
  // const [memoRefresh,setMemoRefresh] = useState(undefined)

  useEffect(() => {
    localStorage.setItem("searchEngine", "baidu");
    ping(googleLogo, false)
      .then(() => {
        setVal && setVal("google search");
        localStorage.setItem("searchEngine", "google");
      })
      .catch(() => {});

    function changeEvent() {
      if (document.visibilityState === "visible") {
        myRef?.current?.focus();
        //mobile wont trigger focus event when go back from another tab please be aware!!!
        focus();
        //
        const oldNode = document.getElementsByTagName("title")[0];
        const newNode = document.createElement("title");
        newNode.innerText = "laremehpe";
        oldNode?.parentNode?.replaceChild(newNode, oldNode);
      } else if (document.visibilityState === "hidden") {
        myRef?.current?.blur();
        //mobile wont trigger blur event either!!!
        blur();
        //
        const oldNode = document.getElementsByTagName("title")[0];
        const newNode = document.createElement("title");
        newNode.innerText = "waiting...";
        oldNode?.parentNode?.replaceChild(newNode, oldNode);
      }
    }

    function globalKeyEvent(val: KeyboardEvent) {
      // if (!(val.keyCode === 27 || val.keyCode === 13)) return;
      // console.log(val.keyCode);

      if (val.keyCode === 27) {
        if (inputFocusing) myRef.current?.blur();
        else myRef.current?.focus();
      }
      if (val.keyCode === 17) {
        window.location.href = "#/functions";
      }
    }
    document.addEventListener("visibilitychange", changeEvent);
    document.addEventListener("keydown", globalKeyEvent);

    Object.assign(window, {
      callBack: (val: recType) => {
        setInputVal((input) => {
          if (String(val.q).toUpperCase() !== String(input).toUpperCase())
            return input; // return if request call back is not correspond with input value
          // computedMenuHeight =
          //   val.s.length * (window.screen.width > 425 ? 44 : 38) + 15;
          // setMenuHeight(computedMenuHeight);
          setMenuHeight({
            maxHeight: "561px",
          });
          setRecArr(val.s);
          return input;
        });
      },
    });

    // console.log(inputFocusing, "inputFocusing");

    return () => {
      document.removeEventListener("visibilitychange", changeEvent);
      document.removeEventListener("keydown", globalKeyEvent);
    };
  }, []);

  const searchHandler: (val: { target: { value: string } }) => void = ({
    target: { value },
  }) => {
    setInputVal(value);
    setDirective(value.startsWith(" "));

    text = value;
    if (!value) {
      setRecArr([]);
      // computedMenuHeight = 0;
      // setMenuHeight(computedMenuHeight);
      setMenuHeight({
        maxHeight: "0px",
      });
      return;
    }
    getRec(value);
  };

  function keyUp(val: { keyCode: number }) {
    switch (val.keyCode) {
      case 13:
        goto(inputVal, () => {
          setInputVal("");
          setDirective(false); // set command font weight to normal
          // memoRefresh && memoRefresh();
        });
        // blur();
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

  function updateChosen(e: number) {
    setInputVal(recArr[e] || text);
    setChosen(e);
  }

  function blur() {
    inputFocusing = false;
    setChosen(-1);
    // setMenuHeight(0);
    setMenuHeight({
      maxHeight: "0px",
    });
    //wait until animation finish
    setTimeout(() => {
      if (!inputFocusing) setPlaceholder("search");
    }, 500);

    // setState((state) => ({
    //   ...state,
    //   blur: state.blur + 1,
    // }));
  }

  function focus() {
    inputFocusing = true;
    // computedMenuHeight =
    //   recArr.length * (window.screen.width > 425 ? 44 : 38) + 15;
    // setMenuHeight(computedMenuHeight);
    // setMenuHeight("auto");
    setMenuHeight({
      maxHeight: recArr.length ? "561px" : "0px",
    });
    setPlaceholder("never stop learning...");

    // setState((state) => ({
    //   ...state,
    //   focus: state.focus + 1,
    // }));
  }

  const openUrl = (url: string) => {
    if (url.startsWith("http")) {
      setVal && setVal("try to open url for ya!");
      window.open(url);
    }
  };
  async function clipboard() {
    let receive;
    try {
      const send = await navigator.clipboard.readText();
      setVal && setVal(send);
      receive = (await cloud.copy()).get("content");
      setInputVal(receive);
      await navigator.clipboard.writeText(receive);
      await cloud.paste(send);
      openUrl(receive);
    } catch (e) {
      receive = (await cloud.copy()).get("content");
      await cloud.paste(inputVal);
      setInputVal(receive);
      openUrl(receive);
    }
  }

  function clearText() {
    text = "";
    // menuContent = { s: [] };
    setInputVal("");
    setRecArr([]);
    setDirective(false);
    setTimeout(() => {
      document.getElementById("input")?.focus();
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
          // width: config.width,
          height: config.height,
        }}
        // alt="wallpaper"
        className={styles.wallpaper}
      />
      <div className={styles.headBox}></div>
      <div className={styles.logo}>
        <button>
          <img
            src="./icon.png"
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
        <img
          src="./search.svg"
          alt="search logo"
          onClick={clipboard}
          className={styles.searchIcon}
        />
        {inputVal.length > 0 && placeholder !== "search" ? (
          <img
            src="/clear.png"
            alt="clear icon"
            onClick={(_) => {
              setInputVal("");
              setRecArr([]);
              setDirective(false);
              myRef.current?.focus();
              setMenuHeight({ maxHeight: "0px" });
              //
            }}
            className={styles.clearIcon}
          />
        ) : (
          ""
        )}
        {/* style={{ height: menuHeight + "px" }} */}
        <div className={styles.menu} style={menuHeight}>
          <Menu
            arr={recArr}
            chosen={chosen}
            updateChosen={(e) => {
              setChosen(e);
              setInputVal(recArr[e]);
            }}
            // setInputVal={(e) => setInputVal(e)}
            clickItem={(e: string) => {
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
        show={
          localStorage.getItem("memoStatus") === "true" &&
          placeholder === "search"
        }
        inputText={inputVal}
        clearText={clearText}
        // refresh={(cb) => {
        //   memoRefresh = cb;
        // }}
      />
      {store === "computer" ? <Rocket /> : ""}
    </div>
  );
}
