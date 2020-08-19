import React, { useEffect, useState } from "react";
import Api from "../Helpers/api";

function Chart({ date }) {
    const [sugars, setSugars] = useState([]);
    //useCallBack??
    useEffect(() => {
        async function getSugars() {
            let sugarRes = await Api.sugars(date);
            setSugars(sugarRes);
        }
        getSugars();
    }, [date]);

    return (
        <>
            <h1>Chart</h1>
            <p>{sugars.map((sugar) => sugar.value)}</p>
        </>
    );
}

export default Chart;
