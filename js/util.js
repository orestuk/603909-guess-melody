const mainEl = document.querySelector(`section.main`);

export const getElementFromTemplate = (template) => {
  const templateEl = document.createElement(`template`);
  templateEl.innerHTML = template.trim();
  return templateEl.content.firstChild;
};

export const renderScreen = (element) => {
  mainEl.innerHTML = ``;
  mainEl.appendChild(element);
};
