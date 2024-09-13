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