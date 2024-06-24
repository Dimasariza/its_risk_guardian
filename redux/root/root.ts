import { combineReducers, createStore } from "redux";
import { AuthReducer, EditReducer, Reducer, RerenderMenu } from "../reducer/reducer";

const rootReducer = combineReducers({
    Reducer,
    RerenderMenu,
    EditReducer,
    AuthReducer
});

const store = createStore(rootReducer);

export default store;