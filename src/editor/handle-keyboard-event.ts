import { cursorCoordinatorKeys, CursorCoordinatorKeys } from "../constants/keys";
import { cursor } from "../cursor/cursor";
import { createBlock, removeString, insertString } from "./actions";
import { wrapper } from "../main";
import { isFunctionalKey, isInputKey } from "../util/key-event";
import { setCursor } from "../cursor/controller";

export const getKeyboardEventValue = (event: KeyboardEvent, element: Element) => {
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
          col = element.parentElement!.previousSibling?.textContent?.length || 0;
          line -= 1;
          element.remove();
        }
      } else {
        col -= 1;
      }
      break;

    case "Delete":
      element.innerHTML =
        element.innerHTML.slice(0, cursor.col) + element.innerHTML.slice(cursor.col + 1);
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

export const inputHandler = (event: KeyboardEvent) => {
  if (event.ctrlKey || event.metaKey || event.altKey) return;
  if (isFunctionalKey(event.key)) return;
  event.preventDefault();
  let element = wrapper.querySelector(`div[data-line="${cursor.line + 1}"] span`);

  if (!element) {
    element = createBlock(cursor.line + 1);
    wrapper.appendChild(element.parentElement!);
  }

  if (cursorCoordinatorKeys.includes(event.key as CursorCoordinatorKeys)) {
    setCursor(event);
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
