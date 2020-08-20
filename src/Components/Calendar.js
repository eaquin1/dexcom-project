import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { parseISO } from "date-fns";
import Api from "../Helpers/api";
// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

function Calendar({
    changeStartDate,
    changeEndDate,
    startDateProp,
    endDateProp,
}) {
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
    const handleStartChange = (date) => {
        changeStartDate(date);
    };

    const handleEndChange = (date) => {
        changeEndDate(date);
    };
    //todo: add a submit button, handleChange will only fire when it is clicked
    return (
        <>
            <DatePicker
                selected={startDateProp}
                onChange={(date) => handleStartChange(date)}
                startDate={startDateProp}
                endDate={endDateProp}
                showTimeSelect
                selectsStart
                inline
                minDate={minDate}
                maxDate={maxDate}
            />
            <DatePicker
                selected={endDateProp}
                onChange={(date) => handleEndChange(date)}
                startDate={startDateProp}
                endDate={endDateProp}
                showTimeSelect
                selectsEnd
                inline
                minDate={startDateProp}
                maxDate={maxDate}
            />
        </>
    );
}

export default Calendar;
