import { MissionUtils } from "@woowacourse/mission-utils";
import { Menu } from "../constant";

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

  printOrder(Menu) {
    //ex) Menu: '티본스테이크-1,바비큐립-1,초코케이크-2,제로콜라-1'
    MissionUtils.Console.print(
      "12월 26일에 우테코 식당에서 받을 이벤트 혜택 미리 보기!"
    );
    const order = Menu.replaceAll(/(\D+)-(\d+)/g, "$1 $2개\n").replaceAll(
      ",",
      ""
    );
    MissionUtils.Console.print(`<주문 메뉴>\n${order}`);
  },

  printTotal(totalPrice) {
    MissionUtils.Console.print(`<할인 전 총주문 금액>\n${totalPrice}원`);
  },

  /**
   *
   * @param {number} totalPrice
   */
  printGift(totalPrice) {
    const gift = totalPrice >= 120000 ? "샴페인 1개" : "없음";
    MissionUtils.Console.print(`<증정 메뉴>\n${gift}`);
  },

  // ...
};

export default OutputView;

// 추가 공지대로 수정
