import {INITIAL_GAME, updateState, tick, processResults} from '../data/game-data';
import {generateQuestion} from '../data/questions-data';

export class GameModel {
  constructor() {
    this.restart();
  }
  get state() {
    return this._state;
  }
  restart() {
    this._state = Object.assign({}, INITIAL_GAME);
  }
  tick() {
    tick(this._state);
  }
  processAnswer(isAnswerCorrect, answerSpentTime) {
    return updateState(isAnswerCorrect, answerSpentTime, this.state);
  }
  processResults() {
    return processResults(this.state);
  }
  static nextQuestion() {
    return generateQuestion();
  }
}
