import Controller from "./controller";

class App {
  async run() {
    const userSetting = await Controller.userSetting();
    console.log(userSetting);
    Controller.previewBenefit(userSetting);
  }
}

export default App;

// 최종 브랜치 = main
