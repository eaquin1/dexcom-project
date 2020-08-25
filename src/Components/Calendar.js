import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import { useForm, Controller } from "react-hook-form";

import Button from "@material-ui/core/Button";
// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

function Calendar({ changeDates, minDate, maxDate }) {
    const { handleSubmit, control } = useForm();

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const onSubmit = () => {
        console.log("StartDate", startDate);
        changeDates(
            format(startDate, "yyyy-MM-dd'T'HH:mm:ss"),
            format(endDate, "yyyy-MM-dd'T'HH:mm:ss")
        );
    };

    return (
        <form>
            <Controller
                control={control}
                name="StartDatePicker"
                defaultValue={startDate}
                render={({ onBlur }) => (
                    <DatePicker
                        onChange={(value) => setStartDate(new Date(value))}
                        onBlur={onBlur}
                        selected={startDate}
                        defaultValue={maxDate}
                        showTimeSelect
                        timeIntervals={15}
                        timeCaption="Time"
                        minDate={minDate}
                        maxDate={maxDate}
                        inline
                    />
                )}
            />
            <Controller
                control={control}
                name="EndDatePicker"
                defaultValue={endDate}
                render={({ onBlur }) => (
                    <DatePicker
                        onChange={(date) => setEndDate(new Date(date))}
                        onBlur={onBlur}
                        selected={endDate}
                        defaultValue={maxDate}
                        showTimeSelect
                        timeIntervals={15}
                        timeCaption="Time"
                        minDate={minDate}
                        maxDate={maxDate}
                        inline
                    />
                )}
            />
            <Button variant="contained" onClick={handleSubmit(onSubmit)}>
                Submit
            </Button>
        </form>
    );
}

export default Calendar;
