import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:5000";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

function Nav({ user, logout }) {
    const classes = useStyles();
    const loggedIn = (
        <div>
            <Button color="inherit" href="/home" className={classes.menuButton}>
                Home
            </Button>
            <Button
                color="inherit"
                href="/meals"
                className={classes.menuButton}
            >
                Meals
            </Button>
            <Button
                color="inherit"
                onClick={logout}
                className={classes.menuButton}
            >
                Logout
            </Button>
        </div>
    );

    const loggedOut = (
        <Button
            color="inherit"
            href={`${BASE_URL}/auth/dexcom`}
            className={classes.menuButton}
        >
            Login
        </Button>
    );
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        T1D Sugar Tracker
                    </Typography>
                    {user ? loggedIn : loggedOut}
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default Nav;
