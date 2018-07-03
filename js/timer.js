import {gameState, TIME_LIMIT} from './data/game-data';

const TIMER_DELAY = 1000;
const CIRCLE_LENGTH = 2325;
const STEP_OFFSET = CIRCLE_LENGTH / TIME_LIMIT;

export const setTimer = () => {
  const timerLineEl = document.querySelector(`.timer-line`);
  timerLineEl.style.strokeDasharray = CIRCLE_LENGTH;
  setInterval(() => {
    timerLineEl.style.strokeDashoffset = (TIME_LIMIT - gameState.leftTime) * STEP_OFFSET;
    gameState.leftTime -= TIMER_DELAY;
  }, TIMER_DELAY);
};
