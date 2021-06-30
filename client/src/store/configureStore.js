import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import gigsReducer from '../reducers/gigs';
import thunk from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
    combineReducers({
      gigs: gigsReducer,
    }),
    composeEnhancers(applyMiddleware(thunk))
  );
  return store;
};
