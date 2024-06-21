import { combineReducers, createStore } from "redux";
import { AuthReducer, EditReducer, Reducer, RerenderMenu, SaveReducer } from "../reducer/reducer";

const rootReducer = combineReducers({
    Reducer,
    RerenderMenu,
    SaveReducer,
    EditReducer,
    AuthReducer
});

const store = createStore(rootReducer);

export default store;