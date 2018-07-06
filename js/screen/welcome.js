import router from '../router';
import {WelcomeView} from '../view/welcome-view';
import {renderScreen} from '../util';

export class WelcomeScreen {
  init() {
    const view = new WelcomeView();
    view.onClick = () => {
      router.showGame();
    };
    renderScreen(view.element);
  }
}
