import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import PrivateLanding from "./PrivateLanding";
import MealList from "./MealList";
import Landing from "./Landing";
import PrivateRoute from "./PrivateRoute";

function Routes({ user }) {
    return (
        <Switch>
            <PrivateRoute exact path="/home" user={user}>
                <PrivateLanding />
            </PrivateRoute>
            <PrivateRoute exact path="/meals" user={user}>
                <MealList />
            </PrivateRoute>
            <Route exact path="/">
                <Landing />
            </Route>
            <Redirect to="/" />
        </Switch>
    );
}

export default Routes;
