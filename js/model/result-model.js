import resultsData from '../data/results-data';

export class ResultModel {
  constructor(resultScreenType, statistic) {
    this.data = ResultModel.getData(resultScreenType);
    if (statistic) {
      this.data.statistic = statistic;
    }
  }
  static getData(type) {
    return resultsData.get(type);
  }
}
