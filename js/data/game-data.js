export const SUCCESS_TIMEOUT = 30;
export const MAX_MISTAKES = 2;
export const MAX_ANSWERS_QUANTITY = 10;
export const TIME_LIMIT = 5 * 60 * 1000;
export const ScreenType = {
  START: 0,
  WELCOME: 1,
  ARTIST: 2,
  GENRE: 3,
  WIN: 4,
  ATTEMPTS: 5,
  TIMEOUT: 6
};
export const UpdateStateResult = {
  TIMEOUT: 0,
  ATTEMPTS: 1,
  SUCCESS: 2,
  CONTINUE: 3
};
export const gameState = {
  mistakesQuantity: 0,
  answersQuantity: 0,
  answers: [],
  leftTime: 0,
};

export const allGameResults = [];

export const Answer = function (isCorrect, spentTime) {
  this.isCorrect = isCorrect;
  this.spentTime = spentTime;
};

export const PlayerResult = function (points, remainedAttempts, remainedTime) {
  this.points = points;
  this.remainedAttempts = remainedAttempts;
  this.remainedTime = remainedTime;
};

export const Timer = function (interval) {
  this.interval = interval;
};

Timer.prototype.tick = function () {
  this.interval--;
  if (this.interval < 0) {
    return `Время вышло!`;
  }
  return `Осталось ${this.interval} секунд!`;
};

export const calculatePoints = (answers) => {
  let result = 0;
  let rightAnswersNumber = 0;
  if (!answers) {
    throw new Error(`Answers could not be undefined or null`);
  }
  if (!Array.isArray(answers)) {
    throw new Error(`Answers should be of type array`);
  }
  answers.forEach((item) => {
    if (item.isCorrect) {
      result += item.spentTime < SUCCESS_TIMEOUT ? 2 : 1;
      rightAnswersNumber++;
    } else {
      result -= 2;
    }
  });
  if (rightAnswersNumber < MAX_ANSWERS_QUANTITY) {
    result = -1;
  }
  return result;
};

export const formatResult = (allResults, playerResult) => {
  let itemPosition;
  let itemsLessPercent;
  if (gameState.mistakesQuantity > MAX_MISTAKES) {
    return `У вас закончились все попытки. </br> Ничего, повезёт в следующий раз!`;
  }
  allResults.push(playerResult);
  allResults.sort((a, b) => b - a);
  itemPosition = allResults.indexOf(playerResult) + 1;
  itemsLessPercent = Math.round((allResults.length - itemPosition) / allResults.length * 100);
  return `Вы заняли ${itemPosition} место из ${allResults.length} игроков. </br> Это лучше, чем ${itemsLessPercent}% игроков`;
};

export const createTimer = (timerInterval) => {
  return new Timer(timerInterval);
};
