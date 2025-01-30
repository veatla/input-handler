import { cursor } from "../cursor/cursor";
import { get_block_text_widths } from "../util/text-dimension";

export const click_handler = (event: MouseEvent) => {
  const target = event.target as HTMLDivElement;

  const line_data = target.parentElement?.getAttribute("data-line");
  if (!line_data || isNaN(Number(line_data))) return;

  const content = target.textContent ?? "";
  const width = target.parentElement!.clientWidth;

  const index = get_block_text_widths(content, width, event.clientX);
  const line = Number(line_data) - 1;
  cursor.set(index, line);
  cursor.updateCursorPos(index, line);
};
