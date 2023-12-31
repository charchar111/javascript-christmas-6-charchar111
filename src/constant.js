export const MenuCategoryEnum = {
  appetizer: "appetizer",
  main: "main",
  dessert: "dessert",
  drink: "drink",
};

export const Menu = {
  allMenu: {
    appetizer: {
      양송이수프: 6000,
      타파스: 5500,
      시저샐러드: 8000,
      label: "애피타이저",
      category: MenuCategoryEnum.appetizer,
    },
    main: {
      티본스테이크: 55000,
      바비큐립: 54000,
      해산물파스타: 35000,
      크리스마스파스타: 25000,
      label: "메인",
      category: MenuCategoryEnum.main,
    },
    dessert: {
      초코케이크: 15000,
      아이스크림: 5000,
      label: "디저트",
      category: MenuCategoryEnum.dessert,
    },

    drink: {
      제로콜라: 3000,
      레드와인: 60000,
      샴페인: 25000,
      label: "음료",
      category: MenuCategoryEnum.drink,
    },
  },

  getAllMenu: function () {
    return Object.keys(this.allMenu).map((property) => {
      return this.allMenu[property];
    });
  },

  getStringByCategory: function (category) {
    const copyAllMenu = { ...this.allMenu[category] };
    delete copyAllMenu.label;
    delete copyAllMenu.category;
    return JSON.stringify(copyAllMenu).slice(1, -1).replaceAll('"', "");
  },
  getPriceByName: function (name) {
    let target;
    const keys = Object.keys(this.allMenu);
    keys.forEach((property) => {
      if (this.allMenu[property][name] !== undefined) {
        target = this.allMenu[property][name];
        return;
        // 타겟 할당
      }
    });

    return target;
  },
  getCategoryByName: function (name) {
    let targetCategory;
    for (const category in this.allMenu) {
      if (this.allMenu[category][name] !== undefined) targetCategory = category;
    }
    return targetCategory;
  },
};

export const switchBitLog = {
  DISCOUNT_D_DAY: 1,
  DISCOUNT_WEEKDAY: 1 << 1,
  DISCOUNT_WEEKEND: 1 << 2,
  DISCOUNT_SPECIAL: 1 << 3,
};

export const discountLog = {
  special: 1000,
  StandardCostGift: 120000,
  gift: [{ prize: "샴페인", cost: 25000, count: 1 }],
};
