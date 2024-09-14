import { special_keys, inputModifierKeys, cursorCoordinatorKeys } from "../constants/keys";
import { cursor } from "../cursor/cursor";

export const isInputKey = (key: string): boolean => {
  return !special_keys.includes(key) || inputModifierKeys.includes(key);
};

export const isFunctionalKey = (key: string): boolean => {
  if (/F([0-9])+/.test(key)) return true;
  return false;
};


export const setCursor = (key: string) => {
  switch (key) {
    case cursorCoordinatorKeys["0"]:
      cursor.set(cursor.col, cursor.line + 1);
      break;

    case cursorCoordinatorKeys["1"]:
      cursor.set(Math.max(cursor.col - 1, 0), cursor.line);
      break;

    case cursorCoordinatorKeys["2"]:
      cursor.set(cursor.col + 1, cursor.line);
      break;

    case cursorCoordinatorKeys["3"]:
      cursor.set(cursor.col, Math.max(cursor.line - 1, 0));
      break;

    case cursorCoordinatorKeys["4"]:
      cursor.set(0, cursor.line);
      break;

    case cursorCoordinatorKeys["5"]:
      // TODO Calculate max col
      cursor.set(1, cursor.line);
      break;

    case cursorCoordinatorKeys["6"]:
      // TODO Calculate max col
      cursor.set(1, cursor.line);
      break;

    default:
      break;
  }
};
