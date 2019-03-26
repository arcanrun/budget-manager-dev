//@flow
// const requestAddWholeBudget = () => ({
//   type: "ADD_BUDGET_REQUEST",

//   isFetching: true
// });
// const successtAddWholeBudget = () => ({
//   type: "ADD_BUDGET_SUCCESS",
//   isFetching: false
// });
// const failuretAddWholeBudget = message => ({
//   type: "ADD_BUDGET_FAILURE",
//   error: {
//     error: true,
//     message
//   }
// });

// export const addWholeBudget = (budget: number) => {
//   return dispatch: * => {

//   };
// };

export const addWholeBudget = (budget: number): Object => ({
  type: "ADD_BUDGET",
  payload: budget
});
