import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import AddGigPage from "../components/AddGigPage";
import NotFound from "../components/NotFound";
import GigDashboard from "../components/GigDashboard";
import EditGigPage from "../components/Edit";
import Login from "../components/Login";
import Signup from "../components/Signup";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";
import { connect } from "react-redux";

const AppRouter = ({ isAuthenticated }) => (
  <BrowserRouter>
    <div>
      {/* {
        window.location.pathname=="/" || window.location.pathname=="/signup"?null:<Header/>
      } */}

      <Switch>
        <PublicRoute
          path="/"
          isAuthenticated={isAuthenticated}
          component={Login}
          exact={true}
        />
        <PublicRoute
          path="/signup"
          isAuthenticated={isAuthenticated}
          component={Signup}
        />
        <PrivateRoute
          path="/dashboard"
          isAuthenticated={isAuthenticated}
          component={GigDashboard}
        />
        <PrivateRoute
          path="/create"
          isAuthenticated={isAuthenticated}
          component={AddGigPage}
        />
        <PrivateRoute
          path="/edit/:id"
          isAuthenticated={isAuthenticated}
          component={EditGigPage}
        />

        <Route component={NotFound} />
      </Switch>
    </div>
  </BrowserRouter>
);

const mapStateToProps = (state) => ({
  isAuthenticated: !!state.auth.uid,
});

export default connect(mapStateToProps)(AppRouter);
