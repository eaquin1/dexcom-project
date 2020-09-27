import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import { useForm, Controller } from "react-hook-form";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";

import "react-datepicker/dist/react-datepicker-cssmodules.css";

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const useStyles = makeStyles((theme) => ({
    grid: {
        justifyContent: "center",
    },
    datePicker: {
        flexDirection: "row",
        flexWrap: "nowrap",
    },
}));
function Calendar({ changeDates, minDate, maxDate }) {
    const { handleSubmit, control } = useForm();
    const [open, setOpen] = useState(false);
    const classes = useStyles();

    const onSubmit = (data) => {
        //ensure that selected dates are not more than 90 days apart,
        //and the end date is after the start date
        if (
            data.EndDatePicker - data.StartDatePicker <= 7776000000 &&
            data.EndDatePicker - data.StartDatePicker > 0
        ) {
            let dates = {
                startDate: format(
                    data.StartDatePicker,
                    "yyyy-MM-dd'T'HH:mm:ss"
                ),
                endDate: format(data.EndDatePicker, "yyyy-MM-dd'T'HH:mm:ss"),
            };
            changeDates(dates);
        } else {
            setOpen(true);
        }
    };

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setOpen(false);
    };
    return (
        <form>
            <Grid container spacing={6} className={classes.grid}>
                <Grid item className={classes.datePicker}>
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
                </Grid>
                <Grid item className="date-picker">
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
                </Grid>
                <Grid
                    container
                    style={{ textAlign: "center", display: "block" }}
                >
                    <Button
                        variant="contained"
                        onClick={handleSubmit(onSubmit)}
                    >
                        Submit
                    </Button>
                </Grid>
            </Grid>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error">
                    Please enter a starting and ending date less than 90 days
                    apart
                </Alert>
            </Snackbar>
        </form>
    );
}

export default Calendar;
