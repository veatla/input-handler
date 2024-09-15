import {
  special_keys,
  inputModifierKeys,
  cursorCoordinatorKeys,
} from "../constants/keys";
import { cursor } from "../cursor/cursor";

export const isInputKey = (key: string): boolean => {
  return !special_keys.includes(key) || inputModifierKeys.includes(key);
};

export const isFunctionalKey = (key: string): boolean => {
  if (/F([0-9])+/.test(key)) return true;
  return false;
};

export const setCursor = (key: string) => {
  let col = cursor.col,
    line = cursor.line;

  switch (key) {
    case cursorCoordinatorKeys["0"]:
      line += 1;
      break;

    case cursorCoordinatorKeys["1"]:
      if (col - 1 > -1) {
        col = Math.max(col - 1, 0);
      } else {
        col = 0;
        line = Math.max(line - 1, 0);
      }
      break;

    case cursorCoordinatorKeys["2"]:
      col += 1;
      break;

    case cursorCoordinatorKeys["3"]:
      line = Math.max(line - 1, 0);
      break;

    case cursorCoordinatorKeys["4"]:
      col = 0;
      break;

    case cursorCoordinatorKeys["5"]:
      // TODO Calculate max col
      break;

    case cursorCoordinatorKeys["6"]:
      // TODO Calculate max col
      break;

    default:
      break;
  }
  cursor.set(col, line);
  cursor.updateCursorPos(col, line);
};
