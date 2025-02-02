import "./font.css";
import "./style.css";

import { cursor_element } from "./cursor/cursor";
import { inputHandler } from "./editor/handle-keyboard-event";
import { click_handler } from "./editor/handle-mousedown-event";
import { Mimes } from "./base/mimes";

export const wrapper = document.createElement("div");
wrapper.classList.add("container");

const root = document.getElementById("app");

root?.append(wrapper, cursor_element);

const paste_handler = (event: ClipboardEvent) => {
    const clipboard = event.clipboardData;
    if (!clipboard) return;
    const value = clipboard.getData(Mimes.text);
    console.log(value);
};

document.addEventListener("keydown", inputHandler);
wrapper.addEventListener("mousedown", click_handler);
window.addEventListener("paste", paste_handler);

wrapper.focus();
