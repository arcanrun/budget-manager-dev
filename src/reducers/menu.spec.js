import { menu } from "./menu";
import * as type from "../constants";

describe("TESTING MENU REDUCER", () => {
  const initialState = {
    visible: false
  };
  it("should return initial state", () => {
    expect(menu(undefined, {})).toEqual(initialState);
  });

  it("should switch initial state FALSE to TRUE", () => {
    const action = {
      type: type.TOGGLE_MENU
    };
    expect(menu(initialState, action)).toEqual({
      visible: !initialState.visible
    });
  });
});
