import createQuestionEl, {renderQuestion, renderMistake} from './screen/question';
import {createAttemptsEl, createWinEl} from './screen/result';
import createWelcomeEl from './screen/welcome';
import {renderScreen} from './util';
import {generateQuestion} from './data/questions-data';
import resultsData from './data/results-data';
import {ResultScreen} from './data/results-data';
import {TIME_LIMIT, gameState, ScreenType, allGameResults, Answer, MAX_MISTAKES, UpdateStateResult} from './data/game-data';
import {calculatePoints, MAX_ANSWERS_QUANTITY, formatResult} from './data/game-data';
import {setTimer} from './timer';

const updateState = (isCorrect, spentTime = 30) => {
  gameState.answers.push(new Answer(isCorrect, spentTime));
  gameState.mistakesQuantity += isCorrect ? 0 : 1;
  gameState.answersQuantity++;
  if (gameState.mistakesQuantity > MAX_MISTAKES) {
    return UpdateStateResult.ATTEMPTS;
  }
  if (gameState.answersQuantity > MAX_ANSWERS_QUANTITY) {
    return UpdateStateResult.SUCCESS;
  }
  return UpdateStateResult.CONTINUE;
};

const processAnswers = (isCorrect) => {
  let data;
  switch (updateState(isCorrect)) {
    case UpdateStateResult.CONTINUE:
      renderQuestion(generateQuestion());
      renderMistake();
      setTimer();
      break;
    case UpdateStateResult.ATTEMPTS:
      data = resultsData.get(ResultScreen.ATTEMPTS);
      data.statistic = formatResult(allGameResults, calculatePoints(gameState.answers));
      renderScreen(createAttemptsEl(data));
      break;
    case UpdateStateResult.SUCCESS:
      data = resultsData.get(ResultScreen.WIN);
      data.statistic = formatResult(allGameResults, calculatePoints(gameState.answers));
      renderScreen(createWinEl(resultsData.get(ResultScreen.WIN)));
      break;
  }
};

const resetGameState = () => {
  gameState.mistakesQuantity = 0;
  gameState.answersQuantity = 0;
  gameState.answers = [];
  gameState.leftTime = TIME_LIMIT;
};

export const updateGameState = (screen, question, data) => {
  let isCorrect = true;
  switch (screen) {
    case ScreenType.START:
      resetGameState();
      renderScreen(createWelcomeEl());
      break;
    case ScreenType.WELCOME:
      renderScreen(createQuestionEl(generateQuestion()));
      setTimer();
      break;
    case ScreenType.ARTIST:
      isCorrect = question.answers[Number(data)].isCorrect;
      processAnswers(isCorrect);
      break;
    case ScreenType.GENRE:
      for (let value of data.values()) {
        isCorrect = isCorrect && (question.genre === question.answers[value].genre);
      }
      processAnswers(isCorrect);
      break;
    case ScreenType.WIN:
      renderScreen(createWelcomeEl());
      break;
    case ScreenType.ATTEMPTS:
      resetGameState();
      renderScreen(createWelcomeEl());
      break;
  }
};
