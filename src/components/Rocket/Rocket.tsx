import { useEffect, useRef, useState } from "react";
import styles from "./Rocket.module.css";

export const Rocket = () => {
  const rocketRef = useRef<HTMLImageElement>(null);
  useEffect(() => {
    const rocket = rocketRef.current;
    if (!(localStorage.getItem("rocket") === "true") || rocket === null) return;

    //let rocket = document.querySelector("#rocket") as HTMLElement;
    let deg = 0,
      ex = 0,
      ey = 0,
      vx = 0,
      vy = 0,
      count = 0;

    const mouseMoveEvent = (e) => {
      ex = e.x - rocket.offsetLeft - rocket.clientWidth / 2;
      ey = e.y - rocket.offsetTop - rocket.clientHeight / 2;
      deg = (Math.atan(ey / ex) / (Math.PI * 2)) * 360 + 45;
      if (ex > 0) {
        deg += 180;
      }
      count = 0;
    };
    window.addEventListener("mousemove", mouseMoveEvent);

    function move() {
      (rocket as HTMLImageElement).style.transform = `rotate(${deg}deg)`;
      count < 100 && ((vx += ex / 100), (vy += ey / 100));
      (rocket as HTMLImageElement).style.left = vx + "px";
      (rocket as HTMLImageElement).style.top = vy + "px";
      count++;
    }

    const timer = setInterval(move, 1);

    return () => {
      clearInterval(timer);
      window.removeEventListener("mousemove", mouseMoveEvent);
    };
  }, []);

  return (
    <img
      src="meteor.png"
      alt="rocket"
      id="rocket"
      ref={rocketRef}
      className={styles.rocket}
    />
  );
};
