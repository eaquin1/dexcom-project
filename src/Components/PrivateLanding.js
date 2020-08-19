import React, { useState } from "react";
import Chart from "./Chart";
import Calendar from "./Calendar";
import MealForm from "./MealForm";
import MealList from "./MealList";
import API from "../Helpers/api";

function PrivateLanding() {
    const [date, setDate] = useState();
    const changeDate = (date) => setDate(date);
    console.log(date);
    return (
        <>
            <h1>Welcome!</h1>
            <Calendar changeDate={changeDate} />
            <Chart date={date} />
            <MealForm />
            <MealList />
        </>
    );
}

export default PrivateLanding;
