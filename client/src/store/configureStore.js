import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import gigsReducer from '../reducers/gigs';
import gigsFilter from '../reducers/filters';
import auth from '../reducers/auth'
import thunk from 'redux-thunk';
import {loadState} from'./localStorage';
const persistedState=loadState();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
    combineReducers({
      gigs: gigsReducer,
      filters:gigsFilter,
      auth:auth
    }),persistedState,
    composeEnhancers(applyMiddleware(thunk))
  );
  return store;
};
/*
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import gigsReducer from '../reducers/gigs';
import gigsFilter from '../reducers/filters';
import auth from '../reducers/auth';
import thunk from 'redux-thunk';

const persistConfig = {
  key: 'root',
  storage,
}
const persistedReducer = persistReducer(persistConfig, combineReducers({
  gigs: gigsReducer,
  filters:gigsFilter,
  auth:auth
})) 
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
    persistedReducer,
    composeEnhancers(applyMiddleware(thunk))
  );
  let persistor = persistStore(store)
  return { store, persistor }
};
*/