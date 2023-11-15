import { MissionUtils } from "@woowacourse/mission-utils";
import { Menu, MenuCategoryEnum, discountLog, switchBitLog } from "./constant";

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
    return true;
  },

  switchEvent: function (date, order, benefit, total) {
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
      copyBenefit.DDay = this.DiscountDDay(date);
    if (checkBit & switchBitLog.DISCOUNT_WEEKDAY)
      copyBenefit.weekday = this.DiscountWeekday(order);
    if (checkBit & switchBitLog.DISCOUNT_WEEKEND)
      copyBenefit.weekend = this.DiscountWeekend(order);
    if (checkBit & switchBitLog.DISCOUNT_SPECIAL)
      copyBenefit.special = discountLog.special;
    if (total > discountLog.StandardCostGift) null;
    copyBenefit.gift = discountLog.gift;

    return copyBenefit;
  },
  DiscountDDay: function (date) {
    console.log("DiscountDDay");
    const discount = 1000 + (date - 1) * 100;
    return discount;
  },
  DiscountWeekday: function (order) {
    console.log("DiscountWeekday");
    // order: { '티본스테이크': 1, '바비큐립': 1, '초코케이크': 2, '제로콜라': 1 }
    let discount = 0;

    for (const food in order) {
      for (const menuKey in Menu.allMenu) {
        const price = Menu.allMenu[menuKey][food];

        if (price !== undefined && menuKey == MenuCategoryEnum.dessert) {
          // 해당 메뉴가 카테고리에 존재 && 디저트
          discount += order[food] * 2023;
          // 할인 금액 추기
        }
      }
    }
    return discount;
  },
  DiscountWeekend: function (order) {
    console.log("DiscountWeekend");
    // order: { '티본스테이크': 1, '바비큐립': 5, '초코케이크': 2, '제로콜라': 1 }
    let discount = 0;

    for (const food in order) {
      for (const menuKey in Menu.allMenu) {
        const price = Menu.allMenu[menuKey][food];

        if (price !== undefined && menuKey == MenuCategoryEnum.main) {
          // 해당 메뉴가 카테고리에 존재 && 디저트
          console.log(food);
          discount += order[food] * 2023;
          // 할인 금액 추기
        }
      }
    }

    console.log(discount);
    return discount;
  },
};

export default Calculate;
