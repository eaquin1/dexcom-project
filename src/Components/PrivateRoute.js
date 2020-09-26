import React from "react";
import { Route, Redirect } from "react-router-dom";

function PrivateRoute({ exact, path, children, user }) {
    console.log("cookie", document.cookie);
    return document.cookie === `id=${user}` ? (
        <Route exact={exact} path={path}>
            {children}
        </Route>
    ) : (
        <Redirect to="/" />
    );
}

export default PrivateRoute;
