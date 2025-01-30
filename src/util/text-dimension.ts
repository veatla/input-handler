import CONFIG from "../config";

const canvas = document.createElement("canvas");
const context = canvas.getContext("2d")!;

context.font = CONFIG.font;

const getTextSize = (content: HTMLSpanElement, col: number) => {
  const text = String(content.textContent).slice(0, col);
  if (!context) throw new Error("Unable to find canvas context to measureText");

  const { width, fontBoundingBoxAscent } = context.measureText(text);
  const formattedWidth = Math.ceil(width) + "px";
  const top = Math.ceil(fontBoundingBoxAscent) + "px";

  return {
    top,
    left: formattedWidth,
  };
};

export const get_block_text_widths = (text: string = "", max_width: number, x: number) => {
  if (!context) throw new Error("Unable to find canvas context to measureText");
  const words = text.split("").map((_, index) => text.slice(0, index + 1));
  let x_width = 0;
  let index = 0;

  if (x < 3) return index;

  const sizes = getAllUnicodeSymbols(words);
  for (let i = 0; i < words.length; i++) {
    if (x_width >= max_width || x < x_width - 5) break;

    const symbol = words[i];
    x_width = sizes.get(symbol)!;
    index = i;
  }
  return index;
};

function getAllUnicodeSymbols(strings: string[]) {
  const context = canvas.getContext("2d");
  if (!context) throw new Error("Unable to find canvas context to measureText");

  context.font = CONFIG.font;
  const symbols: Map<string, number> = new Map();
  for (let i = 0; i < strings.length; i++) {
    const text = strings[i];
    const { width } = context.measureText(text);
    symbols.set(text, width);
  }
  return symbols;
}

export default getTextSize;
