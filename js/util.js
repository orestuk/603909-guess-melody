const mainEl = document.querySelector(`section.main`);

export const getElementFromTemplate = (template, ...classes) => {
  const sectionEl = document.createElement(`section`);
  sectionEl.innerHTML = template;
  classes.forEach((item) => {
    sectionEl.classList.add(item);
  });
  return sectionEl;
};

export const renderScreen = (element) => {
  mainEl.innerHTML = ``;
  mainEl.appendChild(element);
};
