import { combineReducers, createStore } from "redux";
import { Reducer, RerenderMenu, SaveReducer } from "../reducer/reducer";

const rootReducer = combineReducers({
    Reducer,
    RerenderMenu,
    SaveReducer
});

const store = createStore(rootReducer);

export default store;