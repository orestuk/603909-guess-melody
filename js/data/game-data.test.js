import {assert} from 'chai';
import {calculatePoints, createTimer, formatResult, Answer, Timer, PlayerResult, MAX_MISTAKES, SUCCESS_TIMEOUT} from './game-data';

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const generateAnswers = (slowQuantity = 0, quickQuantity = 0, failedQuantity = 0) => {
  const results = [];
  const isRightQuantity = slowQuantity + quickQuantity;
  const totalQuantity = slowQuantity + quickQuantity + failedQuantity;
  const addItem = (array, isRight, spentTime) =>
    array.push(new Answer(isRight, spentTime));
  while (results.length < slowQuantity) {
    addItem(results, true, getRandomInt(SUCCESS_TIMEOUT, 60));
  }
  while (results.length < isRightQuantity) {
    addItem(results, true, getRandomInt(1, SUCCESS_TIMEOUT - 1));
  }
  while (results.length < totalQuantity) {
    addItem(results, false, 0);
  }
  return results;
};

describe(`Check calculatePoints function`, () => {

  it(`should be at least 10 right answers`, () => {
    assert.equal(calculatePoints(generateAnswers(1, 2), 2), -1);
    assert.equal(calculatePoints(generateAnswers(5, 1, 6), 1), -1);
  });

  it(`should be 10 points in case all 10 slow answers are right, and no mistakes made`, () => {
    assert.equal(calculatePoints(generateAnswers(10, 0), 1), 10);
  });

  it(`should be 20 points maximum if all 10 quick answers are right`, () => {
    assert.equal(calculatePoints(generateAnswers(0, 10), 1), 20);
  });

  it(`should be calculate right total points, slow answer +1 point, quick answer +2 points, wrong -2 points`, () => {
    const slow = getRandomInt(1, 10);
    const quick = 10 - slow;
    const failed = getRandomInt(1, 2);
    assert.equal(calculatePoints(generateAnswers(slow, quick, failed), 1), slow * 1 + quick * 2 - failed * 2);
  });

  it(`should check if notes number be not grater than ${MAX_MISTAKES} and not less then 0`, () => {
    assert.throws(() => calculatePoints([], 3));
    assert.throws(() => calculatePoints([], -1));
  });

  it(`should check if left notes is not number value`, () => {
    assert.throw(() => calculatePoints([], `3`));
    assert.throw(() => calculatePoints([], []));
    assert.throw(() => calculatePoints([], {}));
  });

  it(`should check if answers is array`, () => {
    assert.throw(() => calculatePoints(`45`, 1), `Answers should be of type array`);
  });

  it(`should check if answers not undefined and not null`, () => {
    assert.throw(() => calculatePoints(undefined, 1), `Answers could not be undefined or null`);
    assert.throw(() => calculatePoints(null, 1), `Answers could not be undefined or null`);
  });

  it(`should check if left notes not undefined and not null`, () => {
    assert.throw(() => calculatePoints([], undefined), `Left notes quantity could not be undefined or null`);
    assert.throw(() => calculatePoints([], null), `Left notes quantity could not be undefined or null`);
  });
});

describe(`Check calculatePoints function`, () => {
  it(`should check result format in case the player has lost and he finished time`, () => {
    assert.equal(formatResult([], new PlayerResult(-1, 1, 0)), `Время вышло! Вы не успели отгадать все мелодии`);
  });
  it(`should check result format in case the player has lost and he finished attempts`, () => {
    assert.equal(formatResult([], new PlayerResult(-1, 0, 40)), `У вас закончились все попытки. Ничего, повезёт в следующий раз!`);
  });
  it(`should check result format in case the player won`, () => {
    let otherResults = [10, 11, 15, 18, 20];
    let oneResult = new PlayerResult(12, 1, 60);
    assert.equal(formatResult(otherResults, oneResult), `Вы заняли 4 место из 6 игроков. Это лучше, чем 33% игроков`);
    otherResults = [11, 15, 16, 18, 20, 20];
    oneResult = new PlayerResult(10, 1, 60);
    assert.equal(formatResult(otherResults, oneResult), `Вы заняли 7 место из 7 игроков. Это лучше, чем 0% игроков`);
    otherResults = [11, 15, 19];
    oneResult = new PlayerResult(20, 1, 60);
    assert.equal(formatResult(otherResults, oneResult), `Вы заняли 1 место из 4 игроков. Это лучше, чем 75% игроков`);
  });

  describe(`Check createTimer function`, () => {
    it(`should create timer object`, () => {
      assert.isTrue(createTimer(1000) instanceof Timer);
    });
    it(`should create timer object with given time interval`, () => {
      const interval = 1000;
      assert.equal(createTimer(interval).interval, interval);
    });
  });
});
