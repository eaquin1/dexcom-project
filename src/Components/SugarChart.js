import React, { useEffect, useState } from "react";
import Api from "../Helpers/api";
import { format, closestIndexTo } from "date-fns";

import { Chart } from "react-google-charts";

function SugarChart({ dates, meals }) {
    const [sugarData, setSugarData] = useState([]);
    const [mealData, setMealData] = useState([]);
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

                let sugarArray = sugarRes.map((s) => [
                    new Date(s.systemTime),
                    s.value,
                    0,
                ]);

                const sugar = (sugars) => {
                    let sugarCopy = [...sugarData];
                    sugarCopy[0] = ["Time", "Glucose Levels", "Carbs"];
                    for (let s of sugarArray) {
                        sugarCopy.push(s);
                    }

                    return sugarCopy;
                };
                console.log(sugarArray);
                setSugarData((s) => sugar(s));

                //set the x-axis values from the Dexcom response
                //     setSugarData(
                //         sugarRes
                //             .map((sugarTime) => ({
                //                 x: new Date(sugarTime.systemTime),
                //                 lineValue: sugarTime.value,
                //             }))
                //             .reverse()
                //     );

                //     setMealData(
                //         meals.map((meal) => ({
                //             x: meal.time,
                //             y: meal.carbCount,
                //         }))
                //     );
            }
        }
        getSugars();
    }, [dates]);

    useEffect(() => {
        function setCarbs() {
            if (meals.length !== 0) {
                let mealDateIdx;
                for (let meal of meals) {
                    if (
                        meal.time <= sugarData[1][0] &&
                        meal.time >= sugarData[sugarData.length - 1][0]
                    ) {
                        console.log("Type of mealtime", typeof meal.time);
                        console.log(
                            "Type of sugar time",
                            typeof sugarData[2][0]
                        );

                        let sugarArrayDates = sugarData.map(
                            (sugarItem) => sugarItem[0]
                        );
                        //remove first item in sugarArrayDates: ["Time", "Glucose Levels", "Carbs"];
                        sugarArrayDates.shift();
                        console.log("sugarArrayDates", sugarArrayDates);
                        console.log(
                            "type of sugararray dates",
                            typeof sugarArrayDates[0]
                        );
                        mealDateIdx = closestIndexTo(
                            meal.time,
                            sugarArrayDates
                        );
                        console.log("mealdateidx", mealDateIdx);
                        //copy the sugarData
                        let sugarCopy = [...sugarData];
                        sugarCopy[mealDateIdx][2] = meal.carbCount;
                        setSugarData(sugarCopy);
                    }
                }
            }
        }
        setCarbs();
    }, [meals]);

    return (
        <>
            <h1>Chart</h1>{" "}
            <Chart
                width={500}
                height={400}
                data={sugarData}
                chartType="ComboChart"
                loader={<div>Loading Chart</div>}
                options={{
                    title: "Blood Glucose Over Time",
                    vAxis: { title: "Glucose Levels", minValue: 90 },
                    hAxis: { title: "Time" },
                    seriesType: "line",
                    series: { 1: { type: "bars" } },
                }}
            />
        </>
    );
}

export default SugarChart;
