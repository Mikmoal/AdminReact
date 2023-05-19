import reducer from "./reducer.js";
import thunk from "redux-thunk";
import { applyMiddleware, createStore, compose } from "redux";

//const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middleware = [thunk];

const store = createStore(
  reducer,
  compose(
    applyMiddleware(...middleware),
    typeof window !== "undefined" && window.__REDUX_DEVTOOLS_EXTENSION__
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : (f) => f
  )
);

export default store;
