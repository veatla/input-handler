import CONFIG from "../config";
import { wrapper } from "../main";
import getTextSize from "../util/text-dimension";

const events = {
  listeners: new Set<() => void>(),
  emit: () => {
    setTimeout(() => {
      events.listeners.forEach((v) => v());
    });
  },
};

export const cursor = {
  col: 0,
  line: 0,
  total: [] as number[],

  set(col: number, line: number) {
    if (col === -1 || line === -1) {
      throw new Error("Trying to set col or line to -1");
    }

    this.col = col;
    this.line = line;
  },

  updateCursorPos(col: number, line: number) {
    const element = wrapper.querySelector(`div[data-line="${line + 1}"] span`);

    if (!element) return;
    if (element instanceof HTMLSpanElement) {
      const { left } = getTextSize(element, col);
      cursor_element.style.left = left;
      cursor_element.style.top = `${parseInt(CONFIG.lineHeight) * line}px`;
    }
  },

  on(listener: () => void) {
    events.listeners.add(listener);
  },
};

export const cursor_element = document.createElement("div");

cursor_element.classList.add("cursor");

setInterval(() => {
  const visibility = cursor_element.style.visibility;
  cursor_element.style.visibility =
    visibility === "visible" ? "hidden" : "visible";
  events.emit();
}, 500);
