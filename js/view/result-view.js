import {AbstractView} from "./abstract-view";

export class ResultView extends AbstractView {
  constructor(data) {
    super();
    this.data = data;
  }
  get template() {
    return `
    <section class="main main--result">
    <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>
    <h2 class="title">${this.data.title}</h2>
    <div class="main-stat">${this.data.statistic}</div>
    <span role="button" tabindex="0" class="main-replay">${this.data.button}</span>
    </section>
    </section>`;
  }
  bind() {
    const buttonEl = this.element.querySelector(`.main-replay`);
    buttonEl.addEventListener(`click`, () => {
      this.onReplay();
    });
  }
  onReplay() {}
}
