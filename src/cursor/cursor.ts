const listeners = new Set<() => void>();

export const cursor = {
  col: 0,
  line: 0,
  set(col: number, line: number) {
    this.col = col;
    this.line = line;

    listeners.forEach((v) => v());
  },

  on(listener: () => void) {
    listeners.add(listener);
  },
};

if (import.meta.hot) {
  import.meta.hot.dispose(() => {
    listeners.clear();
    console.log("Cleared listeners");
  });
}
export const cursor_element = document.createElement("div");

cursor_element.classList.add("cursor");

setInterval(() => {
  const visibility = cursor_element.style.visibility;
  cursor_element.style.visibility =
    visibility === "visible" ? "hidden" : "visible";
}, 500);
