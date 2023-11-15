import { MissionUtils } from "@woowacourse/mission-utils";
import { Menu, discountLog } from "../constant";

const OutputView = {
  init() {
    MissionUtils.Console.print(
      "안녕하세요! 우테코 식당 12월 이벤트 플래너입니다."
    );
  },
  printMenu() {
    let message = "";
    MissionUtils.Console.print("<메뉴>");

    Menu.getAllMenu().forEach((element) => {
      const title = element.label;

      const content = Menu.getStringByCategory(element.category);

      message += `<${title}>\n${content}\n\n`;
    });
    console.log(message);

    // ...
  },

  printOrder(order) {
    //ex) order: { '티본스테이크': 1, '바비큐립': 1, '초코케이크': 2, '제로콜라': 1 }
    MissionUtils.Console.print(
      "12월 26일에 우테코 식당에서 받을 이벤트 혜택 미리 보기!"
    );
    let orderString = "";

    for (const key in order) {
      orderString += `${key} ${order[key]}개\n`;
    }

    MissionUtils.Console.print(`<주문 메뉴>\n${orderString.trim()}`);
  },

  printTotal(totalPrice) {
    MissionUtils.Console.print(`<할인 전 총주문 금액>\n${totalPrice}원`);
  },

  /**
   *
   * @param {number} totalPrice
   */
  printGift(totalPrice) {
    const gift =
      totalPrice >= discountLog.StandardCostGift ? "샴페인 1개" : "없음";
    MissionUtils.Console.print(`<증정 메뉴>\n${gift}`);
  },

  printBenefit(benefit, total) {
    // benefit ={
    //   DDay: 1200,
    //   weekday: 4046,
    //   weekend: null,
    //   special: 1000,
    //   gift: [ { prize: '샴페인', cost: 25000, count: 1 } ]
    // }

    let badge;

    const message = {
      DDay: null,
      weekday: null,
      weekend: null,
      special: null,
      gift: null,
      totalDiscount: 0,
    };
    console.log(benefit);
    if (benefit !== undefined) {
      console.log("할인 로직");
      benefit.totalDiscount = 0;
      // 혜택 로직
      if (benefit.DDay)
        message.DDay = `크리스마스 디데이 할인: -${benefit.DDay.toLocaleString()}원`;

      if (benefit.weekday)
        message.weekday = `평일 할인: -${benefit.weekday.toLocaleString()}원`;
      if (benefit.weekend)
        message.weekend = `주말 할인: -${benefit.weekend.toLocaleString()}원`;
      if (benefit.special)
        message.special = `특별 할인: -${benefit.special.toLocaleString()}원`;

      if (benefit.gift) {
        let giftTotal = 0;
        for (const gift of benefit.gift) {
          giftTotal += gift.cost * gift.count;
        }
        message.gift = `증정 이벤트: -${giftTotal}원`;
        benefit.totalDiscount += giftTotal;
      }

      benefit.totalDiscount +=
        benefit.DDay + benefit.weekday + benefit.weekend + benefit.special;

      if (benefit.totalDiscount > 0)
        message.totalDiscount = `-${benefit.totalDiscount.toLocaleString()}원`;

      if (benefit.totalDiscount >= 5000 && benefit.totalDiscount < 10000) {
        badge = "별";
      } else if (
        benefit.totalDiscount >= 10000 &&
        benefit.totalDiscount < 20000
      ) {
        badge = "트리";
      } else if (benefit.totalDiscount >= 20000) {
        badge = "산타";
      }
    }

    MissionUtils.Console.print(
      `<혜택 내역>\n${
        !benefit
          ? "없음"
          : benefit.totalDiscount == 0
          ? "없음"
          : `${message.DDay !== null ? message.DDay + "\n" : ""}${
              message.weekday !== null ? message.weekday + "\n" : ""
            }${message.weekend !== null ? message.weekend + "\n" : ""}${
              message.special !== null ? message.special + "\n" : ""
            }${message.gift !== null ? message.gift + "\n" : ""}
          `
      }`
    );
    MissionUtils.Console.print(
      `<총혜택 금액>\n${
        !benefit
          ? "없음"
          : benefit.totalDiscount == null
          ? "없음"
          : message.totalDiscount
      }`
    );
    MissionUtils.Console.print(
      `<할인 후 예상 결제 금액>\n${
        !benefit ? total : (total - benefit.totalDiscount).toLocaleString()
      }원`
    );
    MissionUtils.Console.print(
      `<12월 이벤트 배지>\n${badge === undefined ? "없음" : badge}`
    );
  },
  // ...
};

export default OutputView;

// 추가 공지대로 수정
