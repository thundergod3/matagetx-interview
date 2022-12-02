import { combineReducers } from "redux";

import authsReducer from "./reducers/authsReducer";
import moviesReducer from "./reducers/moviesReducer";

const rootReducer = combineReducers({
  authsReducer,
  moviesReducer,
});

export default rootReducer;
