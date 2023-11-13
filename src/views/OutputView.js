import { MissionUtils } from "@woowacourse/mission-utils";
import { Menu } from "../constant";

const OutputView = {
  init() {
    MissionUtils.Console.print(
      "안녕하세요! 우테코 식당 12월 이벤트 플래너입니다."
    );
  },
  printMenu() {
    const menu = new Menu();
    let message = "";
    MissionUtils.Console.print("---주문 메뉴----");

    menu.getAllMenu().forEach((element) => {
      const title = element.label;

      const content = menu.getStringByCategory(element.category);

      message += `<${title}>\n${content}\n\n`;
    });
    console.log(message);

    // ...
  },
  // ...
};

export default OutputView;

// 추가 공지대로 수정
