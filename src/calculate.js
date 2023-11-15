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

  total: function (order) {
    //ex) order: { '티본스테이크': 1, '바비큐립': 1, '초코케이크': 2, '제로콜라': 1 }

    let totalPrice = 0;

    for (const key in order) {
      const price = Menu.getPriceByName(key) * order[key];

      totalPrice += price;
    }
    return totalPrice;
  },

  triggerSwitchEvent(menu) {
    if (this.total(menu) < 10000) {
      console.log("최소 금액 미달");
      return false;
    }
  },

  switchEvent: function (date, order, benefit) {
    //  date: '3', order: { '티본스테이크': 1, '바비큐립': 1, '초코케이크': 2, '제로콜라': 1 },benefit=undefined
    let copyBenefit;

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

    if (checkBit === 0) return copyBenefit;

    copyBenefit = {
      DDay: null,
      weekday: null,
      weekend: null,
      special: null,
      gift: null,
    };

    if (checkBit & switchBitLog.DISCOUNT_D_DAY)
      copyBenefit.DDay = this.DiscountDDay(copyBenefit, date);
    if (checkBit & switchBitLog.DISCOUNT_WEEKDAY)
      this.DiscountWeekday(copyBenefit);
    if (checkBit & switchBitLog.DISCOUNT_WEEKEND)
      this.DiscountWeekend(copyBenefit);
    if (checkBit & switchBitLog.DISCOUNT_SPECIAL)
      this.DiscountSpecial(copyBenefit);

    return copyBenefit;
  },
  DiscountDDay: function (benefit, date) {
    console.log("DiscountDDay");
    const discount = 1000 + (date - 1) * 100;
    return discount;
  },
  DiscountWeekday: function (benefit) {
    console.log("DiscountWeekday");
  },
  DiscountWeekend: function (benefit) {
    console.log("DiscountWeekend");
  },
  DiscountSpecial: function (benefit) {
    console.log("DiscountSpecial");
  },
};

export default Calculate;
