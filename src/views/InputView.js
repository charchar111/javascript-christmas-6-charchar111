import { MissionUtils } from "@woowacourse/mission-utils";

const InputView = {
  async readDate() {
    while (true) {
      try {
        const input = await MissionUtils.Console.readLineAsync(
          "12월 중 식당 예상 방문 날짜는 언제인가요? (숫자만 입력해 주세요!)"
        );
        this.validationReadDate(input);
        return input;
      } catch (error) {
        MissionUtils.Console.print(`[ERROR] ${error.message}`);
      }
    }
  },
  validationReadDate(input) {
    const number = Number(input);
    // input :a
    if (isNaN(number))
      throw new Error("유효하지 않은 날짜입니다. 다시 입력해 주세요.");
    if (number < 1 || number > 31)
      throw new Error("날짜는 1에 31이 사이만 가능합니다.");
    if (number % 1 !== 0) throw new Error("날짜는 정수로만 입력가능합니다.");
  },

  async readMenu() {
    const input = await MissionUtils.Console.readLineAsync(
      "주문하실 메뉴를 메뉴와 개수를 알려 주세요. (e.g. 해산물파스타-2,레드와인-1,초코케이크-1)"
    );
    return input;
  },
};
export default InputView;

// 추가공지대로 수정
