import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { AddGigPage } from '../components/AddGigPage';
import Header from '../components/Header';
import NotFound from '../components/NotFound';
import GigDashboard from '../components/GigDashboard';
const AppRouter = ()=>(
    <BrowserRouter>
        <div>
            <Header />
            <Switch>
            <Route path="/" component={GigDashboard} exact={true}/>
            <Route path="/create" component={AddGigPage} />
            <Route component={NotFound} />
            </Switch>
        </div>


    </BrowserRouter>
);

export default AppRouter;