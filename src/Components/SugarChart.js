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
            categories: dateValues,
        },
    });
    const [series, setSeries] = useState([
        { name: "Glucose values", data: sugarValues },
    ]);
    //useCallBack??
    useEffect(() => {
        async function getSugars() {
            const dates = {
                startDate: format(startDate, "yyyy-MM-dd'T'HH:mm:ss"),
                endDate: format(endDate, "yyyy-MM-dd'T'HH:mm:ss"),
            };

            console.log(
                "From useEffect, in Chart",
                format(startDate, "yyyy-MM-dd'T'HH:mm:ss")
            );
            let sugarRes = await Api.sugars(dates);

            setSugars(sugarRes);
            //map over the sugars array to get a new array of sugar values, for the y-axis
            setSugarValues(sugars.map((sugar) => sugar.value));
            console.log("SugarValues", sugarValues);
            //map over the sugars array to get a new array of dates, for the x-axis
            setDateValues(sugars.map((sugar) => sugar.displayTime));
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
            console.log("Date values", dateValues);
        }
        getSugars();
    }, [startDate, endDate]);

    return (
        <>
            <h1>Chart</h1>
            <Chart
                options={options}
                series={series}
                type="line"
                height="450"
                width="100%"
            />
        </>
    );
}

export default SugarChart;
