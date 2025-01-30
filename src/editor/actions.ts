export const createBlock = (line: number) => {
  const block = document.createElement("div");
  block.setAttribute("data-line", String(line));
  block.classList.add("block");
  const element = document.createElement("span");
  block.appendChild(element);
  return element;
};

export const insertString = (element: Element, str: string, col: number) => {
  let html = element.innerHTML.replace(/&nbsp;/g, " ");

  html = html.slice(0, col) + str + html.slice(col);

  element.innerHTML = html.replace(/ /g, "&nbsp;");
};

export const removeString = (element: Element, start: number, end: number) => {
  let html = element.innerHTML.replace(/&nbsp;/g, " ");

  html = html.slice(0, start) + html.slice(end);

  element.innerHTML = html.replace(/ /g, "&nbsp;");
};

export const removePrevString = (element: Element, col: number) => {
  let html = element.innerHTML.replace(/&nbsp;/g, " ");
  const start = html.slice(0, col);
  const deleted = start.replace(/\s+$|(\S+)\s*$/, "");
  html = deleted + html.slice(col);

  element.innerHTML = html.replace(/ /g, "&nbsp;");
  return start.length - deleted.length;
};

export const removeNextString = (element: Element, col: number) => {
  let html = element.innerHTML.replace(/&nbsp;/g, " ");
  const before = html.slice(0, col);
  const after = html.slice(col);
  const deleted = after.replace(/^\s+|^\S+/, "");
  html = before + deleted;

  element.innerHTML = html.replace(/ /g, "&nbsp;");
  return after.length - deleted.length;
};
