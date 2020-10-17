import React from "react";
import { render } from "@testing-library/react";
import Meal from "../Components/Meal";

it("renders without crashing", function () {
    let meal = [
        {
            name: "pad thai",
            serving: "350",
            calories: "583",
            fat: "24.5",
            protein: "28.4",
            carbs: "64.1",
        },
    ];
    let carbs = "64";
    render(<Meal foods={meal} carbCount={carbs} />);
});
