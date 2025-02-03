import "./font.css";
import "./style.css";

import { cursor, cursor_element } from "./cursor/cursor";
import { inputHandler, insert_text } from "./editor/handle-keyboard-event";
import { click_handler } from "./editor/handle-mousedown-event";
import { Mimes } from "./base/mimes";
import Range from "./base/common/cursor/range";

export const wrapper = document.createElement("div");
wrapper.classList.add("container");

const root = document.getElementById("app");

root?.append(wrapper, cursor_element);

const paste_handler = (event: ClipboardEvent) => {
    const clipboard = event.clipboardData;
    if (!clipboard) return;

    const value = clipboard.getData(Mimes.text);
    console.log(value);
    const line = cursor.line + 1;
    const column = cursor.col + value.length;

    insert_text(value, new Range(line, column, line, column));
};

document.addEventListener("keydown", inputHandler);
wrapper.addEventListener("mousedown", click_handler);
window.addEventListener("paste", paste_handler);

wrapper.focus();
