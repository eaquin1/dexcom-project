import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

function Calendar({ changeDate }) {
    const initialDate = new Date();
    const [selectedDate, setSelectedDate] = useState(initialDate);

    const handleChange = (date) => {
        changeDate(date);
        setSelectedDate(date);
    };

    return <DatePicker selected={selectedDate} onChange={handleChange} />;
}

export default Calendar;
