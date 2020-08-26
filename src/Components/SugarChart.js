import React, { useEffect, useState } from "react";
import Api from "../Helpers/api";
import { format } from "date-fns";

//import "../node_modules/react-vis/dist/style.css";
import {
    XYPlot,
    XAxis,
    YAxis,
    LineMarkSeries,
    VerticalBarSeries,
    VerticalGridLines,
    HorizontalGridLines,
    LabelSeries,
} from "react-vis";

function SugarChart({ dates, meals }) {
    const [sugarData, setSugarData] = useState(null);
    const [mealData, setMealData] = useState(null);
    // const placeMealTimes = (meal, sugarRes) => {
    //     console.log(meal);
    //     const mealTime = meal[0].time;
    //     console.log("system time", sugarRes[0].systemTime);
    //     console.log(
    //         "meal time",
    //         format(new Date(mealTime), "yyyy-MM-dd'T'HH:mm:ss")
    //     );
    //     const idxs = [];
    //     for (let time = 0; time < sugarRes.length; time++) {
    //         if (sugarRes[time].systemTime === mealTime) {
    //             idxs.push(time);
    //         }
    //     }

    //     return idxs;
    // };
    useEffect(() => {
        async function getSugars() {
            if (dates !== null) {
                let sugarRes = await Api.sugars(dates);

                //set the x-axis values from the Dexcom response
                setSugarData(
                    sugarRes
                        .map((sugarTime) => ({
                            x: new Date(sugarTime.systemTime),
                            y: sugarTime.value,
                        }))
                        .reverse()
                );

                setMealData(
                    meals.map((meal) => ({
                        x: new Date(meal.time),
                        y: meal.carbCount,
                    }))
                );
            }
        }
        getSugars();
    }, [dates, meals]);

    return (
        <>
            <h1>Chart</h1>
            <XYPlot
                height={600}
                width={600}
                xType="time"
                title={"Glucose Levels"}
            >
                <VerticalGridLines />
                <HorizontalGridLines />
                <XAxis title="Time" />
                <YAxis
                    title="Carbs (g)"
                    orientation="right"
                    // tickFormat={(meal) => meals[meal].carbCount}
                />
                <YAxis title='Blood Glucose Levels ("mg/dL")' />
                <LineMarkSeries
                    style={{
                        strokeWidth: "3px",
                    }}
                    lineStyle={{ stroke: "red" }}
                    markStyle={{ stroke: "blue" }}
                    data={sugarData}
                />

                {/* <VerticalBarSeries data={mealData} /> */}
            </XYPlot>
        </>
    );
}

export default SugarChart;
