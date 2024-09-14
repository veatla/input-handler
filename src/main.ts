import { cursor } from "./cursor";
import "./font.css";
import "./style.css";
import getTextSize from "./util/textDimension";

//  KEY HANDLER UTILS START
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

type CursorCoordinatorKeys = (typeof cursorCoordinatorKeys)[number];

const isInputKey = (key: string): boolean => {
  return !special_keys.includes(key) || inputModifierKeys.includes(key);
};

const isFunctionalKey = (key: string): boolean => {
  if (/F([0-9])+/.test(key)) return true;
  return false;
};
//  KEY HANDLER UTILS END

const wrapper = document.createElement("div");

const cursor_element = document.createElement("div");

const block = document.createElement("div");
const text = document.createElement('span');

cursor_element.classList.add("cursor");

cursor.on(() => {
  const height = cursor_element.clientHeight;
  // cursor_element.style.left = `${cursor.col * 10}px`;
  cursor_element.style.top = `${height * cursor.line}px`;
  updateCursorPosition();
});

const updateCursorPosition = () => {
  const element = wrapper.querySelector(`div:nth-of-type(${cursor.line + 1}) span`);
  if (element instanceof HTMLSpanElement) {
    const size = getTextSize(element);

    cursor_element.style.left = size;
  }
};

setInterval(() => {
  const visibility = cursor_element.style.visibility;
  cursor_element.style.visibility =
    visibility === "visible" ? "hidden" : "visible";
}, 500);

const getKeyboardEventValue = (event: KeyboardEvent, value: string): string => {
  let content = value;

  switch (event.key) {
    case "Tab":
      content += `&nbsp;`;
      break;

    case "Backspace":
      content = content.slice(0, content.length - 1);
      break;

    default:
      if (event.ctrlKey || event.metaKey || event.altKey) break;
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
  if (cursorCoordinatorKeys.includes(event.key as CursorCoordinatorKeys)) {
    setCursor(event.key);
    return;
  }
  if (!isInputKey(event.key)) return;
  event.preventDefault();

  if (isFunctionalKey(event.key)) return;

  const value = getKeyboardEventValue(event, text.textContent || "");

  text.innerHTML = value;
  setTimeout(() => {
    cursor.set(cursor.col + 1, cursor.line);
  }, 0);
};

window.addEventListener("keydown", inputHandler);
const root = document.getElementById("app");

block.append(text);
wrapper.appendChild(block);
root?.append(wrapper, cursor_element);
