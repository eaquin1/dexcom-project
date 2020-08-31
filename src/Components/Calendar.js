import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import { useForm, Controller } from "react-hook-form";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
// CSS Modules, react-datepicker-cssmodules.css
import "react-datepicker/dist/react-datepicker-cssmodules.css";

const useStyles = makeStyles((theme) => ({
    grid: {
        width: "100%",
        margin: "20px",
    },
    datePicker: {
        flexDirection: "row",
        flexWrap: "nowrap",
    },
}));
function Calendar({ changeDates, minDate, maxDate }) {
    const { handleSubmit, control } = useForm();
    const classes = useStyles();

    const onSubmit = (data) => {
        let dates = {
            startDate: format(data.StartDatePicker, "yyyy-MM-dd'T'HH:mm:ss"),
            endDate: format(data.EndDatePicker, "yyyy-MM-dd'T'HH:mm:ss"),
        };
        changeDates(dates);
    };

    return (
        <form>
            <Grid container spacing={2} className={classes.grid}>
                {/* <Grid item className={classes.datePicker}> */}
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
                {/* </Grid> */}
                {/* <Grid item className="date-picker"> */}
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
                {/* </Grid> */}
            </Grid>
        </form>
    );
}

export default Calendar;
