import CONFIG from "../config";

const canvas = document.createElement("canvas");
const getTextSize = (content: HTMLSpanElement, col: number) => {
  const text = String(content.textContent).slice(0, col);
  const context = canvas.getContext("2d");
  if (!context) throw new Error("Unable to find canvas context to measureText");

  context.font = CONFIG.font;
  const { width, fontBoundingBoxAscent, fontBoundingBoxDescent } = context.measureText(text);
  const formattedWidth = Math.ceil(width) + "px";
  const top = Math.ceil(fontBoundingBoxAscent) + "px";

  console.log(
    fontBoundingBoxAscent, fontBoundingBoxDescent
  )
  return {
    top,
    left: formattedWidth,
  };
};
export default getTextSize;
