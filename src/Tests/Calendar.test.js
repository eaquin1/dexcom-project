import React from "react";
import { render } from "@testing-library/react";
import Calendar from "../Components/Calendar";

it("renders without crashing", function () {
    render(<Calendar />);
});
