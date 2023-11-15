import { MissionUtils } from "@woowacourse/mission-utils";
import { Menu, MenuCategoryEnum, discountLog, switchBitLog } from "./constant";

const Calculate = {
  makeOrder: function (order) {
    //ex) input: 티본스테이크-1,바비큐립-1,초코케이크-2,제로콜라-1
    const orderArray = order
      .split(/[,-]/)
      .map((element) => element.replaceAll("'", ""));

    this.validateOrderArray(orderArray);
    const newOrder = this.makeNewOrder(orderArray);
    // console.log(newOrder);
    this.validateNewOrder(newOrder);
    return newOrder;
  },

  validateOrderArray: function (orderArray) {
    orderArray.forEach((element, index, array) => {
      if (isNaN(Number(element)) == true) {
        const isDuplicate =
          array.filter((innerElement) => element == innerElement).length > 1;
        if (isDuplicate == true)
          throw new Error("유효하지 않은 주문입니다. 다시 입력해 주세요.");
      }
    });
  },

  makeNewOrder: function (orderArray) {
    const newOrder = {};
    orderArray.forEach((element, index, array) => {
      if (index !== 0 && index % 2 === 1 && isNaN(Number(element)) == false) {
        newOrder[array[index - 1]] = Number(element);
        return;
      }

      newOrder[element] = undefined;
    });
    return newOrder;
  },

  validateNewOrder: function (newOrder) {
    for (const foodKey in newOrder) {
      if (
        newOrder[foodKey] === undefined ||
        newOrder[foodKey] <= 0 ||
        newOrder[foodKey] % 1 !== 0
      )
        throw new Error("유효하지 않은 주문입니다. 다시 입력해 주세요.");
      if (Menu.getPriceByName(foodKey) === undefined)
        throw new Error("유효하지 않은 주문입니다. 다시 입력해 주세요.");

      // if (true)
      //   throw new Error(
      //     "[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요."
      //   );
    }
    const orderCategory = [];
    for (const foodKey in newOrder)
      orderCategory.push(Menu.getCategoryByName(foodKey));
    if (orderCategory.find((element) => element !== "drink") == undefined)
      throw new Error("음료만 주문할 수는 없습니다.");

    console.log(newOrder);
    let total = 0;
    for (const foodKey in newOrder) total += newOrder[foodKey];
    if (total > 20)
      throw new Error(
        "최대 주문 수량을 초과했습니다. 주문은 한번에 20개까지 가능합니다."
      );
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
    if (this.total(menu) < 10000) return false;
    return true;
  },
  switchEvent: function (date, order, total) {
    //  date: '3', order: { '티본스테이크': 1, '바비큐립': 1, '초코케이크': 2, '제로콜라': 1 }
    const Week = new Date(`2023-12-${date.padStart(2, 0)}`).getDay();
    const isSunday = (date - 3) % 7;
    let checkBit = this.makeCheckBit(0, date, Week, isSunday);

    if (checkBit === 0) return benefit;

    const benefit = this.triggerDiscount(checkBit, total, order, date);
    return benefit;
  },

  triggerDiscount: function (checkBit, total, order, date) {
    let benefit = {
      DDay: null,
      weekday: null,
      weekend: null,
      special: null,
      gift: null,
    };

    if (checkBit & switchBitLog.DISCOUNT_D_DAY)
      benefit.DDay = this.DiscountDDay(date);
    if (checkBit & switchBitLog.DISCOUNT_WEEKDAY)
      benefit.weekday = this.DiscountWeekday(order);
    if (checkBit & switchBitLog.DISCOUNT_WEEKEND)
      benefit.weekend = this.DiscountWeekend(order);
    if (checkBit & switchBitLog.DISCOUNT_SPECIAL)
      benefit.special = discountLog.special;
    if (total > discountLog.StandardCostGift) benefit.gift = discountLog.gift;

    return benefit;
  },

  makeCheckBit(checkBit, date, Week, isSunday) {
    if (date >= 1 && date <= 25)
      checkBit = checkBit | switchBitLog.DISCOUNT_D_DAY;

    if (Week <= 4) checkBit = checkBit | switchBitLog.DISCOUNT_WEEKDAY;
    if (Week > 4) checkBit = checkBit | switchBitLog.DISCOUNT_WEEKEND;
    if (date >= 3 && (isSunday == 0 || date == 25))
      checkBit = checkBit | switchBitLog.DISCOUNT_SPECIAL;

    return checkBit;
  },

  DiscountDDay: function (date) {
    const discount = 1000 + (date - 1) * 100;
    return discount;
  },
  DiscountWeekday: function (order) {
    // order: { '티본스테이크': 1, '바비큐립': 1, '초코케이크': 2, '제로콜라': 1 }
    let discount = 0;
    for (const food in order)
      discount += this.findDiscountMenu(food, order, MenuCategoryEnum.dessert);
    return discount;
  },

  DiscountWeekend: function (order) {
    // order: { '티본스테이크': 1, '바비큐립': 5, '초코케이크': 2, '제로콜라': 1 }
    let discount = 0;

    for (const food in order)
      discount += this.findDiscountMenu(food, order, MenuCategoryEnum.main);
    return discount;
  },

  findDiscountMenu: function (food, order, category) {
    let discount = 0;
    for (const menuKey in Menu.allMenu) {
      const price = Menu.allMenu[menuKey][food];

      if (price !== undefined && menuKey == category)
        // 해당 메뉴가 카테고리에 존재 && 할인 목표 카테고리
        discount += order[food] * 2023;
    }
    return discount;
  },
};

export default Calculate;
