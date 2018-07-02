const mainEl = document.querySelector(`section.main`);

export const getElementFromTemplate = (template) => {
  const fragment = document.createDocumentFragment();
  const intermediateEl = document.createElement(`div`);
  intermediateEl.innerHTML = template.trim();
  while (intermediateEl.childNodes.length > 0) {
    fragment.appendChild(intermediateEl.childNodes[0]);
  }
  return fragment;
};

export const renderScreen = (element) => {
  mainEl.innerHTML = ``;
  mainEl.appendChild(element);
};
