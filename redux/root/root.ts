import { combineReducers, createStore } from 'redux';
import { AuthReducer, EditReducer, Reducer, RerenderMenu } from '../reducer/reducer';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import AsyncStorage from '@react-native-async-storage/async-storage';

const rootReducer = combineReducers({
  Reducer,
  RerenderMenu,
  EditReducer,
  AuthReducer
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer);
const persistor = persistStore(store);
export default () => {
  return { store, persistor };
};

// const store = createStore(rootReducer);

// export default store;
