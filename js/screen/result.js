import {ResultView} from '../view/result-view';
import {renderScreen} from '../util';
import router from '../router';

export class ResultScreen {
  constructor(model) {
    this.model = model;
  }
  init() {
    const view = new ResultView(this.model.data);
    view.onReplay = () => {
      router.showWelcome();
    };
    renderScreen(view.element);
  }
}
