import Calculate from "./calculate";
import InputView from "./views/InputView";
import OutputView from "./views/OutputView";

const Controller = {
  printIntro: function () {
    OutputView.init();
  },
  userSetting: async function () {
    const date = await InputView.readDate();
    OutputView.printMenu();
    const menu = await InputView.readMenu();
    return { date, menu };
  },
  previewBenefit: function ({ date, menu }) {
    OutputView.printOrder(menu);
    const total = Calculate.total(menu);
    OutputView.printTotal(total);
    OutputView.printGift(total);
  },
};

export default Controller;
