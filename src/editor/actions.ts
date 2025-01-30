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

  element.textContent = html.replace(/ /g, "&nbsp;");
};
