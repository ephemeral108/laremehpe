import styles from "./Index.module.css";
import { setVal } from "../../components/Toast/Toast";
import { Menu } from "../../components/Menu/Menu";
import { useEffect, useState, useRef } from "react";
import { goto } from "../../utils/common/common";

function getRec(val) {
  let o = document.getElementById("script");
  let s = document.createElement("script");
  s.setAttribute("id", "script");
  s.src = `https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=${val}&cb=callBack`;
  o.parentNode.replaceChild(s, o);
}

let text = "";

export function Index() {
  const myRef = useRef(null);

  useEffect(() => {
    setVal("Welcom back!");
    setInputVal("");
    setConfig({
      wallpaper: localStorage.getItem("wallpaper") || "./wallpaper.jpg",
    });
  }, []);

  const [recArr, setRecArr] = useState([]);
  const [inputVal, setInputVal] = useState("");
  const [chosen, setChosen] = useState(-1);
  const [config, setConfig] = useState({});
  const [placeholder, setPlaceholder] = useState("search");

  window.callBack = function (val) {
    setRecArr(val.s);
  };

  const searchHandler = ({ target: { value } }) => {
    setInputVal(value);
    text = value;

    if (!value) {
      setRecArr([]);
      return;
    }
    getRec(value);
  };

  function keyUp(val) {
    switch (val.keyCode) {
      case 13:
        goto(inputVal);
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
    setPlaceholder("search");
    setInputVal(text);
    setChosen(-1);
  }

  function focus() {
    setPlaceholder("Never stop learning...");
  }

  function inputSelect() {
    myRef.current.setSelectionRange(0, inputVal.length);
  }

  return (
    <div className={styles.box}>
      <img
        src={config.wallpaper}
        alt="wallpaper"
        className={styles.wallpaper}
      />
      <div className={styles.headBox}></div>
      <div className={styles.logo}>
        <img src="/icon.png" alt="logo" title="stop and stare" />
      </div>
      <div className={styles.frame}>
        <input
          type="text"
          value={inputVal}
          onChange={searchHandler}
          onKeyDown={keyUp}
          onBlur={blur}
          onFocus={focus}
          placeholder={placeholder}
          autoFocus
          onClick={inputSelect}
          ref={myRef}
        />
        <img src="/search.svg" alt="search logo" />
        <div className={styles.menu}>
          <Menu
            arr={recArr}
            chosen={chosen}
            updateChosen={(e) => setChosen(e)}
            onLeave={() => (setChosen(-1), setInputVal(text))}
          />
        </div>
      </div>
    </div>
  );
}
