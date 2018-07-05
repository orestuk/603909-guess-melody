import {AbstractView} from "../abstract-view";

export class PlayerView extends AbstractView {
  constructor(melodySrc, autoplay) {
    super();
    this.melodySrc = melodySrc;
    this.autoplay = autoplay;
  }
  get template() {
    return `<div class="player">
            <audio src = "${this.melodySrc}"></audio>
            <button class="player-control player-control--play" type="button"></button>
            <div class="player-track">
            <span class="player-status"></span>
            </div>
            </div>
            </div>`;
  }
  bind() {
    const playerButtonEl = this.element.querySelector(`.player-control`);
    const playerContextEl = this.element.querySelector(`.player`);
    const playerEl = this.element.querySelector(`audio`);
    if (this.autoplay) {
      playerEl.play();
      playerButtonEl.classList.remove(`player-control--play`);
      playerButtonEl.classList.add(`player-control--pause`);
    }
    playerContextEl.addEventListener(`click`, (evt) => {
      if (playerEl.paused) {
        const allPlayers = Array.from(document.querySelectorAll(`audio`));
        allPlayers.forEach((item) => {
          if (!item.paused) {
            item.pause();
            // item.currentTime = 0;
            item.nextElementSibling.classList.remove(`player-control--pause`);
            item.nextElementSibling.classList.add(`player-control--play`);
          }
        });
        playerButtonEl.classList.remove(`player-control--play`);
        playerButtonEl.classList.add(`player-control--pause`);
        playerEl.play();
      } else {
        playerButtonEl.classList.remove(`player-control--pause`);
        playerButtonEl.classList.add(`player-control--play`);
        playerEl.pause();
        // playerEl.currentTime = 0;
      }
      evt.stopPropagation();
    });
  }
}
