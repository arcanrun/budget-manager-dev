//@flow
import { API } from "../API";

const tutorialChangeRequest = () => {
  return {
    type: "TUTORIAL_CHANGE_REQUEST",
    isFetching: true,
    error: false
  };
};
const tutorialChangeFailed = (res: Object) => {
  return {
    type: "TUTORUAL_CHANGE_ERROR",
    error: true,
    isFetching: false,
    message: res.error_message
  };
};

const tutorialChangeSuccess = (res: Object) => {
  return {
    type: "TUTORUAL_CHANGE_SUCCESS",
    isFetching: false,
    error: false,
    payload: res
  };
};

export const tutorialChangeState = (
  is_tutorial_done: boolean,
  params: string
) => {
  return (dispatch: Function) => {
    dispatch(tutorialChangeRequest());
    fetch(API.CHANGE_TUTROIAL_STATE, {
      method: "POST",
      body: JSON.stringify({ params, is_tutorial_done })
    })
      .then(res => res.json)
      .then(res => dispatch(tutorialChangeSuccess(res)))
      .catch(err => dispatch(tutorialChangeFailed(err)));
  };
};

// export const tutorialUnDoneSuccess = () => {};
