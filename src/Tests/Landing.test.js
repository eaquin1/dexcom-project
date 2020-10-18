import React from "react";
import { render } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import Landing from "../Components/Landing";

test("it renders without crashing", function () {
    act(() => {
        render(<Landing />);
    });
});

it("matches snapshot", () => {
    const { asFragment } = render(<Landing />);
    expect(asFragment()).toMatchSnapshot();
});
