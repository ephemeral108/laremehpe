import { useEffect } from "react";

export const useEscape = () => {
  useEffect(() => {
    const event = (ev: KeyboardEvent) => {
      if (ev.key !== "Escape") return;
      const inputs = Array.from(document.getElementsByTagName("input"));
      if (document?.activeElement?.tagName === "INPUT")
        inputs.forEach((input) => input.blur());
      else inputs[0].focus();
    };

    window.addEventListener("keydown", event);
    return () => {
      window.removeEventListener("keydown", event);
    };
  }, []);
};
