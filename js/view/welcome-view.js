import {AbstractView} from "./abstract-view";

export class WelcomeView extends AbstractView {
  get template() {
    return ` 
    <section class="main main--welcome">
    <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>
    <button class="main-play">Начать игру</button>
    <h2 class="title main-title">Правила игры</h2>
    <p class="text main-text">
      Правила просты — за 5 минут ответить на все вопросы.<br>
      Ошибиться можно 3 раза.<br>
      Удачи!
    </p>
    </section>`;
  }
  bind() {
    const buttonEl = this.element.querySelector(`button.main-play`);
    buttonEl.addEventListener(`click`, () => {
      this.onClick();
    });
  }
  onClick() {}
}
