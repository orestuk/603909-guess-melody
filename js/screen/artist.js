import {getElementFromTemplate} from '../util';
import createPlayerEl from './player';
import {ScreenType} from '../data/game-data';
import {updateGameState} from '../controller';

const answerTemplate = (answer, index) => `
<div class="main-answer-wrapper">
  <input class="main-answer-r" type="radio" id="answer-${index}" name="answer" value="${index}"/>
  <label class="main-answer" for="answer-${index}">
  <img class="main-answer-preview" src=${answer.image}
alt="${answer.title}" width="134" height="134">
  ${answer.title}
  </label>
</div>`;

export default (question) => {
  const template = `
  <h2 class="title main-title">${question.text}</h2>
  <div class="player-wrapper"></div>  
  <form class="main-list">
    ${answerTemplate(question.answers[0], 0)}
    ${answerTemplate(question.answers[1], 1)}
    ${answerTemplate(question.answers[2], 2)}
  </form>`;
  const element = getElementFromTemplate(template);
  const playerWrapperEl = element.querySelector(`.player-wrapper`);
  playerWrapperEl.appendChild(createPlayerEl(question.melody, true));
  const buttonsEl = element.querySelectorAll(`.main-answer-wrapper`);
  buttonsEl.forEach((item) => item.addEventListener(`click`, () => {
    updateGameState(ScreenType.ARTIST, question, item.firstElementChild.value);
  }));
  return element;
};
