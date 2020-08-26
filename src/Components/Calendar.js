import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import { useForm, Controller } from "react-hook-form";

import Button from "@material-ui/core/Button";
// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

function Calendar({ changeDates, minDate, maxDate }) {
    const { handleSubmit, control } = useForm();

    // const [startDate, setStartDate] = useState(null);
    // const [endDate, setEndDate] = useState(null);

    const onSubmit = (data) => {
        let dates = {
            startDate: format(data.StartDatePicker, "yyyy-MM-dd'T'HH:mm:ss"),
            endDate: format(data.EndDatePicker, "yyyy-MM-dd'T'HH:mm:ss"),
        };
        changeDates(dates);
    };

    return (
        <form>
            <Controller
                control={control}
                name="StartDatePicker"
                defaultValue={maxDate}
                render={({ onBlur, onChange, value }) => (
                    <DatePicker
                        onChange={onChange}
                        onBlur={onBlur}
                        selected={value}
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
                defaultValue={maxDate}
                render={({ onBlur, onChange, value }) => (
                    <DatePicker
                        onChange={onChange}
                        onBlur={onBlur}
                        selected={value}
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
