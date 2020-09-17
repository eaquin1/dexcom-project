import React from "react";
import { Route, Redirect } from "react-router-dom";

function PrivateRoute({ exact, path, children }) {
    //const { currentUser } = useContext(UserContext);

    if (document.cookie.slice(0, 3) !== "id=") {
        return <Redirect to="/" />;
    }

    return (
        <Route exact={exact} path={path}>
            {children}
        </Route>
    );
}

export default PrivateRoute;
