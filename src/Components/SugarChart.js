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
            categories: [
                "2020-08-11T17:01:42",
                "2020-08-11T16:56:42",
                "2020-08-11T16:51:42",
                "2020-08-11T16:46:42",
                "2020-08-11T16:41:42",
                "2020-08-11T16:36:42",
                "2020-08-11T16:31:42",
                "2020-08-11T16:26:44",
                "2020-08-11T16:21:43",
                "2020-08-11T16:16:43",
                "2020-08-11T16:11:43",
                "2020-08-11T16:06:43",
                "2020-08-11T16:01:43",
                "2020-08-11T15:56:43",
                "2020-08-11T15:51:43",
                "2020-08-11T15:46:43",
                "2020-08-11T15:41:43",
                "2020-08-11T15:36:43",
                "2020-08-11T15:31:43",
                "2020-08-11T15:26:43",
                "2020-08-11T15:21:43",
                "2020-08-11T15:16:43",
                "2020-08-11T15:11:43",
                "2020-08-11T15:06:43",
                "2020-08-11T15:01:43",
                "2020-08-11T14:56:43",
                "2020-08-11T14:51:43",
                "2020-08-11T14:46:43",
                "2020-08-11T14:41:43",
                "2020-08-11T14:36:44",
                "2020-08-11T14:31:43",
                "2020-08-11T14:26:43",
                "2020-08-11T14:21:43",
                "2020-08-11T14:16:43",
                "2020-08-11T14:11:43",
                "2020-08-11T14:06:43",
                "2020-08-11T14:01:43",
                "2020-08-11T13:56:43",
                "2020-08-11T13:51:43",
                "2020-08-11T13:46:43",
                "2020-08-11T13:41:43",
                "2020-08-11T13:36:43",
                "2020-08-11T13:31:43",
                "2020-08-11T13:26:43",
                "2020-08-11T13:21:43",
                "2020-08-11T13:16:43",
                "2020-08-11T13:11:43",
                "2020-08-11T13:06:43",
                "2020-08-11T13:01:43",
                "2020-08-11T12:56:43",
                "2020-08-11T12:51:43",
                "2020-08-11T12:46:43",
                "2020-08-11T12:41:43",
                "2020-08-11T12:36:43",
                "2020-08-11T12:31:43",
                "2020-08-11T12:26:44",
                "2020-08-11T12:21:43",
                "2020-08-11T12:16:44",
                "2020-08-11T12:11:44",
                "2020-08-11T12:06:43",
                "2020-08-11T12:01:44",
                "2020-08-11T11:56:44",
                "2020-08-11T11:51:45",
                "2020-08-11T11:46:45",
                "2020-08-11T11:41:44",
                "2020-08-11T11:36:44",
                "2020-08-11T11:31:44",
                "2020-08-11T11:26:44",
                "2020-08-11T11:21:44",
                "2020-08-11T11:16:44",
                "2020-08-11T11:11:44",
                "2020-08-11T11:06:44",
                "2020-08-11T11:01:44",
                "2020-08-11T10:56:44",
                "2020-08-11T10:51:44",
                "2020-08-11T10:46:44",
                "2020-08-11T10:41:44",
                "2020-08-11T10:36:44",
                "2020-08-11T10:31:44",
                "2020-08-11T10:26:44",
                "2020-08-11T10:21:44",
                "2020-08-11T10:16:44",
                "2020-08-11T10:11:44",
                "2020-08-11T10:06:45",
                "2020-08-11T10:01:44",
                "2020-08-11T09:56:44",
                "2020-08-11T09:51:44",
                "2020-08-11T09:46:44",
                "2020-08-11T09:41:44",
                "2020-08-11T09:36:44",
                "2020-08-11T09:31:44",
                "2020-08-11T09:26:44",
                "2020-08-11T09:21:44",
                "2020-08-11T09:16:44",
                "2020-08-11T09:11:44",
                "2020-08-11T09:06:44",
                "2020-08-11T09:01:45",
                "2020-08-11T08:56:45",
                "2020-08-11T08:51:44",
                "2020-08-11T08:46:44",
            ],
        },
    });
    const [series, setSeries] = useState([
        {
            name: "Glucose values",
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
                123,
                121,
                124,
                125,
                134,
                136,
                133,
                132,
                124,
                114,
                116,
                112,
                108,
                106,
                100,
                96,
                96,
                92,
                94,
                93,
                93,
                93,
                92,
                93,
                94,
                89,
                86,
                82,
                77,
                73,
                72,
                80,
                99,
                107,
                111,
                118,
                121,
                125,
                129,
                129,
                129,
                126,
                124,
                119,
                115,
                110,
                108,
                109,
                110,
                112,
                114,
                116,
                118,
                120,
                117,
                112,
                111,
                112,
                110,
                105,
                99,
                95,
                97,
                100,
                99,
                97,
                97,
                95,
                93,
                94,
                91,
                89,
                88,
                88,
                91,
                95,
                101,
                105,
                108,
                110,
                110,
                113,
                115,
                116,
                118,
            ],
        },
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
