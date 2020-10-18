import React from "react";
import { render } from "@testing-library/react";
import MealList from "../Components/MealList";
import Api from "../Helpers/api";
jest.mock("../Helpers/api");

describe("Testing the MealList", () => {
    let mockMeal = [
        {
            id: 5,
            date: Date.now(),
            foods: ["apple", "peanut butter"],
            carb_count: 12,
        },
    ];
    const getMeals = Api.getAllUserMeals.mockResolvedValue(mockMeal);

    it("calls the API to get allMeals", async function () {
        render(<MealList />);
        expect(getMeals).toHaveBeenCalledTimes(1);
    });

    it("matches snapshot", () => {
        const { asFragment } = render(<MealList />);
        expect(asFragment()).toMatchSnapshot();
    });
});
