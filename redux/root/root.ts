import { combineReducers, createStore } from "redux";
import { EditReducer, Reducer, RerenderMenu, SaveReducer } from "../reducer/reducer";

const rootReducer = combineReducers({
    Reducer,
    RerenderMenu,
    SaveReducer,
    EditReducer
});

const store = createStore(rootReducer);

export default store;