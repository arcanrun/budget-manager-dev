import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import mVKMiniAppsScrollHelper from "@vkontakte/mvk-mini-apps-scroll-helper";

import "./index.css";
import { AppContainer } from "./containers/index";
import * as serviceWorker from "./serviceWorker";
import { store } from "./configureStore";

const root = document.getElementById("root");

mVKMiniAppsScrollHelper(root);

ReactDOM.render(
  <Provider store={store}>
    <AppContainer />
  </Provider>,
  root
);

if (module.hot) {
  module.hot.accept();
}
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
