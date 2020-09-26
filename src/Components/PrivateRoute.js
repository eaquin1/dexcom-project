import React from "react";
import { Route, Redirect } from "react-router-dom";

function PrivateRoute({ exact, path, children, user }) {
    return (
        <Route exact={exact} path={path}>
            {children}
        </Route>
    );
}

export default PrivateRoute;
