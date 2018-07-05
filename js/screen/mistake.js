import {MistakeView} from '../view/question/mistake-view';

export default (mistakeQuantity) => {
  const view = new MistakeView(mistakeQuantity);
  const containerEl = document.querySelector(`.main-mistakes`);
  containerEl.innerHTML = ``;
  containerEl.appendChild(view.element);
};
