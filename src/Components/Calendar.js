import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { parseISO } from "date-fns";
import Api from "../Helpers/api";
import Button from "@material-ui/core/Button";
// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

function Calendar({ changeDates, startDateProp, endDateProp }) {
    const [minDate, setMinDate] = useState(null);
    const [maxDate, setMaxDate] = useState(null);

    // get possible data ranges for a user's account
    useEffect(() => {
        async function getRange() {
            let range = await Api.getDataRange();
            console.log(range);
            setMinDate(parseISO(range.start.displayTime));
            setMaxDate(parseISO(range.end.displayTime));
        }

        getRange();
    }, [startDateProp, endDateProp]);

    // const handleStartChange = (date) => {
    //     changeStartDate(date);
    // };

    // const handleEndChange = (date) => {
    //     changeEndDate(date);
    // };

    const handleSubmit = (dates) => {
        console.log("dates", dates);
        changeDates(dates);
    };

    //todo: add a submit button, handleChange will only fire when it is clicked
    return (
        <>
            <label for="start-time">Choose a starting date and time:</label>

            <input
                type="datetime-local"
                id="start-time"
                name="start-time"
                value={maxDate}
                min={minDate}
                max={maxDate}
            />
            <label for="end-time">Choose an ending date and time:</label>

            <input
                type="datetime-local"
                id="end-time"
                name="end-time"
                value={maxDate}
                min={minDate}
                max={maxDate}
            />
            <Button variant="contained" onClick={handleSubmit}>
                Submit
            </Button>
        </>
    );
}

export default Calendar;
