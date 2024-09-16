import { cursorCoordinatorKeys, CursorCoordinatorKeys } from "./constants/keys";
import { cursor, cursor_element } from "./cursor/cursor";
import "./font.css";
import "./style.css";
import { isInputKey, isFunctionalKey, setCursor } from "./util/keyEvent";

export const wrapper = document.createElement("div");

const insertString = (element: Element, str: string, col: number) => {
  let html = element.innerHTML.replace(/&nbsp;/g, " ");

  html = html.slice(0, col) + str + html.slice(col);

  element.innerHTML = html.replace(/ /g, "&nbsp;");
};

const removeString = (element: Element, start: number, end: number) => {
  let html = element.innerHTML.replace(/&nbsp;/g, " ");

  html = html.slice(0, start) + html.slice(end);

  element.textContent = html.replace(/ /g, "&nbsp;");
};

const getKeyboardEventValue = (event: KeyboardEvent, element: Element) => {
  let col = cursor.col,
    line = cursor.line;

  if (!cursor.total[line]) cursor.total = [];
  switch (event.key) {
    case "Tab":
      element.innerHTML += `&nbsp;&nbsp;`;
      col += 2;
      cursor.total[line] = col;
      break;

    case "Backspace":
      removeString(element, cursor.col - 1, cursor.col);
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
      element.innerHTML =
        element.innerHTML.slice(0, cursor.col) +
        element.innerHTML.slice(cursor.col + 1);
      break;

    default:
      if (event.ctrlKey || event.metaKey || event.altKey) break;
      insertString(element, event.key, col);
      col += 1;
      break;
  }

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
};

const inputHandler = (event: KeyboardEvent) => {
  if (event.ctrlKey || event.metaKey || event.altKey) return;
  if (isFunctionalKey(event.key)) return;
  event.preventDefault();
  let element = wrapper.querySelector(
    `div[data-line="${cursor.line + 1}"] span`
  );

  if (!element) {
    element = createBlock(cursor.line + 1);
    wrapper.appendChild(element.parentElement!);
  }

  if (cursorCoordinatorKeys.includes(event.key as CursorCoordinatorKeys)) {
    setCursor(event, element);
    return;
  }
  if (!isInputKey(event.key)) return;

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
wrapper.contentEditable = 'true';

const root = document.getElementById("app");

root?.append(wrapper, cursor_element);

wrapper.addEventListener("keydown", inputHandler);

wrapper.focus();