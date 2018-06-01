'use strict';

const KeyCode = {
  RIGHT_ARROW: 37,
  LEFT_ARROW: 39
};

const mainEl = document.querySelector(`section.main`);
const screensEl = Array.from(document.querySelector(`template`).content.querySelectorAll(`section.main`));
const appEl = document.querySelector(`.app`);

let currentScreen = 0;

const correctScreenNumber = (number) => {
  number = number >= screensEl.length ? 0 : number;
  number = number < 0 ? screensEl.length - 1 : number;
  return number;
};

const selectScreen = (screenNumber) => {
  currentScreen = correctScreenNumber(screenNumber);
  mainEl.innerHTML = ``;
  mainEl.appendChild(screensEl[currentScreen]);
};

const selectLeftScreen = () => selectScreen(currentScreen - 1);
const selectRightScreen = () => selectScreen(currentScreen + 1);

const renderArrows = () => {
  const divEl = document.createElement(`div`);
  const styleEl = document.createElement(`style`);
  const leftArrowEl = document.createElement(`button`);
  const rightArrowEl = document.createElement(`button`);
  divEl.classList.add(`arrows__wrap`);
  divEl.appendChild(styleEl);
  appEl.appendChild(divEl);
  const cssContent = `.arrows__wrap {
      position: absolute;
      top: 135px;
      left: 50%;
      margin-left: -56px;
    }
    .arrows__btn {
      background: none;
      border: 2px solid black;
      padding: 5px 20px;
    }`;
  styleEl.appendChild(document.createTextNode(cssContent));
  leftArrowEl.classList.add(`arrows__btn`);
  rightArrowEl.classList.add(`arrows__btn`);
  divEl.appendChild(leftArrowEl);
  divEl.appendChild(rightArrowEl);
  leftArrowEl.addEventListener(`click`, selectLeftScreen);
  rightArrowEl.addEventListener(`click`, selectLeftScreen);
};

document.addEventListener(`keydown`, (evt) => {
  switch (evt.keyCode) {
    case KeyCode.LEFT_ARROW:
      selectLeftScreen();
      break;
    case KeyCode.RIGHT_ARROW:
      selectRightScreen();
      break;
  }
});

renderArrows();
selectScreen(currentScreen);
