export type CursorCoordinatorKeys = (typeof cursorCoordinatorKeys)[number];

export const inputModifierKeys = ["Enter", "Tab", "Delete", "Backspace"];

export const cursorCoordinatorKeys = [
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowUp",
  "Home",
  "End",
  "PageUp",
  "PageDown",
] as const;

export const special_keys = [
  "Alt",
  "Control",
  "Escape",
  "Shift",
  "NumLock",
  "Insert",
  "CapsLock",

  // Numpad5 & NumLock Disabled
  "Clear",
  ...inputModifierKeys,
];