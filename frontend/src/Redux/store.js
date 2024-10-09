import { reducer } from "./reducer";
import { legacy_createStore, applyMiddleware, combineReducers } from "redux";
import { thunk } from "redux-thunk";
const rootreducer = combineReducers({
  TransactionData: reducer,
});
const store = legacy_createStore(rootreducer, applyMiddleware(thunk));
export { store };
