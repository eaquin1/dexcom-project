import React, { useEffect, useState } from "react";
import Api from "../Helpers/api";
import { format } from "date-fns";
import Chart from "react-apexcharts";

function SugarChart({ startDate, endDate }) {
    const [sugars, setSugars] = useState([]);
    const [sugarValues, setSugarValues] = useState([]);
    const [dateValues, setDateValues] = useState([]);
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
            categories: [
                "17:01",
                "16:56",
                "16:51",
                "16:46",
                "16:41",
                "16:36",
                "16:31",
                "16:26",
                "16:21",
                "16:16",
                "16:11",
                "16:06",
                "16:01",
                "15:56",
                "15:51",
            ].reverse(),

            title: { text: "Time" },
        },
    });
    const [series, setSeries] = useState([
        {
            name: "Meals",
            type: "column",
            data: [30, 0, 0, 0, 24, 0, 0, 20, 0, 0, 0, 0, 0, 0, 0],
        },
        {
            name: "Glucose values",
            type: "line",
            data: [
                156,
                152,
                149,
                151,
                149,
                149,
                150,
                150,
                148,
                146,
                140,
                133,
                129,
                123,
                122,
            ].reverse(),
        },
    ]);

    //End Date: 2020-08-19T15:26:48-05:00

    //useCallBack ??
    useEffect(() => {
        async function getSugars() {
            console.log(typeof startDate);
            if (startDate !== null && endDate !== null) {
                const dates = {
                    startDate: startDate,
                    endDate: endDate,
                };

                let sugarRes = await Api.sugars(dates);
                setSugars(sugarRes);

                //map over the sugars array to get a new array of sugar values, for the y-axis
                setSugarValues(sugars.map((sugar) => sugar.value));
                // console.log("SugarValues", sugarValues);
                // //map over the sugars array to get a new array of dates, for the x-axis
                // setDateValues(sugars.map((sugar) => sugar.displayTime));
                // setOptions({
                //     options: {
                //         ...options,
                //         xaxis: {
                //             categories: dateValues,
                //         },
                //     },
                // });
                // setSeries({
                //     ...series,
                //     data: dateValues,
                // });
                //onsole.log("Date values", dateValues);
            }
        }
        getSugars();
    }, [startDate, endDate]);

    return (
        <>
            <h1>Chart</h1>
            <Chart
                options={options}
                series={series}
                height="450"
                width="100%"
            />
        </>
    );
}

export default SugarChart;
