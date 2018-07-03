import {getElementFromTemplate} from '../util';
import createGenreEl from './genre';
import createArtistEl from './artist';
import {gameState, ScreenType} from '../data/game-data';
import {updateGameState} from '../controller';

const renderQuestionView = (question, containerEl) => {
  switch (question.type) {
    case `artist`: containerEl.appendChild(createArtistEl(question));
      break;
    case `genre`: containerEl.appendChild(createGenreEl(question));
      break;
  }
};
const renderMistakesView = (containerEl) => {
  const mistakeTemplate = `<img class="main-mistake" src="img/wrong-answer.png" width="35" height="49">`;
  containerEl.innerHTML = ``;
  containerEl.insertAdjacentHTML(`afterbegin`, mistakeTemplate.repeat(gameState.mistakesQuantity));
};
export const renderQuestion = (question) => {
  const mainWrapEl = document.querySelector(`.main-wrap`);
  mainWrapEl.innerHTML = ``;
  renderQuestionView(question, mainWrapEl);
};

export const renderMistake = () => {
  const mainMistakesEl = document.querySelector(`.main-mistakes`);
  renderMistakesView(mainMistakesEl);
};

export default (question) => {
  const template = `
<section class="main main--level main--level-${question.type}">
  <a class="play-again play-again__wrap" href="#">
  <img class="play-again__img" src="/img/melody-logo-ginger.png" alt="logo" width="177" height="76">
  </a>
  <svg xmlns="http://www.w3.org/2000/svg" class="timer" stroke-dasharray viewBox="0 0 780 780">
  <circle
cx="390" cy="390" r="370"
class="timer-line"
style="filter: url(.#blur); transform: rotate(-90deg) scaleY(-1); transform-origin: center"></circle>
  <div class="timer-value" xmlns="http://www.w3.org/1999/xhtml">
  <span class="timer-value-mins">05</span><!--
--><span class="timer-value-dots">:</span><!--
--><span class="timer-value-secs">00</span>
  </div>
  </svg>
  <div class="main-mistakes">
  </div>

  <div class="main-wrap">
  </div>
  </section>`;
  const element = getElementFromTemplate(template);
  const mainMistakesEl = element.querySelector(`.main-mistakes`);
  const mainWrapEl = element.querySelector(`.main-wrap`);
  renderMistakesView(mainMistakesEl);
  renderQuestionView(question, mainWrapEl);
  const playAgainEl = element.querySelector((`a.play-again`));
  playAgainEl.addEventListener(`click`, () => updateGameState(ScreenType.START));
  return element;
};
