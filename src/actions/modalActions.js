import { TOGGLE_MODAL, HIDE_MODAL } from "../constants";

export const toggleModal = typeModal => ({
  type: TOGGLE_MODAL,
  payload: {
    typeModal
  }
});
export const hideModal = () => ({
  type: HIDE_MODAL
});
