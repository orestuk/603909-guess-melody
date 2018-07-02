import {getElementFromTemplate} from '../util';

export default (melodySrc, play) => {
  const template = `
  <div class="player">
  <audio src = "${melodySrc}"></audio>
  <button class="player-control player-control--play" type="button"></button>
  <div class="player-track">
  <span class="player-status"></span>
  </div>
  </div>
  </div>`;

  const element = getElementFromTemplate(template);
  const playerButtonEl = element.querySelector(`.player-control`);
  const playerContextEl = element.querySelector(`.player`);
  const playerEl = element.querySelector(`audio`);
  if (play) {
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
  return element;
};
