import React, { useEffect, useState } from "react";
import Api from "../Helpers/api";

function Chart() {
    const [sugars, setSugars] = useState([]);
    useEffect(() => {
        async function getSugars() {
            let sugarRes = await Api.sugars();
            setSugars(sugarRes);
        }
        getSugars();
    }, []);

    return (
        <>
            <h1>Chart</h1>
            <p>{sugars}</p>
        </>
    );
}

export default Chart;
