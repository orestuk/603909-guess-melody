import {updateGameState} from '../controller';
import {ResultView} from '../view/result-view';
import {renderScreen} from '../util';

export default (data, screenType) => {
  const view = new ResultView(data);
  view.onReply = () => {
    updateGameState(screenType);
  };
  renderScreen(view.element);
};
