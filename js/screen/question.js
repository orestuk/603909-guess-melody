import {ScreenType} from '../data/game-data';
import {updateGameState} from '../controller';
import {QuestionView} from '../view/question/question-view';
import {renderScreen} from '../util';

export default (question) => {
  const view = new QuestionView(question);
  view.onPlayAgain = () => {
    updateGameState(ScreenType.START);
  };
  renderScreen(view.element);
};
