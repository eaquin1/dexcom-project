import React, { useEffect, useState } from "react";
import Api from "../Helpers/api";
import { closestIndexTo } from "date-fns";

import { Chart } from "react-google-charts";

function SugarChart({ dates, meals, mealsHandler }) {
    const [sugarData, setSugarData] = useState([]);

    useEffect(() => {
        async function getSugars() {
            if (dates !== null) {
                let sugarRes = await Api.sugars(dates);
                console.log("running sugars?");
                let sugarArray = sugarRes.map((s) => [
                    new Date(s.systemTime),
                    s.value,
                    0,
                ]);

                const sugar = (sugars) => {
                    let sugarCopy = [];
                    sugarCopy[0] = ["Time", "Glucose Levels", "Carbs"];
                    for (let s of sugarArray) {
                        sugarCopy.push(s);
                    }

                    return sugarCopy;
                };

                setSugarData((s) => sugar(s));

                let savedMeals = await Api.getMealsinTimeRange(dates);
                console.log(savedMeals);
                mealsHandler(savedMeals);
            }
        }
        getSugars();
    }, [dates]);

    useEffect(() => {
        function setCarbs() {
            if (meals.length !== 0 && sugarData.length !== 0) {
                let mealDateIdx;
                console.log("running?");
                for (let meal of meals) {
                    if (
                        new Date(meal.date) <= sugarData[1][0] &&
                        new Date(meal.date) >=
                            sugarData[sugarData.length - 1][0]
                    ) {
                        let sugarArrayDates = sugarData.map(
                            (sugarItem) => sugarItem[0]
                        );
                        //remove first item in sugarArrayDates: ["Time", "Glucose Levels", "Carbs"];
                        sugarArrayDates.shift();

                        mealDateIdx = closestIndexTo(
                            new Date(meal.date),
                            sugarArrayDates
                        );

                        //copy the sugarData
                        let sugarCopy = [...sugarData];
                        sugarCopy[mealDateIdx][2] = meal.carb_count;
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
                width={"100%"}
                height={"500px"}
                legendToggle
                data={sugarData}
                chartType="ComboChart"
                loader={<div>Loading Chart</div>}
                options={{
                    title: "Blood Glucose Over Time",
                    vAxis: { title: "Glucose Levels (mg/dL)" },
                    hAxis: { title: "Time" },
                    seriesType: "line",
                    series: { 1: { type: "bars" } },
                }}
            />
        </>
    );
}

export default SugarChart;
