import {ScreenType} from '../data/game-data';
import {updateGameState} from '../controller';
import {GenreView} from '../view/question/genre-view';

export default (question) => {
  const view = new GenreView(question);
  const containerEl = document.querySelector(`.main-wrap`);
  view.onAnswerSelected = (data) => {
    updateGameState(ScreenType.GENRE, question, data);
  };
  containerEl.innerHTML = ``;
  containerEl.appendChild(view.element);
};
