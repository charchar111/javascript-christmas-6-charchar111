import { MissionUtils } from "@woowacourse/mission-utils";
import Calculate from "./calculate";
import InputView from "./views/InputView";
import OutputView from "./views/OutputView";

const Controller = {
  userSetting: async function () {
    OutputView.init();
    const date = await InputView.readDate();
    OutputView.printMenu();

    const order = await this.readMenuAndOrder();

    return { date, order };
  },

  readMenuAndOrder: async function () {
    while (true) {
      try {
        const menuInput = await InputView.readMenu();
        const order = Calculate.makeOrder(menuInput);
        return order;
      } catch (error) {
        MissionUtils.Console.print(`[ERROR] ${error.message}`);
      }
    }
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
