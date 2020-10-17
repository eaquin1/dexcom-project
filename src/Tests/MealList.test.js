import React from "react";
import { render } from "@testing-library/react";
import MealList from "../Components/MealList";
import { getAllUserMeals } from "../Helpers/api";
jest.mock("../Helpers/api");

it("renders without crashing", async function () {
    let meal = [
        {
            id: 5,
            date: Date.now(),
            food: ["apple", "peanut butter"],
            carb_count: 12,
        },
    ];
    await getAllUserMeals.mockResolvedValue({ meal });
    render(<MealList />);
});
