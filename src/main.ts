import { cursor } from "./cursor";
import "./font.css";
import "./style.css";

const element = document.createElement("div");
element.classList.add("cursor");

cursor.on(() => {
  const height = element.clientHeight;
  element.style.left = `${cursor.col * 10}px`;
  element.style.top = `${height * cursor.line}px`;
});

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
] as const;

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

const setCursor = (key: string) => {
  switch (key) {
    case cursorCoordinatorKeys["0"]:
      cursor.set(cursor.col, cursor.line + 1);
      break;

    case cursorCoordinatorKeys["1"]:
      cursor.set(Math.max(cursor.col - 1, 0), cursor.line);
      break;

    case cursorCoordinatorKeys["2"]:
      cursor.set(cursor.col + 1, cursor.line);
      break;

    case cursorCoordinatorKeys["3"]:
      cursor.set(cursor.col, Math.max(cursor.line - 1, 0));
      break;

    case cursorCoordinatorKeys["4"]:
      cursor.set(0, cursor.line);
      break;

    case cursorCoordinatorKeys["5"]:
      // TODO Calculate max col
      cursor.set(1, cursor.line);
      break;

    case cursorCoordinatorKeys["6"]:
      // TODO Calculate max col
      cursor.set(1, cursor.line);
      break;

    default:
      break;
  }
};

const inputHandler = (event: KeyboardEvent) => {
  if (
    cursorCoordinatorKeys.includes(
      event.key as (typeof cursorCoordinatorKeys)[number]
    )
  ) {
    setCursor(event.key);
    return;
  }
  if (!isInputKey(event.key)) return;
  event.preventDefault();

  block.textContent = getKeyboardEventValue(event, block.textContent || "");
};

window.addEventListener("keydown", inputHandler);
const root = document.getElementById("app");

root?.append(block, element);
