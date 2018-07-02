import {getElementFromTemplate} from '../util';
import {ScreenType} from '../data/game-data';
import {updateGameState} from '../controller';

export default () => {
  const template = `
<section class="main main--welcome">
  <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>
    <button class="main-play">Начать игру</button>
    <h2 class="title main-title">Правила игры</h2>
    <p class="text main-text">
      Правила просты — за 5 минут ответить на все вопросы.<br>
      Ошибиться можно 3 раза.<br>
      Удачи!
    </p>
</section>`;

  const element = getElementFromTemplate(template);

  const buttonEl = element.querySelector(`button.main-play`);

  buttonEl.addEventListener(`click`, () => {
    updateGameState(ScreenType.WELCOME);
  });

  return element;
};
