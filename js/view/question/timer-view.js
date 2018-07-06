import {AbstractView} from "../abstract-view";
import {TIME_LIMIT, TIME_DELAY} from '../../data/game-data';

const CIRCLE_LENGTH = 2325;
const STEP_OFFSET = CIRCLE_LENGTH / TIME_LIMIT;

const getTimeDetails = (interval) => {
  const value = Math.trunc(interval / (TIME_DELAY * 60));
  return {
    minutes: value,
    seconds: (interval - (value * (TIME_DELAY * 60))) / TIME_DELAY
  };
};

export class TimerView extends AbstractView {
  constructor(interval) {
    super();
    const time = getTimeDetails(interval);
    this.minutes = time.minutes;
    this.seconds = time.seconds;
  }

  get template() {
    return `<span class="timer-value-mins">${this.minutes}</span><!--
    --><span class="timer-value-dots">:</span><!--
    --><span class="timer-value-secs">${(this.seconds < 10 ? `0` : ``) + this.seconds}</span>`;
  }

  updateTime(interval) {
    const time = getTimeDetails(interval);
    this.minutes = time.minutes;
    this.seconds = time.seconds;
    this.minutesEl.textContent = time.minutes.toString();
    this.secondsEl.textContent = (time.seconds < 10 ? `0` : ``) + time.seconds.toString();
    this.timeLineEl.style.strokeDashoffset = (TIME_LIMIT - interval) * STEP_OFFSET;
  }

  bind() {
    this.minutesEl = this.element.querySelector(`.timer-value-mins`);
    this.secondsEl = this.element.querySelector(`.timer-value-secs`);
    this.timeLineEl = document.querySelector(`.timer-line`);
    this.timeLineEl.style.strokeDasharray = CIRCLE_LENGTH;
  }
}
