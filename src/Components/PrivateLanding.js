import React from "react";
import Chart from "./Chart";
import Calendar from "./Calendar";
import MealForm from "./MealForm";
import MealList from "./MealList";

function PrivateLanding() {
    return (
        <>
            <h1>Welcome!</h1>
            <Calendar />
            <Chart />
            <MealForm />
            <MealList />
        </>
    );
}

export default PrivateLanding;
