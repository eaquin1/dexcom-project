import React from "react";
import { render } from "@testing-library/react";
import Landing from "../Landing";

it("renders without crashing", function () {
    render(<Landing />);
});
