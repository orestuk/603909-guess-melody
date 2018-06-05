'use strict';

const KeyCode = {
  RIGHT_ARROW: 39,
  LEFT_ARROW: 37
};

const mainEl = document.querySelector(`section.main`);
const templateContent = document.querySelector(`template`).content;
const screensEl = [
  templateContent.querySelector(`.main--welcome`),
  templateContent.querySelector(`.main--level-artist`),
  templateContent.querySelector(`.main--level-genre`),
].concat(Array.from(templateContent.querySelectorAll(`.main--result`)));
const appEl = document.querySelector(`.app`);

let currentScreen = 0;
let leftArrowEl;
let rightArrowEl;

const correctScreenNumber = (number) => {
  number = number >= screensEl.length - 1 ? screensEl.length - 1 : number;
  number = number <= 0 ? 0 : number;
  return number;
};

const selectScreen = (screenNumber) => {
  currentScreen = correctScreenNumber(screenNumber);
  mainEl.innerHTML = ``;
  mainEl.appendChild(screensEl[currentScreen].cloneNode(true));
};

const selectLeftScreen = () => selectScreen(currentScreen - 1);
const selectRightScreen = () => selectScreen(currentScreen + 1);

const renderArrows = () => {
  appEl.insertAdjacentHTML(`beforeend`, `<div class="arrows__wrap">
    <style>
      .arrows__wrap {
        position: absolute;
        top: 135px;
        left: 50%;
        margin-left: -56px;
      }
      .arrows__btn {
        background: none;
        border: 2px solid black;
        padding: 5px 20px;
      }
    </style>
    <button class="arrows__btn">&lt-</button>
    <button class="arrows__btn">-&gt</button>
  </div>`);
  leftArrowEl = document.querySelector(`button.arrows__btn:nth-of-type(1)`);
  rightArrowEl = document.querySelector(`button.arrows__btn:nth-of-type(2)`);
  leftArrowEl.addEventListener(`click`, selectLeftScreen);
  rightArrowEl.addEventListener(`click`, selectRightScreen);
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
