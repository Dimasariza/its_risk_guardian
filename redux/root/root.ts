import { combineReducers, createStore } from 'redux';
import { AuthReducer, EditReducer, Reducer, RerenderMenu } from '../reducer/reducer';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

const rootReducer = combineReducers({
  Reducer,
  RerenderMenu,
  EditReducer,
  AuthReducer
});

const persistConfig = {
  key: 'root',
  storage
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer);
const persistor = persistStore(store);
export default () => {
  return { store, persistor };
};

// const store = createStore(rootReducer);

// export default store;
