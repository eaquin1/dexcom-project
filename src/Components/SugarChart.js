import React, { useEffect, useState } from "react";
import Api from "../Helpers/api";
import { format } from "date-fns";
import Chart from "react-apexcharts";

function SugarChart({ dates, meals }) {
    const [options, setOptions] = useState({
        chart: {
            background: "#f4f4f4",
            foreColor: "#333",
        },
        yaxis: [
            { opposite: true, title: { text: "Carbs (g)" } },
            {
                dataLabels: { enabled: true },
                title: { text: 'Blood Glucose Levels ("mg/dL")' },
            },
        ],

        stroke: {
            curve: "straight",
        },
        grid: {
            row: {
                colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
                opacity: 0.5,
            },
        },
        xaxis: {
            categories: [],

            title: { text: "Time" },
        },
    });
    const [series, setSeries] = useState([
        {
            name: "Meals",
            type: "column",
            data: [],
        },
        {
            name: "Glucose values",
            type: "line",
            data: [],
        },
    ]);
    const placeMealTimes = (meal, sugarRes) => {
        console.log(meal);
        const mealTime = meal[0].time;
        console.log("system time", sugarRes[0].systemTime);
        console.log(
            "meal time",
            format(new Date(mealTime), "yyyy-MM-dd'T'HH:mm:ss")
        );
        const idxs = [];
        for (let time = 0; time < sugarRes.length; time++) {
            if (sugarRes[time].systemTime === mealTime) {
                idxs.push(time);
            }
        }

        return idxs;
    };
    useEffect(() => {
        async function getSugars() {
            let sugarRes = await Api.sugars(dates);

            //set the x-axis values from the Dexcom response
            let sugarTimes = sugarRes
                .map((sugarTime) =>
                    format(new Date(sugarTime.systemTime), "h:mm aaaa")
                )
                .reverse();
            //create an array for meals, the same length as sugarTimes
            let mealTimes = Array(sugarTimes.length).fill(null);

            if (meals.length !== 0) {
                let correspondingTimes = placeMealTimes(meals, sugarRes);
                mealTimes[correspondingTimes] = meals.carbCount;
            }

            setOptions((options) => ({
                ...options,
                xaxis: { ...options.xaxis.title, categories: sugarTimes },
            }));

            //set the y-axis values from the Dexcom response
            let sugarVals = sugarRes.map((sugar) => sugar.value).reverse();
            setSeries((series) => {
                //create a copy of the state array
                let seriesCopy = [...series];
                // console.log("series copy", seriesCopy);
                // console.log("Meal times", mealTimes);
                //create a copy of the object at the second index (where the sugars are in the array)

                seriesCopy[0] = { ...series[0], data: mealTimes };
                seriesCopy[1] = {
                    ...series[1],
                    data: sugarVals,
                };
                return seriesCopy;
            });
        }
        getSugars();
    }, [dates, meals]);

    return (
        <>
            <h1>Chart</h1>
            <Chart options={options} series={series} height="450" width="80%" />
        </>
    );
}

export default SugarChart;
