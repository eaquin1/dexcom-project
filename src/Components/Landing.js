import React from "react";
import Button from "@material-ui/core/Button";
const BASE_URL = process.env.REACT_APP_BASE_URL || "https://localhost:5000";

function Landing() {
    return (
        <div className="App">
            <h1>Type 1 Diabetes Facts</h1>
            <h5>
                Currently, there are some 1.6 million Americans living with T1D,
                and there is no known cure
            </h5>
            <p>
                T1 is an autoimmune disease that causes the pancreas to stop
                producing insulin, and the body cannot manage blood-sugar levels
                on its own.
            </p>
            <p>
                The only way to manage T1 is with insulin, and constantly
                monitoring blood-sugar levels. Instead of multiple finger pricks
                a day to check blood sugar levels, a continuous glucose monitor
                (CGM) can be worn. One common brand of CGM is the Dexcom. It
                sends data with your blood sugar readings, every five minutes.
            </p>
            <p>
                This data is instrumental to managing your day to day activites
                with T1 diabetes. It can be overwhelming, however, to suddenly
                be confronted with a rollercoaster of blood-sugar highs and
                lows. CarbCounter allows you to look up the carb count in the
                foods you eat. Once you've entered a meal, CarbCounter will help
                you visualize what you've eaten compared to your blood sugar.
                Over time, you'll gain insight about how various foods work for
                you - not just the carb number.
            </p>

            <p>
                Source:{" "}
                <a href="https://www.jdrf.org/t1d-resources/about/facts/">
                    JDRF
                </a>
            </p>
            <Button href={BASE_URL}>Log into Dexcom</Button>
        </div>
    );
}

export default Landing;
