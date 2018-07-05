import {PlayerView} from '../view/question/player-view';

export default (answers) => {
  const containersEl = document.querySelectorAll(`.player-wrapper`);
  containersEl.forEach((container, index) => {
    const view = new PlayerView(answers[index].melody, index === 0);
    container.innerHTML = ``;
    container.appendChild(view.element);
  });
};
