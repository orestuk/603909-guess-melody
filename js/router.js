import {WelcomeScreen} from './screen/welcome';
import {GameScreen} from './screen/game';
import {GameModel} from './model/game-model';
import {ResultModel} from './model/result-model';
import {ResultScreen} from './screen/result';

export default class Router {
  static showWelcome() {
    new WelcomeScreen().init();
  }
  static showGame() {
    const gameScreen = new GameScreen(new GameModel());
    gameScreen.init();
  }
  static showResult(data, statistic) {
    const resultScreen = new ResultScreen(new ResultModel(data, statistic));
    resultScreen.init();
  }
}
