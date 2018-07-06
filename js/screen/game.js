import {PlayerView} from '../view/question/player-view';
import {renderScreen} from '../util';
import {QuestionView} from '../view/question/question-view';
import {ArtistView} from '../view/question/artist-view';
import {MistakeView} from '../view/question/mistake-view';
import {GenreView} from '../view/question/genre-view';
import {GameModel} from '../model/game-model';
import router from '../router';
import {UpdateStateResult} from '../data/game-data';
import {TimerView} from '../view/question/timer-view';
import {TIME_DELAY} from '../data/game-data';
import {ResultScreen} from '../data/results-data';

const QuestionType = {
  ARTIST: `artist`,
  GENRE: `genre`
};

const QuestionContainerSelector = {
  ARTIST: `.main-wrap`,
  GENRE: `.main-wrap`,
  PLAYER: `.player-wrapper`,
  MISTAKES: `.main-mistakes`,
  TIMER: `.timer-value`
};

const renderViewInContainer = (view, containerSelector) => {
  const containerEl = document.querySelector(containerSelector);
  containerEl.innerHTML = ``;
  containerEl.appendChild(view.element);
};

export class GameScreen {
  constructor(model) {
    this.model = model;
    this._interval = null;
  }
  init() {
    const question = GameModel.nextQuestion();
    this.renderQuestion(question);
    this.startGame(question);
  }
  stopGame() {
    clearInterval(this._interval);
  }
  startGame(question) {
    this.renderQuestionViews(question);
    this._interval = setInterval(() => {
      this.model.tick();
      if (this.model.state.leftTime < 0) {
        this.stopGame();
        router.showResult(ResultScreen.TIMEOUT);
      }
      this.timerView.updateTime(this.model.state.leftTime);
    }, TIME_DELAY);
  }

  renderQuestionViews(question) {
    switch (question.type) {
      case QuestionType.ARTIST:
        this.renderArtistQuestion(question);
        this.renderTimerView(this.model.state.leftTime);
        GameScreen.renderArtistPlayer(question.melody, true);
        GameScreen.renderMistake(this.model.state.mistakesQuantity);
        break;
      case QuestionType.GENRE:
        this.renderGenreQuestion(question);
        this.renderTimerView(this.model.state.leftTime);
        GameScreen.renderGenrePlayers(question.answers);
        GameScreen.renderMistake(this.model.state.mistakesQuantity);
        break;
    }
  }
  processAnswer(isCorrect) {
    this.stopGame();
    switch (this.model.processAnswer(isCorrect)) {
      case UpdateStateResult.CONTINUE:
        this.startGame(GameModel.nextQuestion());
        break;
      case UpdateStateResult.ATTEMPTS:
        router.showResult(ResultScreen.ATTEMPTS);
        break;
      case UpdateStateResult.SUCCESS:
        const statistic = this.model.processResults();
        router.showResult(ResultScreen.WIN, statistic);
        break;
    }
  }
  renderTimerView(time) {
    this.timerView = new TimerView(time);
    renderViewInContainer(this.timerView, QuestionContainerSelector.TIMER);
  }
  renderQuestion(question) {
    const view = new QuestionView(question);
    view.onPlayAgain = () => {
      this.stopGame();
      this.model.restart();
      router.showWelcome();
    };
    renderScreen(view.element);
  }
  renderArtistQuestion(question) {
    const view = new ArtistView(question);
    view.onAnswerSelected = (isCorrect) => {
      this.processAnswer(isCorrect);
    };
    renderViewInContainer(view, QuestionContainerSelector.ARTIST);
  }
  renderGenreQuestion(question) {
    const view = new GenreView(question);
    view.onAnswerSelected = (isCorrect) => {
      this.processAnswer(isCorrect);
    };
    renderViewInContainer(view, QuestionContainerSelector.GENRE);
  }
  static renderArtistPlayer(melodySrc, autoplay) {
    const view = new PlayerView(melodySrc, autoplay);
    renderViewInContainer(view, QuestionContainerSelector.PLAYER);
  }
  static renderMistake(mistakeQuantity) {
    const view = new MistakeView(mistakeQuantity);
    renderViewInContainer(view, QuestionContainerSelector.MISTAKES);
  }
  static renderGenrePlayers(answers) {
    const containersEl = document.querySelectorAll(`.player-wrapper`);
    containersEl.forEach((container, index) => {
      const view = new PlayerView(answers[index].melody, index === 0);
      container.innerHTML = ``;
      container.appendChild(view.element);
    });
  }
}

