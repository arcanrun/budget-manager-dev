//@flow
import { combineReducers } from "redux";
import { modal } from "./modal";
import { user } from "./user";

export const rootReducer = combineReducers({ user, modal });
