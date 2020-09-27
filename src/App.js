import React, { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Nav from "./Components/Nav";
import { ClipLoader } from "react-spinners";
import Routes from "./Components/Routes";
import Api from "./Helpers/api";

function App() {
    const [infoLoaded, setInfoLoaded] = useState(false);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const getUser = async () => {
            let user = await Api.ensureUser();

            setUserId(user);

            setInfoLoaded(true);
            setUserId(user);
        };
        getUser();
    }, []);

    const handleLogOut = async () => {
        await Api.logoutUser();
        setUserId(null);
    };

    if (!infoLoaded) {
        return (
            <ClipLoader
                size={150}
                color="#123abc"
                css={{
                    display: "block",
                    margin: "auto",
                }}
            />
        );
    }
    return (
        <BrowserRouter>
            <Nav user={userId} logout={handleLogOut} />
            <Routes user={userId} />
        </BrowserRouter>
    );
}

export default App;
