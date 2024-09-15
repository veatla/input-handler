import CONFIG from "./config";
import { cursorCoordinatorKeys, CursorCoordinatorKeys } from "./constants/keys";
import { cursor, cursor_element } from "./cursor/cursor";
import "./font.css";
import "./style.css";
import { isInputKey, isFunctionalKey, setCursor } from "./util/keyEvent";
export const wrapper = document.createElement("div");

const getKeyboardEventValue = (event: KeyboardEvent, element: Element) => {
  let content = element.textContent || "";
  let col = 0,
    line = 0;
  switch (event.key) {
    case "Tab":
      content += `&nbsp;&nbsp;`;
      col = cursor.col + 2;
      line = cursor.line;
      break;

    case "Backspace":
      content = content.slice(0, cursor.col - 1) + content.slice(cursor.col);
      if (cursor.col - 1 < 0) {
        if (cursor.line >= 0) {
          col =
            element.parentElement!.previousSibling?.textContent?.length || 0;
          line = cursor.line - 1;
          element.remove();
        }
      } else {
        line = cursor.line;
        col = cursor.col - 1;
      }
      break;

    case "Delete":
      content = content.slice(0, cursor.col) + content.slice(cursor.col + 1);
      break;

    default:
      if (event.ctrlKey || event.metaKey || event.altKey) break;
      content =
        content.slice(0, cursor.col) + event.key + content.slice(cursor.col);

      col = cursor.col + 1;
      line = cursor.line;
      break;
  }

  element.textContent = content;
  return {
    col, line
  }
};

const inputHandler = (event: KeyboardEvent) => {
  if (cursorCoordinatorKeys.includes(event.key as CursorCoordinatorKeys)) {
    setCursor(event.key);
    return;
  }
  if (!isInputKey(event.key)) return;
  if (event.ctrlKey || event.metaKey || event.altKey) return;
  event.preventDefault();

  if (isFunctionalKey(event.key)) return;

  let element = wrapper.querySelector(
    `div[data-line="${cursor.line + 1}"] span`
  );

  if (!element) {
    const block = document.createElement("div");
    block.setAttribute("data-line", String(cursor.line + 1));
    block.classList.add("block");
    element = document.createElement("span");
    block.appendChild(element);
    wrapper.appendChild(block);
  }

  if (event.key === "Enter") {
    const block = document.createElement("div");
    block.classList.add("block");
    block.setAttribute("data-line", String(cursor.line + 2));
    const new_element = document.createElement("span");
    new_element.textContent = "";
    block.appendChild(new_element);
    element.parentElement!.after(block);

    new_element.scrollIntoView();
    cursor.set(0, cursor.line + 1);
    cursor.updateCursorPos(0, cursor.line + 1);
    return;
  }
  const val = getKeyboardEventValue(event, element);
  element.scrollIntoView();
  cursor.updateCursorPos(val.line, val.col);
};

window.addEventListener("keydown", inputHandler);
const root = document.getElementById("app");

root?.append(wrapper, cursor_element);
