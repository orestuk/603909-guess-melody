import {ScreenType} from '../data/game-data';
import {updateGameState} from '../controller';
import {ArtistView} from '../view/question/artist-view';

export default (question) => {
  const view = new ArtistView(question);
  const containerEl = document.querySelector(`.main-wrap`);
  view.onAnswerSelected = (index) => {
    updateGameState(ScreenType.ARTIST, question, index);
  };
  containerEl.innerHTML = ``;
  containerEl.appendChild(view.element);
};
