import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { logger } from "redux-logger";

import { rootReducer } from "./reducers";
const middlewares = [];

if (process.env.NODE_ENV === `development`) {
  middlewares.push(logger);
}

middlewares.push(thunk);
// export const store = createStore(rootReducer, applyMiddleware(...middlewares));
export const store = compose(applyMiddleware(...middlewares))(createStore)(
  rootReducer
);
