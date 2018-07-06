import {AbstractView} from "../abstract-view";

export class QuestionView extends AbstractView {
  constructor(data) {
    super();
    this.question = data;
  }
  get template() {
    return `<section class="main main--level main--level-${this.question.type}">
      <a class="play-again play-again__wrap" href="#">
      <img class="play-again__img" src="/img/melody-logo-ginger.png" alt="logo" width="177" height="76">
      </a>
      <svg xmlns="http://www.w3.org/2000/svg" class="timer" viewBox="0 0 780 780">
      <circle cx="390" cy="390" r="370" class="timer-line"
    style="filter: url(..#blur); transform: rotate(-90deg) scaleY(-1); transform-origin: center"></circle>
      <div class="timer-value" xmlns="http://www.w3.org/1999/xhtml">
      <span class="timer-value-mins">05</span><!--
    --><span class="timer-value-dots">:</span><!--
    --><span class="timer-value-secs">00</span>
      </div>
      </svg>
      <div class="main-mistakes">
      </div>
      <div class="main-wrap">
      </div>
      </section>`;
  }
  bind() {
    const playAgainEl = this.element.querySelector((`a.play-again`));
    playAgainEl.addEventListener(`click`, () => {
      this.onPlayAgain();
    });
  }
  onPlayAgain() {}
}
