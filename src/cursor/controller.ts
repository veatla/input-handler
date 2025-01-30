import { cursorCoordinatorKeys } from "../constants/keys";
import { cursor } from "./cursor";

export const setCursor = (event: KeyboardEvent) => {
  const key = event.key;
  let col = cursor.col,
    line = cursor.line;
  // const selection = shiftKey ? window.getSelection() : null;

  switch (key) {
    case cursorCoordinatorKeys["0"]:
      line += 1;
      break;

    case cursorCoordinatorKeys["1"]: {
      // if (selection && selection.rangeCount > 0 && !selRange) {
      //   if (!selection_start) selection_start = col;
      //   selRange = selection.getRangeAt(0);
      //   selRange.setStart(wrapper, selection_start);
      // }
      if (col - 1 > -1) {
        col = Math.max(col - 1, 0);
      } else {
        col = 0;
        line = Math.max(line - 1, 0);
      }

      // if (selection && selection.rangeCount > 0 && selRange) {
      //   selRange.setEnd(wrapper, col);
      //   selection.addRange(selRange);
      // }
      break;
    }

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
