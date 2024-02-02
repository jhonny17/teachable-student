export const getStringFromHtml = (html: string): string | null => {
  var tempElement = document.createElement("div");
  tempElement.innerHTML = html;
  return tempElement.textContent;
};
