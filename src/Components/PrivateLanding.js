import React, { useState, useEffect } from "react";
import SugarChart from "./SugarChart";
import Calendar from "./Calendar";
import MealForm from "./MealForm";
import MealList from "./MealList";
import Api from "../Helpers/api";
import { subDays, parseISO } from "date-fns";

function PrivateLanding() {
    const [minDate, setMinDate] = useState(null);
    const [maxDate, setMaxDate] = useState(null);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    // get possible data ranges for a user's account
    useEffect(() => {
        async function getRange() {
            let range = await Api.getDataRange();
            console.log(range);
            setMinDate(parseISO(range.start.displayTime)); //use toISO instead?
            setMaxDate(parseISO(range.end.displayTime));
        }

        getRange();
    }, []);

    //get the dates from
    const chosenDateHandler = (start, end) => {
        setStartDate(start);
        setEndDate(end);
    };

    console.log("* Start Date:", startDate);
    console.log("* End Date:", endDate);

    return (
        <>
            <h1>Welcome!</h1>
            <Calendar
                changeDates={chosenDateHandler}
                minDate={minDate}
                maxDate={maxDate}
            />
            <SugarChart startDate={startDate} endDate={endDate} />
            <MealForm />
            <MealList />
        </>
    );
}

export default PrivateLanding;
