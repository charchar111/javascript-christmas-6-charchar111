// import App from "../src/App.js";
// import { MissionUtils } from "@woowacourse/mission-utils";
// import { EOL as LINE_SEPARATOR } from "os";
// import Calculate from "../src/calculate.js";
// import InputView from "../src/views/InputView.js";

// const mockQuestions = (inputs) => {
//   MissionUtils.Console.readLineAsync = jest.fn();

//   MissionUtils.Console.readLineAsync.mockImplementation(() => {
//     const input = inputs.shift();

//     return Promise.resolve(input);
//   });
// };

// const getLogSpy = () => {
//   const logSpy = jest.spyOn(MissionUtils.Console, "print");
//   logSpy.mockClear();

//   return logSpy;
// };

// const getOutput = (logSpy) => {
//   return [...logSpy.mock.calls].join(LINE_SEPARATOR);
// };

// const expectLogContains = (received, expectedLogs) => {
//   expectedLogs.forEach((log) => {
//     expect(received).toContain(log);
//   });
// };

// describe("도메인 테스트", () => {
//   test("방문 날짜 및 메뉴 설정: 주문 메뉴와 개수, 날짜를 객체로 변환한다.", async () => {
//     // given
//     mockQuestions(["3", "티본스테이크-1,바비큐립-1,초코케이크-2,제로콜라-1"]);

//     // when
//     const date = await InputView.readDate();
//     const menuInput = await InputView.readMenu();
//     const order = Calculate.makeOrder(menuInput);
//     const returnValue = { date, order };

//     // then
//     expect(returnValue).toEqual({
//       date: "3",
//       order: {
//         티본스테이크: 1,
//         바비큐립: 1,
//         초코케이크: 2,
//         제로콜라: 1,
//       },
//     });
//   });
// });
test("임시", () => {});
