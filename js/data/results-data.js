export const ResultScreen = {
  ATTEMPTS: 0,
  TIMEOUT: 1,
  WIN: 2
};
export default new Map([
  [ResultScreen.ATTEMPTS, {
    title: `Какая жалость!`,
    statistic: `У вас закончились все попытки.<br>Ничего, повезёт в следующий раз!`,
    button: `Попробовать ещё раз`
  }],
  [ResultScreen.TIMEOUT, {
    title: `Увы и ах!`,
    statistic: `Время вышло!<br>Вы не успели отгадать все мелодии`,
    button: `Сыграть ещё раз`
  }],
  [ResultScreen.WIN, {
    title: `Вы настоящий меломан!`,
    statistic: `За 3 минуты и 25 секунд <br>вы набрали 12 баллов (8 быстрых)\n <br>совершив 3 ошибки`,
    comparison: `Вы заняли 2 место из 10. Это лучше чем у 80 игроков`,
    button: `Сыграть ещё раз`
  }]
]);
