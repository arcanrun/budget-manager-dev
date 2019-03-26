//@flow
import { TOGGLE_MENU } from "../constants";

type TOGGLE_MENU_type = {
  type: TOGGLE_MENU
};

export const toggleMenu = (): TOGGLE_MENU_type =>
  ({
    type: TOGGLE_MENU
  }: TOGGLE_MENU_type);
