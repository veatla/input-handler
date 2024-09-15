import { cursorCoordinatorKeys, CursorCoordinatorKeys } from "./constants/keys";
import { cursor, cursor_element } from "./cursor/cursor";
import "./font.css";
import "./style.css";
import { isInputKey, isFunctionalKey, setCursor } from "./util/keyEvent";
export const wrapper = document.createElement("div");

const getKeyboardEventValue = (event: KeyboardEvent, element: Element) => {
  let content = element.textContent || "";
  let col = cursor.col,
    line = cursor.line;
  switch (event.key) {
    case "Tab":
      content += `&nbsp;&nbsp;`;
      col += 2;
      break;

    case "Backspace":
      content = content.slice(0, cursor.col - 1) + content.slice(cursor.col);
      if (cursor.col - 1 < 0) {
        if (cursor.line >= 0) {
          col =
            element.parentElement!.previousSibling?.textContent?.length || 0;
          line -= 1;
          element.remove();
        }
      } else {
        col -= 1;
      }
      break;

    case "Delete":
      content = content.slice(0, cursor.col) + content.slice(cursor.col + 1);
      break;

    default:
      if (event.ctrlKey || event.metaKey || event.altKey) break;
      content =
        content.slice(0, cursor.col) + event.key + content.slice(cursor.col);

      col += 1;
      break;
  }

  element.textContent = content;
  return {
    col,
    line,
  };
};

const createBlock = (line: number) => {
  const block = document.createElement("div");
  block.setAttribute("data-line", String(line));
  block.classList.add("block");
  const element = document.createElement("span");
  block.appendChild(element);
  return element;
}

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
    element = createBlock(cursor.line + 1);
    wrapper.appendChild(element.parentElement!);
  }

  if (event.key === "Enter") {
    const new_element = createBlock(cursor.line + 2);
    new_element.textContent = "";
    element.parentElement!.after(new_element.parentElement!);
    new_element.scrollIntoView();
    setTimeout(() => {
      cursor.set(0, cursor.line + 1);
      cursor.updateCursorPos(0, cursor.line);
    }, 0);
    return;
  }
  const val = getKeyboardEventValue(event, element);
  element.scrollIntoView();
  cursor.set(val.col, val.line);
  cursor.updateCursorPos(val.col, val.line);
};

window.addEventListener("keydown", inputHandler);
const root = document.getElementById("app");

root?.append(wrapper, cursor_element);
