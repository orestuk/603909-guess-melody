import {AbstractView} from '../abstract-view';

export class GenreView extends AbstractView {
  constructor(data) {
    super();
    this.question = data;
  }

  getAnswerHtml(answer, index) {
    return `
    <div class="genre-answer">
    <div class="player-wrapper"></div>
    <input type="checkbox" name="answer" value="${index}" id="a-${index}">
    <label class="genre-answer-check" for="a-${index}"></label>
    </div>`;
  }
  get template() {
    return `
      <h2 class="title">${this.question.text}</h2>
      <form class="genre">
        ${this.question.answers.map((item, index) => this.getAnswerHtml(item, index)).join(``)}
        <button class="genre-answer-send" type="button" disabled>Ответить</button>
      </form>`;
  }
  bind() {
    const answerButtonEl = this.element.querySelector(`button.genre-answer-send`);
    const answersEl = this.element.querySelectorAll(`input[type="checkbox"]`);
    const formEl = this.element.querySelector(`form`);
    answersEl.forEach((item) => item.addEventListener(`change`, () => {
      answerButtonEl.disabled = ![...answersEl].some((checkbox) => checkbox.checked);
    }));
    answerButtonEl.addEventListener(`click`, () => {
      const formData = new FormData(formEl);
      const isCorrect = Array.from(formData.values())
        .every((item) => this.question.genre === this.question.answers[item].genre);
      this.onAnswerSelected(isCorrect);
    });
  }
  onAnswerSelected() {}
}
