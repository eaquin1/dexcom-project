import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format, subDays } from "date-fns";
//import Api from "../Helpers/api";
import Button from "@material-ui/core/Button";
// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

function Calendar({ changeDates, minDate, maxDate }) {
    const getCurrentDate = new Date();
    const getOneDayBefore = subDays(getCurrentDate, 1);
    const [startDate, setStartDate] = useState(getOneDayBefore);
    const [endDate, setEndDate] = useState(getCurrentDate);

    const handleSubmit = (evt) => {
        evt.preventDefault();
        changeDates(
            format(startDate, "yyyy-MM-dd'T'HH:mm:ss"),
            format(endDate, "yyyy-MM-dd'T'HH:mm:ss")
        );
    };
    //todo: add a submit button, handleChange will only fire when it is clicked
    return (
        <form>
            <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                startDate={startDate}
                //endDate={endDate}
                showTimeSelect
                selectsStart
                inline
                minDate={minDate}
                maxDate={maxDate}
            />
            <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                startDate={startDate}
                endDate={endDate}
                showTimeSelect
                selectsEnd
                inline
                minDate={minDate}
                maxDate={maxDate}
            />
            <Button variant="contained" onClick={handleSubmit}>
                Submit
            </Button>
        </form>
    );
}

export default Calendar;
