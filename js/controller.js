import createResultEl from './screen/result';
import renderWelcomeView from './screen/welcome';
import renderQuestionView from './screen/question';
import renderArtistPlayerView from './screen/artist-player';
import renderGenrePlayerViews from './screen/genre-player';
import renderArtistQuestionView from './screen/artist';
import renderGenreQuestionView from './screen/genre';
import renderMistakeView from './screen/mistake';
import {generateQuestion} from './data/questions-data';
import resultsData from './data/results-data';
import {ResultScreen} from './data/results-data';
import {gameState, ScreenType, allGameResults, UpdateStateResult, updateState, resetGameState} from './data/game-data';
import {calculatePoints, formatResult} from './data/game-data';
import {setTimer} from './timer';

const renderQuestionScreen = (question) => {
  switch (question.type) {
    case `artist`:
      renderQuestionView(question);
      renderArtistQuestionView(question);
      renderArtistPlayerView(question.melody, true);
      renderMistakeView(gameState.mistakesQuantity);
      setTimer();
      break;
    case `genre`:
      renderQuestionView(question);
      renderGenreQuestionView(question);
      renderGenrePlayerViews(question.answers);
      renderMistakeView(gameState.mistakesQuantity);
      setTimer();
      break;
  }
};

const renderPartialQuestionScreen = (question) => {
  switch (question.type) {
    case `artist`:
      renderArtistQuestionView(question);
      renderArtistPlayerView(question.melody, true);
      renderMistakeView(gameState.mistakesQuantity);
      break;
    case `genre`:
      renderGenreQuestionView(question);
      renderGenrePlayerViews(question.answers);
      renderMistakeView(gameState.mistakesQuantity);
      break;
  }
};

const processAnswers = (isCorrect) => {
  let data;
  switch (updateState(isCorrect)) {
    case UpdateStateResult.CONTINUE:
      renderPartialQuestionScreen(generateQuestion());
      break;
    case UpdateStateResult.ATTEMPTS:
      data = resultsData.get(ResultScreen.ATTEMPTS);
      data.statistic = formatResult(allGameResults, calculatePoints(gameState.answers));
      createResultEl(data, ScreenType.ATTEMPTS);
      break;
    case UpdateStateResult.SUCCESS:
      data = resultsData.get(ResultScreen.WIN);
      data.statistic = formatResult(allGameResults, calculatePoints(gameState.answers));
      createResultEl(data, ScreenType.WIN);
      break;
  }
};

export const updateGameState = (screen, question, data) => {
  let isCorrect = true;
  switch (screen) {
    case ScreenType.START:
      resetGameState();
      renderWelcomeView();
      break;
    case ScreenType.WELCOME:
      renderQuestionScreen(generateQuestion());
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
      renderWelcomeView();
      break;
    case ScreenType.ATTEMPTS:
      resetGameState();
      renderWelcomeView();
      break;
  }
};
