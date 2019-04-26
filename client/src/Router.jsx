import React, { Fragment } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { Registration } from "./Components/Registration";
import { LoginPage } from "./Components/LoginPage";
import { Dashboard } from "./Components/Dashboard";
import { Home } from "./Components/LandingPage";

import axios from "axios";

const Router = () => {

  const ProtectedRoute = ({ component: Component, ...rest }) => {
    const isAuthorized = () => {
      axios.defaults.headers.common['Authorization'] = localStorage.getItem('authToken') || null;
        /*if setting null does not remove `Authorization` header then try
          delete axios.defaults.headers.common['Authorization'];
        */
      return Boolean(localStorage.getItem('authToken'));
    }

    return (
        <Route {...rest}
          render={props =>
            isAuthorized() ? <Component {...props} /> : <Redirect to="/login" />
          }
        />
    )
  };

  return(
    <Fragment>
      <Switch>
        <ProtectedRoute path='/dashboard' component={Dashboard} />
        <Route path="/register" component={Registration} />
        <Route path="/login" component={LoginPage} />
        <Route path="/" component={Home} />
      </Switch>
    </Fragment>
  )
};

export default Router;
