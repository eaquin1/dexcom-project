import React from "react";
import { render } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import Landing from "../Components/Landing";
// let container;

// beforeEach(() => {
//     container = document.createElement("div");
//     document.body.appendChild(container);
// });

// afterEach(() => {
//     document.body.removeChild(container);
//     container = null;
// });

test("it renders without crashing", function () {
    act(() => {
        render(<Landing />);
    });
});

// test("first render", function () {
//     render(<Landing />, container);

//     const h5 = container.querySelector("h5");
//     expect(h5.textContent).toBe("1.6 million Americans");
// });
