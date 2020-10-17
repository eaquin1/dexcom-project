import React from "react";
import { render } from "@testing-library/react";
import PrivateLanding from "../Components/PrivateLanding";

it("renders without crashing", function () {
    render(<PrivateLanding />);
});
