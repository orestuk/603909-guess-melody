
export const getElementFromTemplate = (template) => {
  const fragment = document.createDocumentFragment();
  const intermediateEl = document.createElement(`div`);
  intermediateEl.innerHTML = template.trim();
  while (intermediateEl.childNodes.length > 0) {
    fragment.appendChild(intermediateEl.childNodes[0]);
  }
  return fragment;
};

export class AbstractView {
  constructor() {
    if (new.target === AbstractView) {
      throw new Error(`Can't instantiate AbstractView, only concrete one`);
    }
  }

  get template() {
    throw new Error(`Template is required`);
  }

  get element() {
    if (this._element) {
      return this._element;
    }
    this._element = this.render();
    this.bind();
    return this._element;
  }

  render() {
    return getElementFromTemplate(this.template);
  }

  bind() {}
}
