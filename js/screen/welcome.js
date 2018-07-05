import {ScreenType} from '../data/game-data';
import {updateGameState} from '../controller';
import {WelcomeView} from '../view/welcome-view';
import {renderScreen} from '../util';

export default () => {
  const view = new WelcomeView();
  view.onClick = () => {
    updateGameState(ScreenType.WELCOME);
  };
  renderScreen(view.element);
};
