import { MissionUtils } from "@woowacourse/mission-utils";
import { Menu, switchBitLog } from "./constant";

const Calculate = {
  makeOrder: function (order) {
    //ex) input: 티본스테이크-1,바비큐립-1,초코케이크-2,제로콜라-1
    const newOrder = {};
    const orderArray = order
      .split(/[,-]/)
      .map((element) => element.replaceAll("'", ""));

    orderArray.forEach((element, index, array) => {
      if (index === 0) {
        newOrder[element] = undefined;
        return;
      }

      if (index % 2 === 1 && isNaN(Number(element)) == false) {
        newOrder[array[index - 1]] = Number(element);
        return;
      }

      newOrder[element] = undefined;
    });

    return newOrder;
  },

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

  triggerSwitchEvent(menu) {
    if (this.total(menu) < 10000) {
      console.log("최소 금액 미달");
      return false;
    }
  },

  switchEvent: function ({ date, menu }) {
    // { date: '3', menu: '티본스테이크-1,바비큐립-1,초코케이크-2,제로콜라-1' }

    const Week = new Date(`2023-12-${date.padStart(2, 0)}`).getDay();

    // 일 =0, 토=6
    let checkBit = 0;
    const isSunday = (date) => (date - 3) % 7;
    if (date >= 1 && date <= 25)
      checkBit = checkBit | switchBitLog.DISCOUNT_D_DAY;

    if (Week <= 4) checkBit = checkBit | switchBitLog.DISCOUNT_WEEKDAY;
    if (Week > 4) checkBit = checkBit | switchBitLog.DISCOUNT_WEEKEND;
    if (date >= 3 && (isSunday(date) == 0 || date == 25))
      checkBit = checkBit | switchBitLog.DISCOUNT_SPECIAL;

    if (checkBit & switchBitLog.DISCOUNT_D_DAY) this.DiscountDDay();
    if (checkBit & switchBitLog.DISCOUNT_WEEKDAY) this.DiscountWeekday();
    if (checkBit & switchBitLog.DISCOUNT_WEEKEND) this.DiscountWeekend();
    if (checkBit & switchBitLog.DISCOUNT_SPECIAL) this.DiscountSpecial();
  },
  DiscountDDay: function () {
    console.log("DiscountDDay");
  },
  DiscountWeekday: function () {
    console.log("DiscountWeekday");
  },
  DiscountWeekend: function () {
    console.log("DiscountWeekend");
  },
  DiscountSpecial: function () {
    console.log("DiscountSpecial");
  },
};

export default Calculate;
