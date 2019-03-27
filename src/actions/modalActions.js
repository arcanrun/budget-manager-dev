import { TOGGLE_MODAL } from "../constants";

export const toggleModal = typeModal => ({
  type: TOGGLE_MODAL,
  payload: {
    typeModal
  }
});
