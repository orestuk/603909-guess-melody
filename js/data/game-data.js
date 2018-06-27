export const SUCCESS_TIMEOUT = 30;
export const MAX_MISTAKES = 2;
export const MIN_RIGHT_ANSWERS = 10;

export const Answer = function (isRight, spentTime) {
  this.isRight = isRight;
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

/*
 * results - array of 1 and 0 values, 1 - right answer, 0 - wrong answer
 * times - array of time spent on answer
 * failed attempts - quantity of fails
*/
export const calculatePoints = (answers, leftNotesQuantity) => {
  let result = 0;
  let rightAnswersNumber = 0;
  if (!answers) {
    throw new Error(`Answers could not be undefined or null`);
  }
  if (!leftNotesQuantity) {
    throw new Error(`Left notes quantity could not be undefined or null`);
  }
  if (!Array.isArray(answers)) {
    throw new Error(`Answers should be of type array`);
  }
  if (typeof leftNotesQuantity !== `number`) {
    throw new Error(`Left Notes Quantity should be of type number`);
  }
  if ((leftNotesQuantity < 0) || (leftNotesQuantity > MAX_MISTAKES)) {
    throw new Error(`Notes quantity must be not less then -1 and not grater ${MAX_MISTAKES}`);
  }
  answers.forEach((item) => {
    if (item.isRight) {
      result += item.spentTime < SUCCESS_TIMEOUT ? 2 : 1;
      rightAnswersNumber++;
    } else {
      result -= 2;
    }
  });
  if (rightAnswersNumber < MIN_RIGHT_ANSWERS) {
    result = -1;
  }
  return result;
};

export const formatResult = (allResults, playerResult) => {
  let itemPosition;
  let itemsLessPercent;
  if (playerResult.points === -1) {
    if (playerResult.remainedTime === 0) {
      return `Время вышло! Вы не успели отгадать все мелодии`;
    }
    if (playerResult.remainedAttempts === 0) {
      return `У вас закончились все попытки. Ничего, повезёт в следующий раз!`;
    }
  }
  allResults.push(playerResult.points);
  allResults.sort((a, b) => b - a);
  itemPosition = allResults.indexOf(playerResult.points) + 1;
  itemsLessPercent = Math.round((allResults.length - itemPosition) / allResults.length * 100);
  return `Вы заняли ${itemPosition} место из ${allResults.length} игроков. Это лучше, чем ${itemsLessPercent}% игроков`;
};

export const createTimer = (timerInterval) => {
  return new Timer(timerInterval);
};
