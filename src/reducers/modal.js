//@flow
import { TOGGLE_MODAL } from "../constants";

type stateType = {
  modalIsVisible: boolean
};

const initialState: stateType = {
  modalIsVisible: false
};

export function modal(state: stateType = initialState, action: Object) {
  switch (action.type) {
    case TOGGLE_MODAL:
      return { ...state, modalIsVisible: !state.modalIsVisible };
    default:
      return state;
  }
}
