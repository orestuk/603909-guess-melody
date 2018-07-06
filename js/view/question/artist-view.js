import {AbstractView} from "../abstract-view";

export class ArtistView extends AbstractView {
  constructor(data) {
    super();
    this.question = data;
  }
  static getAnswerHtml(answer, index) {
    return `
    <div class="main-answer-wrapper">
    <input class="main-answer-r" type="radio" id="answer-${index}" name="answer" value="${index}"/>
    <label class="main-answer" for="answer-${index}">
    <img class="main-answer-preview" src=${answer.image}
    alt="${answer.title}" width="134" height="134">
    ${answer.title}
    </label>
    </div>`;
  }

  get template() {
    return `
    <h2 class="title main-title">${this.question.text}</h2>
    <div class="player-wrapper"></div>
    <form class="main-list">
      ${this.question.answers.map((item, index) => ArtistView.getAnswerHtml(item, index)).join(``)}
    </form>`;
  }
  bind() {
    const buttonsEl = this.element.querySelectorAll(`.main-answer-wrapper`);
    buttonsEl.forEach((item, index) => item.addEventListener(`click`, () => this.onAnswerSelected(this.question.answers[index].isCorrect)));
  }

  onAnswerSelected() {}
}
