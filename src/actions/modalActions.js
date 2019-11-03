//@flow
import { TOGGLE_MODAL, HIDE_MODAL } from "../constants";

export const toggleModal = (typeModal: string, payload: string) => ({
  type: TOGGLE_MODAL,
  payload: {
    typeModal,
    payload
  }
});
export const hideModal = () => ({
  type: HIDE_MODAL
});
