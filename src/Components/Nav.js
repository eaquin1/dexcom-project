import React from "react";
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:5000";
function Nav({ user, logout }) {
    const loggedIn = (
        <>
            <Button color="inherit" onClick={logout}>
                Logout
            </Button>

            <Button color="inherit" href="/meals">
                Meals
            </Button>
            <Button color="inherit" href="/home">
                Home
            </Button>
        </>
    );

    const loggedOut = (
        <Button color="inherit" href={`${BASE_URL}/auth/dexcom`}>
            Login
        </Button>
    );
    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                    ></IconButton>
                    {user ? loggedIn : loggedOut}
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default Nav;
