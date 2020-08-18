import React from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Nav from "./Components/Nav";

import Routes from "./Components/Routes";

function App() {
    return (
        <BrowserRouter>
            <Nav />

            <Routes />
        </BrowserRouter>
    );
}

export default App;
