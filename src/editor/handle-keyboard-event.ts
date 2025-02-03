import { cursorCoordinatorKeys, CursorCoordinatorKeys } from "../constants/keys";
import { cursor } from "../cursor/cursor";
import { createBlock, removeString, removePrevString, removeNextString } from "./actions";
import { wrapper } from "../main";
import { isFunctionalKey, isInputKey } from "../util/key-event";
import { setCursor } from "../cursor/controller";
import Range from "../base/common/cursor/range";
import CONFIG from "../config";

export const getKeyboardEventValue = (event: KeyboardEvent, element: Element) => {
    let col = cursor.col,
        line = cursor.line;

    if (!cursor.total[line]) cursor.total = [];

    switch (event.key) {
        case "Tab": {
            const tabs = Array.from({ length: CONFIG.tabWidth }, () => "&nbsp;");
            const line = cursor.line + 1;
            const col = cursor.col + CONFIG.tabWidth;

            insert_text(tabs.join(""), new Range(line, col, line, col));
            break;
        }
        case "Backspace": {
            if (event.ctrlKey) {
                const removed = removePrevString(element, cursor.col);

                if (cursor.col - removed < 0) {
                    if (cursor.line >= 0) {
                        col = element.parentElement!.previousSibling?.textContent?.length || 0;
                        line -= 1;
                        element.remove();
                    }
                } else {
                    col -= removed;
                }
                break;
            }
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
        }
        case "Delete":
            if (event.ctrlKey) {
                removeNextString(element, cursor.col);
                break;
            }
            element.innerHTML = element.innerHTML.slice(0, cursor.col) + element.innerHTML.slice(cursor.col + 1);
            break;

        default:
            if (event.ctrlKey || event.metaKey || event.altKey) break;
            col += 1;
            insert_text(event.key, new Range(line, col, line, col));
            break;
    }

    return {
        col,
        line,
    };
};

export const insert_text = (text: string, position: Range) => {
    if (position.is_empty()) {
        let element = wrapper.querySelector(`div[data-line="${position.start_selected_line + 1}"] span`);
        if (!element) {
            // ensure there is a element
            element = createBlock(position.start_selected_line + 1);
            wrapper.appendChild(element.parentElement!);
        }

        element.innerHTML += text.replace(/ /g, "&nbsp;");
        element.scrollIntoView();

        cursor.set(position.start_selected_column, position.start_selected_line);
        cursor.updateCursorPos(position.start_selected_column, position.start_selected_line);
    }
};


export const clear_range_text = (position: Range) => {
  if (position.is_empty()) {
      let element = wrapper.querySelector(`div[data-line="${position.start_selected_line + 1}"] span`);
      if (!element) {
          // ensure there is a element
          element = createBlock(position.start_selected_line + 1);
          wrapper.appendChild(element.parentElement!);
      }

      // element.innerHTML += text;
      // element.scrollIntoView();

      cursor.set(position.start_selected_column, position.start_selected_line);
      cursor.updateCursorPos(position.start_selected_column, position.start_selected_line);
  }
};

export const inputHandler = (event: KeyboardEvent) => {
    if (event.metaKey || event.altKey) return;
    if (isFunctionalKey(event.key)) return;
    if (event.code === "KeyR" && event.ctrlKey) return;
    if (event.code === "KeyT" && event.ctrlKey) return;
    if (event.code === "KeyI" && event.ctrlKey) return;
    if (event.code === "KeyV" && event.ctrlKey) return;
    if (event.code === "KeyC" && event.ctrlKey) return;
    event.preventDefault();

    let element = wrapper.querySelector(`div[data-line="${cursor.line + 1}"] span`);
    if (!element) {
        // ensure there is a element
        element = createBlock(cursor.line + 1);
        wrapper.appendChild(element.parentElement!);
    }

    if (cursorCoordinatorKeys.includes(event.key as CursorCoordinatorKeys)) {
        setCursor(event);
        return;
    }
    if (!isInputKey(event.key)) return;

    if (event.key === "Enter") {
        insert_text("", new Range(cursor.line + 2, cursor.col, cursor.line + 2, cursor.col));
        return;
    }
    const val = getKeyboardEventValue(event, element);
    element.scrollIntoView();
    cursor.set(val.col, val.line);
    cursor.updateCursorPos(val.col, val.line);
};
