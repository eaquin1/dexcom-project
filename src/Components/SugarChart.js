import React, { useEffect, useState } from "react";
import Api from "../Helpers/api";
import { closestIndexTo } from "date-fns";

import { Chart } from "react-google-charts";

function SugarChart({ dates, meals }) {
    const [sugarData, setSugarData] = useState([]);

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
                    let sugarCopy = [];
                    sugarCopy[0] = ["Time", "Glucose Levels", "Carbs"];
                    for (let s of sugarArray) {
                        sugarCopy.push(s);
                    }

                    return sugarCopy;
                };

                setSugarData((s) => sugar(s));
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
                        let sugarArrayDates = sugarData.map(
                            (sugarItem) => sugarItem[0]
                        );
                        //remove first item in sugarArrayDates: ["Time", "Glucose Levels", "Carbs"];
                        sugarArrayDates.shift();

                        mealDateIdx = closestIndexTo(
                            meal.time,
                            sugarArrayDates
                        );

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
