import Calculate from "./calculate";
import InputView from "./views/InputView";
import OutputView from "./views/OutputView";

const Controller = {
  userSetting: async function () {
    OutputView.init();
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
    // 이벤트 적용 여부 검사

    if (trigger) benefit = Calculate.switchEvent(date, order, total);
    OutputView.printTotalBenefit(benefit, total);
  },
};

export default Controller;
