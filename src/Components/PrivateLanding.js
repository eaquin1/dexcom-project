import React, { useState } from "react";
import SugarChart from "./SugarChart";
import Calendar from "./Calendar";
import MealForm from "./MealForm";
import MealList from "./MealList";
//import API from "../Helpers/api";
import { subDays } from "date-fns";

function PrivateLanding() {
    const getCurrentDate = new Date();
    const getOneDayBefore = subDays(getCurrentDate, 1);
    const [startDate, setStartDate] = useState(getOneDayBefore);
    const [endDate, setEndDate] = useState(getCurrentDate);
    const changeStartDate = (start) => setStartDate(start);
    const changeEndDate = (end) => setEndDate(end);

    console.log("* Start Date:", startDate);
    console.log("* End Date:", endDate);

    return (
        <>
            <h1>Welcome!</h1>
            <Calendar
                changeStartDate={changeStartDate}
                changeEndDate={changeEndDate}
                startDate={startDate}
                endDate={endDate}
            />
            <SugarChart startDate={startDate} endDate={endDate} />
            <MealForm />
            <MealList />
        </>
    );
}

export default PrivateLanding;
