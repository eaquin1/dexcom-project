import React from "react";
import { render } from "@testing-library/react";
import SugarChart from "../SugarChart";

it("renders without crashing", function () {
    render(<SugarChart />);
});
