//@flow
import {
  TUTORUAL_CHANGE_SUCCESS,
  TUTORIAL_CHANGE_REQUEST,
  TUTORUAL_CHANGE_ERROR
} from "../constants/index";
import { API } from "../API";

const tutorialChangeRequest = () => {
  return {
    type: TUTORIAL_CHANGE_REQUEST,
    isFetching: true,
    error: false
  };
};
const tutorialChangeFailed = (res: Object) => {
  return {
    type: TUTORUAL_CHANGE_ERROR,
    error: true,
    isFetching: false,
    message: res
  };
};

const tutorialChangeSuccess = (payload: Object) => {
  return {
    type: TUTORUAL_CHANGE_SUCCESS,
    isFetching: false,
    error: false,
    payload: payload
  };
};

export const tutorialChangeState = (is_tutorial_done: boolean) => {
  return (dispatch: Function) => {
    dispatch(tutorialChangeRequest());
    fetch(API.CHANGE_TUTROIAL_STATE, {
      method: "POST",
      body: JSON.stringify({ params: window.vkSign, is_tutorial_done })
    })
      .then(res => res.json())
      .then(res => dispatch(tutorialChangeSuccess(res.PAYLOAD)))
      .catch(err => dispatch(tutorialChangeFailed(err)));
  };
};

// export const tutorialUnDoneSuccess = () => {};
