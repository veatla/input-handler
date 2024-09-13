import "./font.css";
import "./style.css";

const block = document.createElement("div");

const inputModifierKeys = ["Enter", "Tab", "Delete", "Backspace"];

const cursorCoordinatorKeys = [
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowUp",
  "Home",
  "End",
  "PageUp",
  "PageDown",
];

const special_keys = [
  "Alt",
  "Control",
  "Escape",
  "Shift",
  "NumLock",
  "Insert",
  "CapsLock",

  // Numpad5 & NumLock Disabled
  "Clear",

  ...cursorCoordinatorKeys,
  ...inputModifierKeys,
];

const isInputKey = (key: string): boolean => {
  return !special_keys.includes(key) || inputModifierKeys.includes(key);
};

const getKeyboardEventValue = (event: KeyboardEvent, value: string): string => {
  let content = value;

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
  if (!isInputKey(event.key)) return;
  event.preventDefault();

  block.textContent = getKeyboardEventValue(event, block.textContent || "");
};

window.addEventListener("keydown", inputHandler);
const root = document.getElementById("app");

root?.append(block);
