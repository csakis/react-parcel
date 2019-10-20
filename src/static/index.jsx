import React from "react";
import { combineReducers, createStore } from "redux";
import { Provider } from "react-redux";
import { boardReducer } from "../app/reducers/board-reducer";
import { render } from "react-dom";
import App from "../app/App";

const allReducers = combineReducers({
  board: boardReducer
});

const store = createStore(
  allReducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

function renderApp() {
  render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById("root")
  );
}

renderApp();

module.hot.accept();
