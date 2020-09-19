import React from "react";
import { Chart } from "react-google-charts";
import { format } from "date-fns";
function SugarChart({ sugarData, dates }) {
    return (
        <>
            <h1>{`Glucose Levels from ${format(
                new Date(dates.startDate),
                "MM/dd/yyyy h:mm aaaa"
            )} to ${format(
                new Date(dates.endDate),
                "MM/dd/yyyy h:mm aaaa"
            )}`}</h1>{" "}
            <Chart
                width={"100%"}
                height={"500px"}
                legendToggle
                data={sugarData}
                chartType="ComboChart"
                loader={<div>Loading Chart</div>}
                options={{
                    title: "Blood Glucose Over Time",
                    vAxis: {
                        0: { title: "Glucose Levels (mg/dL)" },
                        1: { title: "Carbs (g)" },
                    },
                    hAxis: { title: "Time" },
                    seriesType: "line",
                    series: {
                        1: { type: "bars", targetAxisIndex: 1 },
                    },
                }}
            />
        </>
    );
}

export default SugarChart;
