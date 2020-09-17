import React from "react";
import { Chart } from "react-google-charts";

function SugarChart({ sugarData, dates, meals, mealsHandler }) {
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
