import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';
import { fetchGigs, startAddGig } from './actions/gigs';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
const store = configureStore();
store.dispatch(fetchGigs())
// store.dispatch(startAddGig({companyName:"ss",perDiem:200,startDate:234234,endDate:2324234,description:"ghfsdjghf"}))
const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

ReactDOM.render(jsx, document.getElementById('app'));
