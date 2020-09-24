import React, { useState, useEffect } from "react";
import SugarChart from "./SugarChart";
import Calendar from "./Calendar";
import MealForm from "./MealForm";
import Api from "../Helpers/api";
import { parseISO, closestIndexTo } from "date-fns";
import Grid from "@material-ui/core/Grid";

function PrivateLanding() {
    const [minDate, setMinDate] = useState(null);
    const [maxDate, setMaxDate] = useState(null);
    const [dates, setDates] = useState(null);
    const [meals, setMeals] = useState([]);
    const [sugarData, setSugarData] = useState([]);

    // get possible data ranges for a user's account
    useEffect(() => {
        async function getRange() {
            let range = await Api.getDataRange();
            setMinDate(parseISO(range.start.displayTime)); //use toISO instead?
            setMaxDate(parseISO(range.end.displayTime));
        }

        getRange();
    }, []);

    //get glucose values for the chosen date range
    useEffect(() => {
        async function getSugars() {
            if (dates !== null) {
                let sugarRes = await Api.sugars(dates);

                let sugarArray = sugarRes.map((s) => [
                    new Date(s.systemTime),
                    s.value,
                    0,
                ]);

                const sugar = (sugars) => {
                    let sugarCopy = [];
                    sugarCopy[0] = ["Time", "Glucose Levels", "Carbs"];
                    for (let s of sugarArray) {
                        sugarCopy.push(s);
                    }

                    return sugarCopy;
                };

                setSugarData((s) => sugar(s));

                let savedMeals = await Api.getMealsinTimeRange(dates);

                setMeals(savedMeals);
            }
        }
        getSugars();
    }, [dates]);

    //add the meal times to the chart
    useEffect(() => {
        function setMealTimes() {
            if (meals.length !== 0 && sugarData.length !== 0) {
                let mealDateIdx;
                let sugarCopy = [];
                for (let meal of meals) {
                    if (
                        new Date(meal.date) <= sugarData[1][0] &&
                        new Date(meal.date) >=
                            sugarData[sugarData.length - 1][0]
                    ) {
                        let sugarArrayDates = sugarData.map(
                            (sugarItem) => sugarItem[0]
                        );
                        //remove first item in sugarArrayDates: ["Time", "Glucose Levels", "Carbs"];
                        sugarArrayDates.shift();

                        mealDateIdx = closestIndexTo(
                            new Date(meal.date),
                            sugarArrayDates
                        );

                        //copy the sugarData
                        sugarCopy = [...sugarData];
                        sugarCopy[mealDateIdx][2] = meal.carb_count;
                    }
                }
                setSugarData(sugarCopy);
            }
        }
        setMealTimes();
    }, [meals]);

    //get the dates from the calendar picker
    const chosenDateHandler = (dates) => {
        setDates(dates);
    };

    //get the carbs from the MealForm, or the API call to the database
    const mealsHandler = (meal) => {
        setMeals((m) => [...m, meal]);
    };

    return (
        <Grid container justify="center">
            <h1>Choose your starting and ending dates</h1>
            <Grid container justify="center">
                <Calendar
                    changeDates={chosenDateHandler}
                    minDate={minDate}
                    maxDate={maxDate}
                />
            </Grid>

            {dates === null ? null : (
                <Grid container justify="center">
                    <SugarChart sugarData={sugarData} dates={dates} />
                    <MealForm mealsHandler={mealsHandler} />
                </Grid>
            )}
        </Grid>
    );
}

export default PrivateLanding;
