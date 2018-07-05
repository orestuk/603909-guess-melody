import {AbstractView} from "../abstract-view";

export class MistakeView extends AbstractView {
  constructor(mistakesQuantity) {
    super();
    this.mistakesQuantity = mistakesQuantity;
  }
  get template() {
    return `<img class="main-mistake" src="img/wrong-answer.png" width="35" height="49">`.repeat(this.mistakesQuantity);
  }
}
