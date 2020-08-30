import React, { useState, useEffect } from "react";
import SugarChart from "./SugarChart";
import Calendar from "./Calendar";
import MealForm from "./MealForm";
import MealList from "./MealList";
import Api from "../Helpers/api";
import { parseISO } from "date-fns";
import Grid from "@material-ui/core/Grid";

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

    // get meals from the database
    useEffect(() => {
        async function getMeals() {
            if (dates !== null) {
                let savedMeals = await Api.getMealsinTimeRange(dates);
                console.log(savedMeals);
                setMeals(savedMeals);
            }
        }

        getMeals();
    }, [dates]);

    //get the dates from the calendar picker
    const chosenDateHandler = (dates) => {
        setDates(dates);
    };

    //get the carbs from the MealForm, or the API call to the database
    const mealsHandler = (meal) => {
        setMeals((m) => [...m, meal]);
    };

    return (
        <Grid container>
            <h1>Welcome!</h1>
            <Calendar
                changeDates={chosenDateHandler}
                minDate={minDate}
                maxDate={maxDate}
            />
            {dates === null ? null : (
                <>
                    <SugarChart
                        dates={dates}
                        meals={meals}
                        mealsHandler={mealsHandler}
                    />
                    <MealForm mealsHandler={mealsHandler} />
                    <MealList />
                </>
            )}
        </Grid>
    );
}

export default PrivateLanding;
