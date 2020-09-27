import React from "react";
import Button from "@material-ui/core/Button";
import TypingScript from "./TypingScript";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:5000";
const useStyles = makeStyles({
    mainContainer: {
        justifyContent: "center",
        textAlign: "center",
        padding: "100px",
    },
    header: {
        display: "block",
    },
    typing: {
        display: "block",
        height: "50px",
    },
});
function Landing() {
    const classes = useStyles();
    return (
        <Grid container className={classes.mainContainer}>
            <Grid container className={classes.header}>
                <h1>Type One Diabetes</h1>

                <Grid item className={classes.typing}>
                    <TypingScript
                        phrases={[
                            "Carb Counter",
                            "Glucose Tracker",
                            "Meal Planner",
                        ]}
                        typeSpeed={100}
                        backspaceSpeed={80}
                    />
                </Grid>
            </Grid>
            <Grid item>
                <h5>
                    Currently, there are some 1.6 million Americans living with
                    T1D, and there is no known cure
                </h5>
                <p>
                    T1 is an autoimmune disease that causes the pancreas to stop
                    producing insulin, and the body cannot manage blood-sugar
                    levels on its own.
                </p>
                <p>
                    The only way to manage T1 is with insulin, and constantly
                    monitoring blood-sugar levels. Instead of multiple finger
                    pricks a day to check blood sugar levels, a continuous
                    glucose monitor (CGM) can be worn. One common brand of CGM
                    is the Dexcom. It sends data with your blood sugar readings,
                    every five minutes.
                </p>
                <p>
                    This data is instrumental to managing your day to day
                    activites with T1 diabetes. It can be overwhelming, however,
                    to suddenly be confronted with a rollercoaster of
                    blood-sugar highs and lows. CarbCounter allows you to look
                    up the carb count in the foods you eat. Once you've entered
                    a meal, CarbCounter will help you visualize what you've
                    eaten compared to your blood sugar. Over time, you'll gain
                    insight about how various foods work for you - not just the
                    carb number.
                </p>

                <p>
                    Source:{" "}
                    <a href="https://www.jdrf.org/t1d-resources/about/facts/">
                        JDRF
                    </a>
                </p>
            </Grid>
            <Grid item>
                <Button href={`${BASE_URL}/auth/dexcom`}>
                    Log into Dexcom
                </Button>
            </Grid>
        </Grid>
    );
}

export default Landing;
