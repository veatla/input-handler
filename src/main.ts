import "./font.css";
import "./style.css";

import { cursor_element } from "./cursor/cursor";
import { inputHandler } from "./editor/handle-keyboard-event";
import { click_handler } from "./editor/handle-mousedown-event";

export const wrapper = document.createElement("div");
wrapper.classList.add("container");

const root = document.getElementById("app");

root?.append(wrapper, cursor_element);

document.addEventListener("keydown", inputHandler);
wrapper.addEventListener("mousedown", click_handler);

wrapper.focus();
