import {PlayerView} from '../view/question/player-view';

export default (melodySrc, autoplay) => {
  const view = new PlayerView(melodySrc, autoplay);
  const containerEl = document.querySelector(`.player-wrapper`);
  containerEl.innerHTML = ``;
  containerEl.appendChild(view.element);
};
