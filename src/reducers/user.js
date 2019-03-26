//@flow

type UserState = {
  vk_id: number,
  avatar: string,
  name: string,
  sure_name: string,
  history?: Array<any>,
  budget?: number,
  pay_day?: string,
  calc?: {
    "50"?: number,
    "30"?: number,
    "20"?: number,
    M50?: number,
    M30?: number
  }
};

const initialState: UserState = {
  vk_id: 123456,
  avatar: "",
  name: "Pavel",
  sure_name: "Durov",
  history: [],
  budget: undefined,
  pay_day: undefined,
  calc: {
    "50": undefined,
    "30": undefined,
    "20": undefined,
    M50: undefined,
    M30: undefined
  }
};

export function user(state: UserState = initialState, action: Object) {
  switch (action.type) {
    case "ADD_BUDGET":
      return { ...state, budget: action.payload };
    default:
      return state;
  }
}
