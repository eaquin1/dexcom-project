import React from "react";
import { Route, Redirect } from "react-router-dom";

function PrivateRoute({ exact, path, children, user }) {
    console.log("user in Private route", user);
    return user !== null ? (
        <Route exact={exact} path={path}>
            {children}
        </Route>
    ) : (
        <Redirect to="/" />
    );
}

export default PrivateRoute;
