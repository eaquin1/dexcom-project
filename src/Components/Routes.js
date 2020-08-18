import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import PrivateLanding from "./PrivateLanding";
import MealList from "./MealList";
import Landing from "./Landing";

function Routes() {
    return (
        <Switch>
            <Route exact path="/home">
                <PrivateLanding />
            </Route>
            <Route exact path="/meals">
                <MealList />
            </Route>
            <Route exact path="/">
                <Landing />
            </Route>
            <Redirect to="/" />
        </Switch>
    );
}

export default Routes;
