import { combineReducers, createStore } from "redux";
import { Reducer, RerenderMenu } from "../reducer/reducer";

const rootReducer = combineReducers({
    Reducer,
    RerenderMenu
});

const store = createStore(rootReducer);

export default store;