import {getElementFromTemplate} from '../util';
import createPlayerEl from './player';
import {ScreenType} from '../data/game-data';
import {updateGameState} from '../controller';

const createAnswerEl = (answer, index) => {
  const template =
    `<div class="genre-answer">
    <div class="player-wrapper"></div>
    <input type="checkbox" name="answer" value="${index}" id="a-${index}">
    <label class="genre-answer-check" for="a-${index}"></label>
    </div>`;
  const element = getElementFromTemplate(template);
  const playerWrapper = element.querySelector(`.player-wrapper`);
  playerWrapper.appendChild(createPlayerEl(answer.melody, index === 0));
  return element;
};

export default (question) => {
  const template = `
      <h2 class="title">${question.text}</h2>
      <form class="genre">
        <button class="genre-answer-send" type="button">Ответить</button>
      </form>`;
  const element = getElementFromTemplate(template);
  const formEl = element.querySelector(`form`);
  const formFirstEl = formEl.firstChild;
  const answerButtonEl = element.querySelector(`button.genre-answer-send`);
  let answersEl;
  question.answers.forEach((item, index) => formEl.insertBefore(createAnswerEl(item, index), formFirstEl));
  answersEl = element.querySelectorAll(`input[type="checkbox"]`);
  answerButtonEl.disabled = true;

  answersEl.forEach((item) => item.addEventListener(`change`, () => {
    answerButtonEl.disabled = ![...answersEl].some((checkbox) => checkbox.checked);
  }));
  answerButtonEl.addEventListener(`click`, () => {
    const formData = new FormData(formEl);
    updateGameState(ScreenType.GENRE, question, formData);
  });
  return element;
};

