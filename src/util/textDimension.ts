import { cursor } from "../cursor";

const canvas = document.createElement("canvas");
const getTextSize = (content: HTMLSpanElement) => {
  const text = String(content.textContent).slice(0, cursor.col);
  const context = canvas.getContext("2d");
  if (!context) throw new Error('Unable to find canvas context to measureText');

  context.font = "normal 14px / 19px  \"Fira Code\", \"Droid Sans Mono\", monospace"
  const width = context.measureText(text).width; 
  const formattedWidth = Math.ceil(width) + "px"; 

  return formattedWidth;
};
export default getTextSize;
