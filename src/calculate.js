import { MissionUtils } from "@woowacourse/mission-utils";
import { Menu } from "./constant";

const Calculate = {
  total: function (input) {
    //ex) input: 티본스테이크-1,바비큐립-1,초코케이크-2,제로콜라-1
    const order = {};
    let totalPrice = 0;
    const copyMenu = input
      .split(/[,-]/)
      .map((element) => element.replaceAll("'", ""));

    copyMenu.forEach((element, index, array) => {
      if (index === 0) {
        order[element] = undefined;
        return;
      }

      if (index % 2 === 1 && isNaN(Number(element)) == false) {
        order[array[index - 1]] = Number(element);
        return;
      }

      order[element] = undefined;
    });

    Object.keys(order).forEach((element) => {
      const price = Menu.getPriceByName(element) * order[element];

      totalPrice += price;
    });

    return totalPrice;
  },
};

export default Calculate;
