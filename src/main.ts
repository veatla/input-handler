import "./style.css";

const content = document.createElement("div");

const special_keys = [
  "Alt",
  "Control",
  "Escape",
  "Tab",
  "Shift",
  "NumLock",
  "Delete",
  "Insert",
  "Enter",
  "CapsLock",
  "End",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowUp",
  "Clear",
  "Home",
  "PageUp",
  "PageDown",
];

const getKeyboardEventValue = (event: KeyboardEvent, value: string): string => {
  let content = value;

  if (special_keys.includes(event.key)) return value;

  switch (event.key) {
    case "Backspace":
      content = content.slice(0, content.length - 1);
      break;

    default:
      if (/F([0-9])+/.test(event.key)) break;
      content += event.key;
      break;
  }

  return content;
};

const inputHandler = (event: KeyboardEvent) => {
  content.textContent = getKeyboardEventValue(event, content.textContent || "");
};

window.addEventListener("keydown", inputHandler);
const root = document.getElementById("app");

root?.append(content);
