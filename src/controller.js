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
};

export default Controller;
