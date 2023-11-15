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
    const menuInput = await InputView.readMenu();
    const order = Calculate.makeOrder(menuInput);
    return { date, order };
  },
  previewBenefit: function ({ date, order }) {
    let benefit;
    OutputView.printOrder(order);
    const total = Calculate.total(order);
    OutputView.printTotal(total);
    OutputView.printGift(total);
    const trigger = Calculate.triggerSwitchEvent(order);

    if (trigger) benefit = Calculate.switchEvent(date, order, benefit, total);
    OutputView.printBenefit(benefit);
  },
};

export default Controller;
