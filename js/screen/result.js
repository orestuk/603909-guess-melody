import {getElementFromTemplate} from '../util';
import {ScreenType} from '../data/game-data';
import {updateGameState} from '../controller';

const createElement = (data, screenType) => {
  const template = `<section class="main main--result">
    <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>
    <h2 class="title">${data.title}</h2>
    <div class="main-stat">${data.statistic}</div>
    <span role="button" tabindex="0" class="main-replay">${data.button}</span>
  </section>
  </section>`;
  const element = getElementFromTemplate(template);
  const buttonEl = element.querySelector(`.main-replay`);
  buttonEl.addEventListener(`click`, () => {
    updateGameState(screenType);
  });

  return element;
};

export const createWinEl = (data) => {
  return createElement(data, ScreenType.WIN);
};

export const createAttemptsEl = (data) => {
  return createElement(data, ScreenType.ATTEMPTS);
};

export const createTimeoutEl = (data) => {
  return createElement(data, ScreenType.TIMEOUT);
};
