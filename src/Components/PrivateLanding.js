import React, { useState, useEffect } from "react";
import SugarChart from "./SugarChart";
import Calendar from "./Calendar";
import MealForm from "./MealForm";
import MealList from "./MealList";
import Api from "../Helpers/api";
import { parseISO } from "date-fns";

function PrivateLanding() {
    const [minDate, setMinDate] = useState(null);
    const [maxDate, setMaxDate] = useState(null);
    const [dates, setDates] = useState(null);
    const [meals, setMeals] = useState([]);

    // get possible data ranges for a user's account
    useEffect(() => {
        async function getRange() {
            let range = await Api.getDataRange();
            setMinDate(parseISO(range.start.displayTime)); //use toISO instead?
            setMaxDate(parseISO(range.end.displayTime));
        }

        getRange();
    }, []);

    //get the dates from the calendar picker
    const chosenDateHandler = (dates) => {
        setDates(dates);
    };

    //get the carbs from the MealForm
    const mealsHandler = (meal) => {
        setMeals((m) => [...m, meal]);
    };

    return (
        <>
            <h1>Welcome!</h1>
            <Calendar
                changeDates={chosenDateHandler}
                minDate={minDate}
                maxDate={maxDate}
            />
            <SugarChart dates={dates} meals={meals} />
            <MealForm mealsHandler={mealsHandler} />
            <MealList />
        </>
    );
}

export default PrivateLanding;
