//@flow

type UserState = {
  vk_id: number,
  avatar: string,
  name: string,
  sure_name: string,
  history: Array<any>,
  budget: number,
  calc: {
    "50": number,
    "30": number,
    "20": number,
    M50: number,
    M30: number
  }
};

export const user: UserState = {
  vk_id: 12345,
  avatar:
    "https://s3.cdn.teleprogramma.pro/wp-content/uploads/2018/04/c3633d6374a512d817336ee0f9dbc85d.jpg",
  name: "Павел",
  sure_name: "Дуров",
  history: [],
  budget: 15000,
  payday: "20.04.2019",
  calc: {
    "50": 7500,
    "30": 4500,
    "20": 2000,
    M50: 150,
    M30: 130
  }
};
