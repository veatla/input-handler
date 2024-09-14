import CONFIG from "./config";
import { cursorCoordinatorKeys, CursorCoordinatorKeys } from "./constants/keys";
import { cursor, cursor_element } from "./cursor/cursor";
import "./font.css";
import "./style.css";
import { isInputKey, isFunctionalKey, setCursor } from "./util/keyEvent";
import getTextSize from "./util/textDimension";

const wrapper = document.createElement("div");

cursor.on(() => {
  const height = cursor_element.clientHeight;
  // cursor_element.style.left = `${cursor.col * 10}px`;
  cursor_element.style.top = `${height * cursor.line}px`;
  updateCursorPosition();
});

const updateCursorPosition = () => {
  const element = wrapper.querySelector(
    `div:nth-of-type(${cursor.line + 1}) span`
  );
  if (element instanceof HTMLSpanElement) {
    const size = getTextSize(element);

    cursor_element.style.left = size;
    cursor_element.style.top = `${
      parseInt(CONFIG.lineHeight) * cursor.line + 1
    }px`;
  }
};

const getKeyboardEventValue = (event: KeyboardEvent, value: string): string => {
  let content = value;

  switch (event.key) {
    case "Tab":
      content += `&nbsp;&nbsp;`;

      setTimeout(() => {
        cursor.set(cursor.col + 2, cursor.line);
      }, 0);
      break;

    case "Backspace":
      content = content.slice(0, cursor.col - 1) + content.slice(cursor.col);

      setTimeout(() => {
        cursor.set(cursor.col - 1, cursor.line);
      }, 0);
      break;

    case "Delete":
      content = content.slice(0, cursor.col) + content.slice(cursor.col + 1);
      break;

    default:
      if (event.ctrlKey || event.metaKey || event.altKey) break;
      content =
        content.slice(0, cursor.col) + event.key + content.slice(cursor.col);

      setTimeout(() => {
        cursor.set(cursor.col + 1, cursor.line);
      }, 0);
      break;
  }

  return content;
};

const inputHandler = (event: KeyboardEvent) => {
  if (cursorCoordinatorKeys.includes(event.key as CursorCoordinatorKeys)) {
    setCursor(event.key);
    return;
  }
  if (!isInputKey(event.key)) return;
  event.preventDefault();

  if (isFunctionalKey(event.key)) return;

  let element = wrapper.querySelector(
    `div:nth-of-type(${cursor.line + 1}) span`
  );

  if (!element) {
    const block = document.createElement("div");
    element = document.createElement("span");
    block.appendChild(element);
    wrapper.appendChild(block);
  }

  if (event.key === "Enter") {
    const block = document.createElement("div");
    const new_element = document.createElement("span");
    new_element.textContent = "";
    block.appendChild(new_element);
    element.parentElement!.after(block);
    cursor.set(0, cursor.line + 1);
    return;
  }
  const value = getKeyboardEventValue(event, element.textContent || "");

  element.innerHTML = value;
};

window.addEventListener("keydown", inputHandler);
const root = document.getElementById("app");

root?.append(wrapper, cursor_element);
