export function copyText(text: string): Promise<void> {
  if (window.Clipboard) {
    const clip = new Clipboard();
    return clip.writeText(text);
  }

  var element = createElement(text);
  element.select();
  element.setSelectionRange(0, element.value.length);
  document.execCommand("copy");
  element.remove();

  return Promise.resolve();
}

function createElement(text: string) {
  var isRTL = document.documentElement.getAttribute("dir") === "rtl";
  var element = document.createElement("textarea");
  element.style.fontSize = "12pt";
  element.style.border = "0";
  element.style.padding = "0";
  element.style.margin = "0";
  element.style.position = "absolute";
  element.style[isRTL ? "right" : "left"] = "-9999px";
  let yPosition = window.pageYOffset || document.documentElement.scrollTop;
  element.style.top = `${yPosition}px`;
  element.setAttribute("readonly", "");
  element.value = text;
  document.body.appendChild(element);
  return element;
}
