//@flow
import * as type from "../constants";

type MenuState = {
  visible: boolean
};

const initialState: MenuState = {
  visible: false
};
export function menu(
  state: MenuState = initialState,
  action: { type: string }
): MenuState {
  switch (action.type) {
    case type.TOGGLE_MENU:
      return { ...state, visible: !state.visible };
    default:
      return state;
  }
}
